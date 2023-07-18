from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

# //id="pages-list"
# class="Login_input__Up_lk"
# "email, password" 

def test_login(email,passw,driver):
    print("in 1")
    
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
    print("in 2")
    
    
    # print("Testing links...")
    # start = time.time()

    # working_links = 0
    # bad_links = 0
    # bad_links_list = []
    # for link in links:
    #     r = requests.head(link.get_attribute('href'))
    #     if r.status_code != 400:
    #         working_links += 1
    #     else:
    #         bad_links += 1
    #         bad_links_list.append((link.get_attribute('href'),r.status_code))

    # context = { "working_links":working_links,"bad_links_list":bad_links_list ,"bad_links":bad_links,"links_len":len(links), "time_links":round((time.time() - start),3) }
    # return context

# email="test@testsel"
# password="root"    
# test_login(email,password)


    
if __name__=="main":
    email="test@testsel"
    password="root" 
    driver = webdriver.Firefox()
    print(test_login(email,password,driver))
    