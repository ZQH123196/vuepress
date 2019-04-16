# -*- coding: utf-8 -*-
"""
Spyder Editor
2017.4.16：
创建

2017.4.18：
测试：成功
优化可能：加入反馈

2018.7.27:
更新：加入 chrome 新支持的 headless（无界面）模式
     优化流程
"""
import os

from selenium import webdriver
from selenium.webdriver.support import wait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
# 导入chrome选项
from selenium.webdriver.chrome.options import Options
# 要想调用键盘按键操作需要引入keys包
from selenium.webdriver.common.keys import Keys

url, username, password = "https://sibylcloudnewgeneration.men/auth/login", "zqh123196@gmail.com", ""

chromeOptions = Options()
chromeOptions.add_argument('--headless') #无界面
print('%s = %s' % ('chromeOptions.arguments', chromeOptions.arguments))

# os.environ['PROGRAMFILES(X86)'] == 'C:\\Program Files (x86)'
brower = webdriver.Chrome(chrome_options = chromeOptions, executable_path = os.environ['PROGRAMFILES(X86)'] + r'\Google\Chrome\Application\chromedriver.exe')
# 尺寸要足，否则可能会出现 Error ： element not visible, 1920x1080
brower.set_window_rect(x = 0, y = 0, width = 1920, height = 1080)
# brower.get_screenshot_as_file(r'C:\Users\admin\OneDrive\Auto\a.png')

# 初始页面
brower.get(url)
brower.implicitly_wait(30)  # 隐性等待 or 智能等待，最长等30秒

'''
element = wait.WebDriverWait(brower, 10).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[5]/p[2]/a")),
                             ''.join([brower.current_url, ' 此页面按键不可用']))
# element = brower.find_element_by_xpath("/html/body/div[7]/p[2]/a")
element.click()  # 模拟鼠标左键单击
'''
'''
效率比较
%timeit element = brower.find_element_by_xpath("/html/body/div[7]/p[2]/a")
100 loops, best of 3: 5.29 ms per loop

%timeit element = wait.WebDriverWait(brower, 10).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[7]/p[2]/a")),
                                                       ''.join([brower.current_url, ' 该页面出错解析']))
100 loops, best of 3: 18.1 ms per loop
'''



# 页面跳转
brower.implicitly_wait(10)  # 智能等待跳转页面完成
element = brower.find_element_by_xpath('//*[@id="email"]')  # 查找用户名所在的标签
element.send_keys(username)  # 向所在标签发送用户名
element = brower.find_element_by_xpath('//*[@id="passwd"]')
element.send_keys(password)
element = brower.find_element_by_xpath('//*[@id="login"]')  # 查找登陆按键所在的标签
element.click()
brower.implicitly_wait(10)

try:
    # 页面跳转
    element = brower.find_element_by_xpath('//*[@id="checkin"]')
    element.click()
except:
    print(element.text)
    pass
finally:
    brower.quit()
