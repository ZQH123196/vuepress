# -*- coding: utf-8 -*-
"""
Spyder Editor
2017.4.16：
创建

2017.4.18：
修改BUG：未加隐性等待出现了程序运行过快，浏览器渲染或网速速度不足引起的元素未加载问题
优化可能：抽奖页面需要反馈，用以判断抽奖是否完成
"""

from selenium import webdriver
from random import randint
from time import sleep
import sys

url, username, password = 'http://bbs.360.cn/forumall.php', 'a13976961686@qq.com', ''

brower = webdriver.Chrome()  # 启动浏览器
brower.get(url)
brower.maximize_window() # 尺寸要足，否则可能会出现Error ： element not visible
brower.implicitly_wait(30)  # 隐性等待 or 智能等待，最长等30秒
element = brower.find_element_by_xpath('//*[@id="um"]/p/a[1]')
element.click()  # 模拟鼠标左键单击

# 页面跳转，主页面
element = brower.find_element_by_xpath('/html/body/div[1]/div[1]/div[4]/div[2]/div[2]')  # 寻找遮挡物的标签
element.click()  # 模拟鼠标左键单击
element = brower.find_element_by_css_selector(".quc-input.quc-input-account")  # 查找用户名所在的标签
element.send_keys(username)  # 向所在标签发送用户名
element = brower.find_element_by_css_selector(".quc-input.quc-input-password")
element.send_keys(password)
element = brower.find_element_by_xpath('//*[@id="loginForm"]/div/div[2]/form/p[5]/input')
element.click()

# 页面跳转，主页面
brower.implicitly_wait(10)
element = brower.find_element_by_xpath('//*[@class="sign-link lucky-links"]')
element.click()

# 页面跳转，签到页面
element = brower.find_element_by_xpath('//*[@id="qiandao"]/table[2]/tbody/tr[1]/td/label[2]/input')
element.click()
# 如果一直选择一种表情被发现是个机器人的可能性太高了，所以这里随机选择表情
element = brower.find_elements_by_xpath('//*[@id="qiandao"]/table[1]/tbody/tr/td/ul//li')  # 注意，这里所获取是一个列表
element[randint(0, 8)].click()  # randint()返回0~8,9种随机数
element = brower.find_element_by_xpath('//*[@id="qiandao"]/table[1]/tbody/tr/td/div/a')
element.click()

# 页面跳转，主页面
brower.get(url)
brower.implicitly_wait(10)
element = brower.find_element_by_xpath('//*[@class="lucky-links"]')
element.click()

# 新页面跳转，抽奖页面
brower.switch_to.window(brower.window_handles[1])  # 点击抽奖将会产生一个新窗口，所以需要更换当前窗口的控制权
# 根据要求，必须拥有超过10金币才能抽奖，所以进行金币数检测
element = brower.find_element_by_xpath('//*[@id="wp"]/div[2]/div[1]/p[1]/span')
# 失败退出浏览器，并返回失败时所拥有的金币数
if int(element.text) < 10:
    brower.quit()
    sys.exit(int(element.text))
element = brower.find_element_by_xpath('//*[@id="lucky"]/ul/li[5]')
element.click()
sleep(10)  # 等他抽...

brower.quit()
