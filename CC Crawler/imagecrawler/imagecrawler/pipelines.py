# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
# from itemadapter import ItemAdapter


# class ImagecrawlerPipeline:
#     def process_item(self, item, spider):
#         return item
from scrapy.pipelines.images import ImagesPipeline

class customImagePipeline(ImagesPipeline):

    def file_path(self, request, response = None, info = None, *, item=None):
        # adapter = ItemAdapter(item)
        # print(item)
        im_id = item['image_id']
        fileName = str(im_id) + '_' + request.url.split('/')[-1] #The latter is the image name
        return fileName