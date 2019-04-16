# -*- coding: utf-8 -*-
"""
Created on Sun Apr 16 16:28:57 2017

@author: EOR
"""

from time import sleep
from selenium import webdriver

# chrome_path = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
# browser = webdriver.Chrome(executable_path=chrome_path)

url, username, password = "http://music.163.com/", "1074394646", ""

brower = webdriver.Chrome()
brower.maximize_window()  # 尺寸要足，否则可能会出现Error ： element not visible

# 初始页面
brower.get(url)
brower.implicitly_wait(30)  # 隐性等待 or 智能等待，最长等30秒
elements = brower.find_element_by_css_selector(".link")
elements.click()

brower.implicitly_wait(10)
elements = brower.find_element_by_css_selector("div.u-alt > ul > li:nth-child(2) > a")
elements.click()

# 页面跳转，QQ登陆页面
brower.implicitly_wait(10)
brower.switch_to.window(brower.window_handles[1])  # 将控制转到第二个页面，也就是QQ登陆页面
brower.switch_to.frame('ptlogin_iframe')  # 需转入框架才可抓取
elements = brower.find_element_by_css_selector('#switcher_plogin')
elements.click()

# 从快速登陆跳转至账号密码登陆
brower.implicitly_wait(10)
brower.find_element_by_css_selector("#u").send_keys(username)
brower.find_element_by_css_selector("#p").send_keys(password)
brower.find_element_by_css_selector("#login_button").click()  # 确认登陆按键
sleep(5)  # 稍等一会

# 页面跳转，主页面
brower.switch_to.window(brower.window_handles[0])  # 将控制绑回第一个页面
brower.implicitly_wait(10)
brower.refresh()  # 为确保登陆，稳妥起见刷新一下页面
brower.switch_to.frame('contentFrame')
elements = brower.find_element_by_xpath('//*[@id="discover-module"]/div[2]/div[1]/div/div/div/a')
elements.click()

brower.quit()
