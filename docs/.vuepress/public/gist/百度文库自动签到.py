import os
import time

# 导入selenium的浏览器驱动接口
from selenium import webdriver
# 导入chrome选项
from selenium.webdriver.chrome.options import Options
# 要想调用键盘按键操作需要引入keys包
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import wait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
# 异常处理
from selenium.common import exceptions

webWait = 10



chromeOptions = Options()
# chromeOptions.add_argument('--headless') 无界面

# os.environ['PROGRAMFILES(X86)'] == 'C:\\Program Files (x86)'
brower = webdriver.Chrome(chrome_options = chromeOptions, executable_path = os.environ['PROGRAMFILES(X86)'] + r'\Google\Chrome\Application\chromedriver.exe')
brower.set_window_rect(x = 0, y = 0, width = 1920, height = 1080)
# 隐式等待会在WebDriver对象实例的整个生命周期起作用。
brower.implicitly_wait(5)

url, username, password = "https://wenku.baidu.com/", "15008082961", ""
brower.get(url)

element = brower.find_element_by_id('login')
element.click()

element = wait.WebDriverWait(brower, webWait).until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#pass_phoenix_btn > ul > li.bd-acc-qzone > a')),
                                                       '%s%s' % (brower.current_url, ' 该页面解析出错'))
element.click()


# 窗口切换至跳出的新窗口
brower.window_handles
brower.current_window_handle
brower.switch_to_window(brower.window_handles[1])
brower.title
# 注意 iframe
wait.WebDriverWait(brower, webWait).until(EC.frame_to_be_available_and_switch_to_it('ptlogin_iframe'))

element = brower.find_element_by_css_selector('#switcher_plogin')
element.click()

# 输入 QQ 账号密码
element = brower.find_element_by_css_selector('#u')
element.send_keys(username)

element = brower.find_element_by_css_selector('#p')
element.send_keys(password)

element = brower.find_element_by_css_selector('#login_button')
element.click()
# 登陆等待跳转回去，QQ 登陆的窗口关闭几秒后，会将页面跳转会原始页面

# 窗口切换回原来的页面
brower.switch_to_window(brower.window_handles[0])

# 验证是否已经登陆，比较登陆前和登陆后，#user-bar-uname 这个 id 的新元素会加入
try:
    wait.WebDriverWait(brower, webWait).until(EC.presence_of_element_located((By.CSS_SELECTOR, '#user-bar-uname')))
    brower.get('https://wenku.baidu.com/task/browse/daily')
except exceptions.TimeoutException:
    brower.refresh()
    brower.get('https://wenku.baidu.com/task/browse/daily')

# 页面跳转，此处直接签到，此处有阴影遮罩，阻止了单击事件，但是我们可以直接调用 js 的 click()
brower.execute_script("document.querySelector('#signin > div.bd > div.clearfix.new-sidebar > span').click()")


# 验证，获取其签到的文本信息即可
element = brower.find_element_by_css_selector('#signin > div.bd > div.clearfix.new-sidebar > span')
if element.text == '已签到':
    print('success!')
else:
    timeNow = time.strftime('%Y-%m-%d_%H:%M:%S', time.localtime())
    brower.save_screenshot('%s_%s%s' % (__file__[0:-3], timeNow, '.png'))

brower.quit()
