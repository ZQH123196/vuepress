# -*- coding: utf-8 -*-
"""
Spyder Editor
注意事项：
社区规定的签到时间是自6:00到23:59时止

2017.4.16：
创建

2017.4.18：
测试：失败
优化可能：加入反馈，严格检测元素出现的情况
"""

from selenium import webdriver
from selenium.webdriver.support import wait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC


url, username, password = 'http://bbs.win10go.com/', "1074394646", ""

brower = webdriver.Chrome()  # 启动浏览器
brower.get(url)
brower.implicitly_wait(30)  # 隐性等待 or 智能等待，最长等30秒
brower.maximize_window()  # 尺寸要足，否则可能会出现Error ： element not visible
element = brower.find_element_by_xpath('//*[@id="lsform"]/div/div[2]/p[1]/a')
element.click()  # 模拟鼠标左键单击

# QQ登陆页面
brower.switch_to.frame('ptlogin_iframe')
elements = brower.find_element_by_css_selector('#switcher_plogin')
elements.click()
# 从快速登陆跳转至账号密码登陆
brower.implicitly_wait(10)
brower.find_element_by_css_selector("#u").send_keys(username)
brower.find_element_by_css_selector("#p").send_keys(password)
brower.find_element_by_css_selector("#login_button").click()  # 确认登陆按键
brower.implicitly_wait(10)

#brower.get(url)
element = wait.WebDriverWait(brower, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="um"]/p[2]/a[1]')),
                             ''.join([brower.current_url, ' 该页面出错解析']))
element.click()

brower.quit()
