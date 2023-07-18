from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
import time
import random
import requests
from random_word import RandomWords


def wait_load(driver):
    linkyt = driver.find_elements("xpath","//a[contains(@class,'yottie-widget-video-info-title')]")
    if linkyt:
        return linkyt
    else:
        return False
    

def test_login(email,passw,driver):
    print("Logging in")
    
    driver.implicitly_wait(10000)
    driver.get("localhost:3000/login")
    email_sel = driver.find_element("xpath","//input[@type='email']")
    pass_sel = driver.find_element("xpath","//input[@type='password']")
    login = driver.find_element("xpath","//button[@type='submit']")
    
    email_sel.send_keys(email)
    pass_sel.send_keys(passw)
    # login.get_attribute("href")
    driver.implicitly_wait(10000)
    login.click()
    print("Logged in")
    
    
def test_nav(driver):
    print("Testing Navbar")
    
    navlist = driver.find_element("xpath","//li[contains(@id,'pages-list')]")
    nav = navlist.find_elements("tag name","ul")
    navlinks = navlist.find_elements("tag name","a")

    # print(navlinks)    
    
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
    return navlinks

def test_reflect(driver,navlinks):
    driver.implicitly_wait(100000000)
    navlinks[4].click()
    emos = driver.find_elements("xpath","//div[contains(@id,'emo')]")
    
    driver.implicitly_wait(1000)
    emos[random.randrange(len(emos))].click()
    driver.implicitly_wait(100000000)
    
    jentry = driver.find_element("xpath","//input[@type='text']")
    jentry.click()
    
    r = RandomWords()
    
    title_k=r.get_random_word()
    title = driver.find_element("id",'exampleForm.ControlInput1')
    title.send_keys(title_k)

    body_k =r.get_random_word()
    body = driver.find_element("id",'exampleForm.ControlTextarea1')
    body.send_keys(body_k)

    save = driver.find_element("class name","btn-primary")

    save.click()
    

def test_YTlinks(driver,links):
    print("Testing YT links")
    
    driver.implicitly_wait(10000)
    links[2].click()
    driver.implicitly_wait(100000000)
    # wait = WebDriverWait(driver, 1000000)
    # wait.until(lambda driver: driver.current_url != "localhost:3000/videos")
    
    # print(linkyt)
    ytlinks=wait_load(driver)
    working_links = 0
    bad_links = 0
    working_links_list=[]
    bad_links_list = []
    for link in ytlinks:
        r = requests.head(link.get_attribute('href'))
        if r.status_code != 400:
            working_links += 1
            working_links_list.append(link.get_attribute('href'))
        else:
            bad_links += 1
            bad_links_list.append((link.get_attribute('href'),r.status_code))

    context = { "working_links":working_links,"bad_links_list":bad_links_list ,"bad_links":bad_links,"links_len":len(ytlinks) }
    print(context)
    
    print()
    for link in working_links_list: 
        print(link)
        
    navlinks=test_nav(driver)
    
    test_reflect(driver,navlinks)


          
    

email="test@testsel"
password="root" 
driver = webdriver.Firefox()

test_login(email,password,driver)
navlinks=test_nav(driver)
test_YTlinks(driver,navlinks)
# test_reflect(driver,navlinks)