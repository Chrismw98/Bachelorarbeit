import scrapy
import re
from scrapy.linkextractors import LinkExtractor
from scrapy.selector import Selector

import os
from urllib.parse import urlparse
from scrapy.pipelines.images import ImagesPipeline

class CCScraper(scrapy.Spider):

    global idCounter
    idCounter = 0

    def getId():
        global idCounter
        return idCounter

    def incrementCounter():
        global idCounter
        idCounter+=1

    flickr_api_key = '20cbc50633165ee2b17b02d10844b72d'

    name = "CreativeCommons"
    # Define the regex we'll need to filter the returned links
    # url_matcher = re.compile('^https:\/\/www\.search\.creativecommons\.org\/photos\/')
    url_matcher = re.compile('"(\/photos[^"]*)"')
    
    base_url = "https://search.creativecommons.org"

    # href_extractor = re.compile('href="([^"]*)"')
    src_extractor = re.compile('src="([^"]*)"')
    # tags_extractor = re.compile('alt="([^"]*)"')

    infoFile_path = 'D:/Documents/Uni Kurse/Bachelorarbeit/CC Crawler/infoFile.txt'
    infoFile = open(infoFile_path,'w',encoding='utf-8')
    infoFile.write('id,url,name,author,license,imageURL,tags\n')

    def writeInfo(id, url, name, author, license, imageURL):
        line = f"{id},{url},{name},{author},{license},{imageURL}"
        # for tag in tags:
        #     line += f",{tag}"
        line+="\n"
        # CCScraper.infoFile.write(f"{id},{url},{name},{author},{license},{imageURL},\n")
        CCScraper.infoFile.write(line)
        
    
    #This is only to start the crawler on a local html file, that includes links to all images
    def getStartUrls(html_file_url):
        print("******** Getting Start URLs ********")
        html_file = open(html_file_url, 'r', encoding='utf-8')
        body = ''
        urls=[]
        for line in html_file.readlines():
            body+=line
        body = Selector(text=body)
        linkTags = body.css('a.search-grid_image-ctr')#.attrib['href']# ::atr(href)').extract()
        print(len(linkTags), 'is the length of linkTags')
        for linkTag in linkTags:
            link = linkTag.attrib['href'] #Extracts the attribute href from the Selector
            urls.append(link)
        print(len(urls), "image URLs were found.")
        return urls

    #The start urls to crawl from
    # start_urls = getStartUrls("D:/Documents/Uni Kurse/Bachelorarbeit/CC Crawler/CC Search LITE.html")
    start_urls = getStartUrls("D:/Documents/Uni Kurse/Bachelorarbeit/CC Crawler/CC Search.html")# LITE.html")
    # start_urls = ["https://search.creativecommons.org/search?q=sunset&license_type=commercial"]


    # Create a set that'll keep track of ids we've crawled
    crawled_ids = set()
    
    # def start_requests(self):
    #     url = "https://search.creativecommons.org/search?q=sunset&license_type=commercial"
    #     # url = "D:/Documents/Uni Kurse/Bachelorarbeit/CC Crawler/CC Search LITE.html"
    #     # html = open(url, 'r', encoding='utf-8')
    #     # body = ''
    #     # for line in html.readlines():
    #     #     body+=line
    #     # item = {
    #     #     url : url,
    #     #     body : body
    #     # }
    #     # yield self.parse(item)
    #     yield scrapy.Request(url, self.parse)

    def create_flickr_api_request(photo_id):
        res = f"https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key={CCScraper.flickr_api_key}&photo_id={photo_id}&format=rest"
        return res

    def processImage(image_url, name, author, lic, imageURL):
        image_id = CCScraper.getId()
        CCScraper.writeInfo(image_id, image_url,name,author,lic, imageURL)
        CCScraper.incrementCounter()


    def parse(self, response):
        body = Selector(text=response.body)
        photos = body.css('img.photo_image').extract() #Contains one or none image tag
        data = body.css('span#attribution')#Is of type Selector

        if(len(photos)>0):
            photo = photos[0]
            image_url = CCScraper.src_extractor.findall(photo)[0]
            references = data.css("a::text").getall()
            if (len(references)<3):
                print("Encountered problem with data. Check:", references)
                print("Giving it another try")
                yield scrapy.Request(response.url, self.parse,dont_filter=True)
            else:
                name = references[0]
                author = references[1]
                lic = references[2].strip()
                #If the image is found on flickr, get the original size of the image and link to the flickr page, and the direct page, as agreed to in flickr api terms of use


                #Everything is successful, so write to the file and yield the image for download
                # CCScraper.writeInfo(image_url,name,author,lic)
                # print(dict(url = image_url, name = name, author = author, license = lic))
                # CCScraper.image_urls.append(image_url)
                print(dict(url = image_url, name = name, author = author, license = lic))
                #If flickr, create flickr api url to get the original size
                if('live.staticflickr' in image_url):
                    photo_id = image_url.split('/')[-1].split('_')[0]
                    flickr_API_url = CCScraper.create_flickr_api_request(photo_id)
                    print("FLICKR URL:", flickr_API_url)
                    image_url = flickr_API_url
                    follow_up_request = scrapy.Request(flickr_API_url, callback = self.parse_flickr, dont_filter=True)
                    follow_up_request.cb_kwargs['name'] = name
                    follow_up_request.cb_kwargs['author'] = author
                    follow_up_request.cb_kwargs['license'] = lic
                    yield follow_up_request
                else:
                    print("LINK REFERS TO NON-FLICKR - IGNORING")
                    # id = CCCounter.getId()
                    # CCScraper.processImage(image_url, name, author, lic)
                    # yield {
                    #     'image_urls' : [image_url],
                    #     'image_id' : id #Because the ID is already incremented
                    # }


        else:
            print("**** The length of the photos list is 0 ****")


        linkTags = body.css('a.search-grid_image-ctr').extract()
        # print("SIZE OF linkTags:",len(linkTags))
        photo_urls = []
        for linkTag in linkTags:
            link = CCScraper.url_matcher.findall(linkTag)
            if (len(link)>0):
                link = link[0]
                url = CCScraper.base_url + link
                photo_urls.append(url)
            else:
                print("No link was found in <a> tag (line 52)",link)


        # photoLinks = [link.url for link in link_extractor.extract_links(response) if not self.is_extracted(link.url)]
        
        #Crawl the next photo links
        for url in photo_urls:
            if (not self.is_extracted(url)):
                # print("NEXT PHOTO URL:",url)
                yield scrapy.Request(url, self.parse,dont_filter=True)
            else:
                continue

    #If the picture is on flickr, we use the Flickr API to get the original size link with the function flickr.photos.getSizes 
    def parse_flickr(self, response, name, author, license):
        #Filter out the link
        raw_url = response.css('size[label="Original"]').attrib['source']
        photo_url = response.css('size[label="Original"]').attrib['url']
        photo_url = photo_url.split('/')
        photo_page_url = ''
        for d in photo_url[:-3]:
            photo_page_url += d + '/'
        #Process the image into the infoFile
        id = CCScraper.getId()
        CCScraper.processImage(raw_url, name, author, license, photo_page_url)
        #Return a dictionary containing all important infos
        yield {
            'image_urls' : [raw_url],
            'image_id' : id #Because the ID is already incremented
        }

            
    def is_extracted(self, url):
        # Image urls are of type: https://www.pexels.com/photo/asphalt-blur-clouds-dawn-392010/
        id = (url.split('/'))[-1]
        if id not in CCScraper.crawled_ids:
            CCScraper.crawled_ids.add(id)
            print("Id:",id,"has been added to crawled links.")
            return False
        return True

    # custom_settings = {
    #     download_delay : 0.6    # 250 ms of delay
    # }
    download_delay = 1.0

