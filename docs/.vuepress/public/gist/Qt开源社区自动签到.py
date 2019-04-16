# -*- coding: utf-8 -*-
"""
Spyder Editor
注意事项：
社区规定的签到时间是自6:00到23:59时止

2017.4.16：
创建

2017.4.18：
测试：成功
优化可能：加入反馈，加入自动化时间
"""

# 

from selenium import webdriver
# from selenium.webdriver.support import wait
# from selenium.webdriver.support import expected_conditions as EC
from random import randint
from time import sleep

url, username, password = 'http://www.qter.org/portal.php', 'eor', ''

brower = webdriver.Chrome()  # 启动浏览器
brower.maximize_window() # 尺寸要足，否则可能会出现Error ： element not visible

# 初始页面
brower.get(url)
brower.implicitly_wait(30)  # 隐性等待 or 智能等待，最长等30秒
element = brower.find_element_by_xpath('//*[@id="header_nav"]/li[2]/a')
element.click()  # 模拟鼠标左键单击

brower.implicitly_wait(10)
# wait.WebDriverWait(brower, 5).until(EC.presence_of_element_located(brower.find_element_by_xpath, '//*[@name="username"]'))
sleep(2)  # 此处为等待元素加载，待优化
element = brower.find_element_by_xpath('//*[@name="username"]')  # 查找用户名所在的标签
element.send_keys(username)  # 向所在标签发送用户名
element = brower.find_element_by_xpath('//*[@type="password"]')
element.send_keys(password)
element = brower.find_element_by_xpath('//*[@class="pn pnc" and @name="loginsubmit"]')  # 查找登陆按键所在的标签
element.click()
element = brower.find_element_by_css_selector('#nv_portal > div.mobanbus_o > div > div.bus_navright > div.bus_box.bus_nav.bus_effect_2 li:nth-child(7)')  # 查找导航栏的签到标签
element.click()

# 页面跳转，签到页面
element = brower.find_element_by_xpath('//*[@id="qiandao"]/table[2]/tbody/tr[1]/td/label[2]/input')
element.click()
# 如果一直选择一种表情被发现是个机器人的可能性太高了，所以这里随机选择表情
element = brower.find_elements_by_xpath('//*[@id="qiandao"]/table[1]/tbody/tr/td/ul/li')  # 注意，这里所获取是一个列表
element[randint(0, 8)].click()  # randint()返回0~8,9种随机数
element = brower.find_element_by_xpath('//*[@id="qiandao"]/table[1]/tbody/tr/td/div/a')
element.click()

brower.quit()
