# -*- coding: utf-8 -*-
"""
Created on Thu Feb 18 14:12:21 2021

@author: Devanshee
"""

#%% Section 1
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import pandas as pd
from webdriver_manager.chrome import ChromeDriverManager

df = pd.DataFrame(columns=['Title','Company','Location','Job_Post_History','URL'])

for param in range(1,5):
   
    url = " https://www.amazon.jobs/en/search?base_query=software+engineer&loc_query=india&type=area&latitude=28.63096&longitude=77.21722&country=IND"
    
    driver = webdriver.Chrome(ChromeDriverManager(version="87.0.4280.88").install())
    driver.get(url)

    time.sleep(10)

    soup = BeautifulSoup(driver.page_source,'html5lib')

    # print(soup.prettify())

    driver.close()

    results = soup.find(class_='job-tile-lists col-12')
    job_elems = results.find_all('div',class_='job-tile')

    for job_elem in job_elems:

        # URL to apply for the job     
        URL =" https://www.amazon.job" +  job_elem.find('a',class_='job-link').get('href')
    #     print(URL.strip())

        # Post Title
        Title = job_elem.find('h3',class_='job-title')

        # Company Name
        # Company = job_elem.find('a',class_='subTitle ellipsis fleft')
        Company = "Amazon"
        
        
        # Location for the job post
        Loc = job_elem.find('div',class_='info first col-12 col-md-8')
        Loc_exp = Loc.find('p',class_='location-and-id')
        if Loc_exp is None:
            continue
        else:
            Location = Loc_exp.text

        # Number of days since job posted
        Hist = job_elem.find('div',class_='info col-12 col-md-4')
        Post_Hist = Hist.find('h2',class_='posting-date')
        if Post_Hist is None:
            continue
        else:
            Post_History = Post_Hist.text

    #   Appending data to the DataFrame 
        df=df.append({'URL':URL,'Title':Title.text,'Company':Company,'Location':Location,'Job_Post_History':Post_History},ignore_index = True)


#%% Section 2


# out = df.to_json(orient='records')
# out = df.to_dict('dict')
df.reset_index(inplace=True)
out = df.to_dict('records')

import pymongo
client = pymongo.MongoClient("mongodb+srv://admin:admin0706@universityplacementport.kfndr.mongodb.net/upp-db?retryWrites=true&w=majority")
db = client['upp-db']
plc_info = db['aws-placement']



insertion_result = plc_info.insert_many(out)



#%% Section 3


df = pd.DataFrame(columns=['Title','Company','Ratings','Reviews','Experience','Salary','Location','Job_Post_History','URL'])

for param in range(1,3):
    # url = "https://www.naukri.com/financial-analyst-jobs-in-mumbai-param?k=financial%20analyst&l=mumbai"
    url = "https://www.naukri.com/software-developer-jobs-in-bangalore-param?k=Software%20Developer&l=Bangalore%2C%20ahmedabad%2C%20vadodara"
    
    driver = webdriver.Chrome(ChromeDriverManager(version="87.0.4280.88").install())
    driver.get(url)

    time.sleep(10)

    soup = BeautifulSoup(driver.page_source,'html5lib')

    # print(soup.prettify())

    driver.close()

    results = soup.find(class_='list')
    job_elems = results.find_all('article',class_='jobTuple bgWhite br4 mb-8')

    for job_elem in job_elems:

        # URL to apply for the job     
        URL = job_elem.find('a',class_='title fw500 ellipsis').get('href')
    #     print(URL.strip())

        # Post Title
        Title = job_elem.find('a',class_='title fw500 ellipsis')

        # Company Name
        Company = job_elem.find('a',class_='subTitle ellipsis fleft')

        # Ratings
        rating_span = job_elem.find('span',class_='starRating fleft dot')
        if rating_span is None:
            continue
        else:
            Ratings = rating_span.text

        # Reviews Counts
        Review_span = job_elem.find('a',class_='reviewsCount ml-5 fleft blue-text')
        if Review_span is None:
            continue
        else:
            Reviews = Review_span.text

        # Years of experience Required
        Exp = job_elem.find('li',class_='fleft grey-text br2 placeHolderLi experience')
        Exp_span = Exp.find('span',class_='ellipsis fleft fs12 lh16')
        if Exp_span is None:
            continue
        else:
            Experience = Exp_span.text

        # Salary offered for the job
        Sal = job_elem.find('li',class_='fleft grey-text br2 placeHolderLi salary')
        Sal_span = Sal.find('span',class_='ellipsis fleft fs12 lh16')
        if Sal_span is None:
            continue
        else:
            Salary = Sal_span.text

        # Location for the job post
        Loc = job_elem.find('li',class_='fleft grey-text br2 placeHolderLi location')
        Loc_exp = Loc.find('span',class_='ellipsis fleft fs12 lh16')
        if Loc_exp is None:
            continue
        else:
            Location = Loc_exp.text

        # Number of days since job posted
        Hist = job_elem.find("div",["type br2 fleft grey","type br2 fleft green"])
        Post_Hist = Hist.find('span',class_='fleft fw500')
        if Post_Hist is None:
            continue
        else:
            Post_History = Post_Hist.text

    #   Appending data to the DataFrame 
        df=df.append({'URL':URL,'Title':Title.text,'Company':Company.text,'Ratings':Ratings,'Reviews':Reviews,'Experience':Experience,'Salary':Salary,'Location':Location,'Job_Post_History':Post_History},ignore_index = True)


