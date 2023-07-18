from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
import time
import requests
import test1
# //id="pages-list"
# class="Login_input__Up_lk"
# "email, password" 

def test_nav(driver):
    # driver = webdriver.Firefox()
    print("in 1")
    
    # driver.get("localhost:3000/login")
    # navbar_sel = driver.find_element("xpath","//ul[contains(@class,'font-bold')]")
    # print(navbar_sel)
    # login.get_attribute("href")
    # wait = WebDriverWait(driver, 10000)
    # wait.until(lambda driver: driver.current_url != "localhost:3000/dashboard")
    navlist = driver.find_element("xpath","//li[contains(@id,'pages-list')]")
    nav = navlist.find_elements("tag name","ul")
    navlinks = navlist.find_elements("tag name","a")

    print(navlinks)
    
    # navlinks[1].click()
    
    # driver.implicitly_wait(100)
    # driver.get("localhost:3000/videos")
    # # wait.until(lambda driver: driver.current_url != "localhost:3000/videos")
    
    # linkyt = driver.find_elements("xpath","//a[contains(@class,'yottie-widget-video-info-title')]")
    # print(linkyt)
    # login.click()
    print("in 2")
    
    
    # print("Testing links...")
    # start = time.time()

    working_links = 0
    bad_links = 0
    bad_links_list = []
    for link in navlinks:
        r = requests.head(link.get_attribute('href'))
        if r.status_code != 400:
            working_links += 1
        else:
            bad_links += 1
            bad_links_list.append((link.get_attribute('href'),r.status_code))

    context = { "working_links":working_links,"bad_links_list":bad_links_list ,"bad_links":bad_links,"links_len":len(navlinks) }
    print(context)
    # return context

email="test@testsel"
password="root" 
driver = webdriver.Firefox()

test1.test_login(email,password,driver)
test_nav(driver)

    
# if __name__=="main":
    # email="test@testsel"
    # password="root" 
    # print(test_nav(email,password))
