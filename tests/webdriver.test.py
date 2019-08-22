import os
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

class HeaderText(unittest.TestCase):
    def setUp(self):
        options = Options()
        options.binary_location = "C:\Program Files (x86)\Microsoft\Edge Dev\Application\msedge.exe"
        dir = os.path.dirname(os.path.realpath(__file__))
        edge_driver_path = dir + "\edgedriver_win64\msedgedriver.exe"
        self.driver = webdriver.Chrome(chrome_options=options, executable_path=edge_driver_path)
        self.driver.implicitly_wait(30)
        self.driver.maximize_window()
        self.driver.get("http://localhost:4200")

    def test_HeaderText(self):
        headerText = self.driver.find_element_by_css_selector("h1").get_attribute("innerText")
        self.assertEqual("todos", headerText)

    def tearDown(self):
        self.driver.quit()

class AddAToDoText(unittest.TestCase):
    def setUp(self):
        options = Options()
        options.binary_location = "C:\Program Files (x86)\Microsoft\Edge Dev\Application\msedge.exe"
        dir = os.path.dirname(os.path.realpath(__file__))
        edge_driver_path = dir + "\edgedriver_win64\msedgedriver.exe"
        self.driver = webdriver.Chrome(chrome_options=options, executable_path=edge_driver_path)
        self.driver.implicitly_wait(30)
        self.driver.maximize_window()
        self.driver.get("http://localhost:4200")

    def test_AddToDo(self):
        inputElement = self.driver.find_element_by_class_name("new-todo")
        inputElement.send_keys("The test is adding this todo" + Keys.ENTER)
        addedToDoText = self.driver.find_element_by_xpath("//input[@class='toggle']/following-sibling::label").get_attribute("innerText")
        self.assertEqual("The test is adding this todo", addedToDoText)

    def tearDown(self):
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()