#%% Section 4

# out = df.to_json(orient='records')
# out = df.to_dict('dict')
df.reset_index(inplace=True)
out = df.to_dict('records')

import pymongo
client = pymongo.MongoClient("mongodb+srv://admin:admin0706@universityplacementport.kfndr.mongodb.net/upp-db?retryWrites=true&w=majority")
db = client['upp-db']
plc_info = db['naukri-placement']

# print(out)

insertion_result = plc_info.insert_many(out)


#%% Section 5


df = pd.DataFrame(columns=['Title','Company','Location','Qualification','URL'])

for param in range(1,10):
    
    url = "https://careers.google.com/jobs/results/?page="+str(param)+"&q=software%20engineer%20india"
    
    driver = webdriver.Chrome(ChromeDriverManager(version="87.0.4280.88").install())
    driver.get(url)

    time.sleep(10)

    soup = BeautifulSoup(driver.page_source,'html5lib')

    # print(soup.prettify())

    driver.close()

    result = soup.find(class_='gc-p-results gc-h-flex')
    #print(results.prettify())
    result_div = result.find('div', attrs={'class': None})
    result_ol = result_div.find('ol', class_='gc-h-unstyled-list gc-p-results__results-list')
    
    results = result_ol.find_all('li',attrs={'class': None}) 

    for job_ele in results:
        # URL to apply for the job   
        
        if job_ele is None:
            continue
        
        URL = "https://careers.google.com" + job_ele.find('a', class_= 'gc-card').get('href')
        
        # Company Name
        Company = 'Google'
    
        # Designation
        Title_head = job_ele.find('div',class_='gc-card__header')
        Title = Title_head.find('h2')
    
    
   
        # Location for the job post
        Loc = Title_head.find('div',class_="gc-h-flex-row gc-h-flex-row--center")
        Loc_1 = Loc.find('ul', class_='gc-job-tags gc-h-flex')
        Loc_2 = Loc_1.find('li', class_='gc-job-tags__location')
        Loc_3 = Loc_2.find('div')
        Loc_4 = Loc_3.find_all('span')
        Loc = ''
        for i in Loc_4:
            Loc += i.text + ' '
            
        if Loc is None:
            continue
        else:
            Location = Loc

    
         # Qualifications required
        qualification_div = job_ele.find('div', class_ = "gc-card__content gc-h-hidden--until-medium")
        quali_div = qualification_div.find('div', class_="gc-card__preview gc-job-qualifications gc-job-qualifications--preview gc-user-generated-content")
        qualification_ul =quali_div.find('ul')
        qualification_li = qualification_ul.find_all('li')
         
        Qualification = ''

        for i in qualification_li:
            Qualification += i.text + ' '
     
    
    
        #Appending data to the DataFrame 
        df=df.append({'URL':URL,'Title':Title.text,'Company':Company,'Location':Location, 'Qualification': Qualification},ignore_index = True)

        break



#%% Section 6

# out = df.to_json(orient='records')
# out = df.to_dict('dict')
df.reset_index(inplace=True)
out = df.to_dict('records')

import pymongo
client = pymongo.MongoClient("mongodb+srv://admin:admin0706@universityplacementport.kfndr.mongodb.net/upp-db?retryWrites=true&w=majority")
db = client['upp-db']
plc_info = db['google-placement']

# print(out)

insertion_result = plc_info.insert_many(out)



