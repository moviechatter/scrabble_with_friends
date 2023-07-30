from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from chromedriver_py import binary_path
from bs4 import BeautifulSoup
from lxml.html.clean import clean_html

def fetch_and_clean_html(url):
    try:
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        # Set the user agent
        options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36")

        service_object = Service(binary_path)
        
        # Initialize Selenium webdriver with options
        driver = webdriver.Chrome(service=service_object, options=options)

        # Navigate to url
        driver.get(url)
        
        # Get the raw HTML content
        soup = BeautifulSoup(driver.page_source, 'lxml')

        # Extract text and alt from images
        body_text = ' '.join(soup.get_text().split())
        # Extract text and alt from images
        img_alts = [' '.join(img.get('alt').split()) for img in soup.select('img') if img.get('alt') is not None]

        # Close the driver
        driver.close()

        # Sanitize the text using lxml's clean_html()
        clean_body_text = clean_html(body_text)
        # clean_img_alts = [clean_html(alt) for alt in img_alts]

        # return {
        #     'text': clean_body_text,
        #     'imgAlts': clean_img_alts,
        # }
        return clean_body_text
    except Exception as e:
        print('Error while fetching and cleaning html:', str(e))