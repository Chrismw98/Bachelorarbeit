from os import listdir
from PIL import Image, ImageOps
from shutil import copy
import numpy as np

stimuliFolderName = "stimuli"

# imageNames = listdir(f'./resources/{stimuliFolderName}')

'''
Needed processing steps (after having copied):

#Create path entries to pre-download the resources in code_JS
imageNames = listdir('resources/stimuli')
pathEntries = createPathEntries(imageNames)
writePathEntries(pathEntries)

#Calculate the correct sizes and put them in the sizeDict in code_JS
sizes = createAdjustedSizes(imageNames, 500)
#Print them and just copy them from the console
for sizeEntry in sizes:
    print(sizeEntry)

#Create or Manually adjust the conditions.csv file, if needed
#createConditionsFile(2)

#Manually refresh the conditions.csv file in PsychoPy Builder

'''


def createPathEntries(imNames):
    #Create specified format
    nameObjects = []
    for imName in imNames:
        nameObject = "{name: ('%s'), path: ('resources/%s/%s')}" % (imName.split('.')[0], stimuliFolderName, imName)
        nameObjects.append(nameObject)
    return nameObjects

def writePathEntries(pathEntries):
    f = open('pathEntries.txt', 'w')
    
    for entry in pathEntries:
        f.write(entry + ',\n')

    f.close()

# def createConditionsFile(nForEachCategory):
#     conditions = open('conditionsTest.csv','w') #TODO: Change path and name
#     header = "environment,sunVisibility,cloudVisibility,imageId"
#     conditions.write(header + "\n")
#     for env in ['beach','landscape']:
#         for sv in ['invisiblesun','visiblesun']:
#             for cv in ['noclouds','yesclouds']:
#                 for n in range(0,nForEachCategory):
#                     line = f"{env},{sv},{cv},{n}"
#                     conditions.write(line + "\n")
#     conditions.close()



def getFinalImgsByCategory(finalImagesFolderPath):
    categoryFolders = listdir(finalImagesFolderPath)
    imgsPerCategory = dict()
    
    for categoryFolder in categoryFolders:
        imNames = listdir(finalImagesFolderPath+"/"+categoryFolder + "/merge")
        imNames.sort(key = lambda imName : int(imName.split('_')[0]))
        imPaths = [finalImagesFolderPath + "/" + categoryFolder + "/merge/" + imName for imName in imNames]
        imgList = []
        
        for expId,imPath,imNames in zip(range(0,len(imPaths)), imPaths, imNames):
            env, sunVis, cloudVis = categoryFolder.split('_')
            img = Img(imPath, env, sunVis,cloudVis,expId)
            imgList.append(img)

        imgsPerCategory[categoryFolder] = imgList
    
    return imgsPerCategory



class Img:
#     stimuliPath = "D:/Documents/Uni Kurse/Bachelorarbeit/Experiment/PsychoPy/resources/" + stimuliFolderName
    stimuliPath = "../Experiment/PsychoPy/resources" + stimuliFolderName

    def __init__(self,imPath, environment, sunVisibility, cloudVisibility,expId):
        self.de_ratingDict = dict()
        self.gr_ratingDict = dict()
        for i in range(1,11):
            self.de_ratingDict[i] = 0
            self.gr_ratingDict[i] = 0
        self.imPath = imPath
        self.environment = environment
        self.sunVisibility = sunVisibility
        self.cloudVisibility = cloudVisibility
        self.expId = int(expId)
        self.name = imPath.split('/')[-1]
        self.id = int(self.name.split('_')[0])
        self.expCat = f"{self.environment}_{self.sunVisibility}_{self.cloudVisibility}"
        self.expName = self.expCat + "_" + str(self.expId) + "." + self.name.split('.')[-1]
        self.expNameNoExt = self.expName.split('.')[0]
        self.expImPath = Img.stimuliPath + "/" + self.expName
        self.n = 0
        self.gr_n = 0
        self.de_n = 0
    
    def getImage(self):
        self.image = Image.open(self.imPath)
        self.image = ImageOps.exif_transpose(self.image)
        return self.image
    
    def closeImage(self):
        self.image.close()

    def closeImage(self):
        self.image.close

    def addRating(self, homeland, rating):
        if (homeland == 'de'):
            self.de_ratingDict[int(rating)]+=1
            self.de_n +=1
            self.n +=1
        elif(homeland=='gr'):
            self.gr_ratingDict[int(rating)]+=1
            self.gr_n +=1
            self.n +=1
        else:
            print("Invalid homeland:",homeland)

    def getN(self, homeland):
        if (homeland == 'de'):
            return self.de_n
        elif(homeland=='gr'):
            return self.gr_n
        else:
            print("Invalid homeland:",homeland)

    def getAllN(self):
        return self.n
            
    def getRatingDict(self, homeland):
        if (homeland == 'de'):
            return self.de_ratingDict
        elif(homeland=='gr'):
            return self.gr_ratingDict
        else:
            print("Invalid homeland:",homeland)

    def getAllRatingsAsDict(self):
        allRatingsDict = dict()
        for rating in self.de_ratingDict.keys():
            allRatingsDict[rating] = self.de_ratingDict[rating] + self.gr_ratingDict[rating]
        return allRatingsDict
    
    def getRatingsAsList(self, homeland):
        ratingDict = self.getRatingDict(homeland)
        res = []
        for rating in ratingDict.keys():
            freq = ratingDict[rating]
            for i in range(0, freq):
                res.append(rating)
        return res

    def getAllRatingsAsList(self):
        ratingDict = self.getAllRatingsAsDict()
        res = []
        for rating in ratingDict.keys():
            freq = ratingDict[rating]
            for i in range(0, freq):
                res.append(rating)
        return res

    def getFrequencyForRating(self, homeland, rating):
        ratingDict = self.getRatingDict(homeland)
        return ratingDict[int(rating)]


        # if (homeland == 'de'):
        #     return self.de_ratingDict[int(rating)]
        # elif(homeland=='gr'):
        #     return self.gr_ratingDict[int(rating)]
        # else:
        #     print("Invalid homeland:",homeland)

    def getAllFrequenenciesForRating(self, rating):
        return getAllRatingsAsDict[int(rating)]

    def getAverage(self, homeland):
        ratingsList = self.getRatingsAsList(homeland)
        return np.average(ratingsList)

    def getAllAverage(self):
        ratingsList = self.getAllRatingsAsList()
        return np.average(ratingsList)
        # rd_de = self.de_ratingDict
        # rd_gr = self.gr_ratingDict
        # res = 0
        # n=0
        # for key in rd_de.keys():
        #     freq_de = rd_de[key]
        #     freq_gr = rd_gr[key]
        #     sum += key*(freq_de + freq_gr)
        #     n = n + freq_de + freq_gr
        # return res/n

    def getMin(self, homeland):
        ratingsList = self.getRatingsAsList(homeland)
        return np.min(ratingsList)

    def getMax(self, homeland):
        ratingsList = self.getRatingsAsList(homeland)
        return np.max(ratingsList)
    
    def getMinMax(self, homeland):
        ratingsList = self.getRatingsAsList(homeland)
        return (np.min(ratingsList), np.max(ratingsList))

    def getAllMin(self):
        ratingsList = self.getAllRatingsAsList()
        return np.min(ratingsList)

    def getAllMax(self):
        ratingsList = self.getAllRatingsAsList()
        return np.max(ratingsList)

    def getAllMinMax(self):
        ratingsList = self.getAllRatingsAsList()
        return (np.min(ratingsList), np.max(ratingsList))

    def getVariance(self, homeland):
        ratingsList = self.getRatingsAsList(homeland)
        return np.var(ratingsList)
    
    def getAllVariance(self):
        ratingsList = self.getAllRatingsAsList()
        return np.var(ratingsList)

    def getStd(self, homeland):
        ratingsList = self.getRatingsAsList(homeland)
        return np.std(ratingsList)
    
    def getAllStd(self):
        ratingsList = self.getAllRatingsAsList()
        return np.std(ratingsList)
    
    def getN(self, homeland):
        return len(self.getRatingsAsList(homeland))

    def getAllN(self):
        return len(self.getAllRatingsAsList())


# finalImagesFolderPath = "D:/Documents/Uni Kurse/Bachelorarbeit/Labeler/final_images"
finalImagesFolderPath = "../Labeler/final_images"
# destinationPath = "D:/Documents/Uni Kurse/Bachelorarbeit/Experiment/PsychoPy/resources/" + stimuliFolderName
destinationPath = "../Experiment/PsychoPy/resources/" + stimuliFolderName

'''
Copying new images instructions:

#Put all images from "final_images/[environment]_[sunVisibility]_[cloudVisibility]/merge" into a dictionary, grouping by the image category
#This will also parse each image into an Img object, to be easier to work with
imgsDict = getFinalImgsByCategory(finalImagesFolderPath)

#Keep track of original and experiment names, by image id
writeInfoFileForDict(imgsDict)

#Copy all the images, also renaming them for the 
testCopyImagesForDict(imgsDict, limit=2) #limit to 2 for the experiment piloting phase
#copyImagesForDict(imgsDict) #This copies everything (should be 10 for each category)

'''

def writeInfoFileForImgList(imgList):
    infoFile = open('infoFile.csv','w', encoding='utf-8')
    header = "id,expName,expId"
    infoFile.write(header)
    for img in imgList:
        line = f"{img.id},{img.expName},{exp.expId}"
        infoFile.write(line + "\n")
    infoFile.close()

def sortImgDictToList(imgDict,ordering):
    res = []
    for category in imgDict.keys():
        for img in imgDict[category]:
            res.append(img)
    if (ordering == "expName"):
        pass
    elif (ordering == 'id'):
        res.sort(key = lambda img : img.id)
    elif (ordering == 'expId'):
        res.sort(key = lambda img : img.expId)
    else:
        print("Did not specify correct ordering: " + ordering)
    return res
        


def writeInfoFileForDict(imgDict, ordering = "expName"):
    infoFile = open('infoFile.csv','w', encoding='utf-8')
    header = "id,expName,expId\n"
    infoFile.write(header)
    sortedImgsList = sortImgDictToList(imgDict,ordering)
    for img in sortedImgsList:
        line = f"{img.id},{img.expName},{img.expId}"
        infoFile.write(line + "\n")
    infoFile.close()

def copyImagesForDict(imgDict):
    for category in imgDict.keys():
        for img in imgDict[category]:
            print("Copying: " + img.imPath)
            print("To: " + img.expImPath)
            copy(img.imPath,img.expImPath)

#Same as above, but for testing includes limit parameter
def testCopyImagesForDict(imgDict, limit=2):
    for category in imgDict.keys():
        counter = 0
        for img in imgDict[category]:
            if (counter>=limit):
                continue
            else:
                print("Copying: " + img.imPath)
                print("To: " + img.expImPath)
                copy(img.imPath,img.expImPath)
                counter+=1
        




def createAdjustedSizes(nameList, multiplyScalar = 1, path = f'resources/{stimuliFolderName}/'):
     res = []
     for name in nameList:
            currIm = Image.open(path + name)
            currIm = ImageOps.exif_transpose(currIm)
            w,h = currIm.size
            w,h = normByHeight(w,h)
            w,h = multiplyTuple((w,h),multiplyScalar)
            line = f"'{name.split('.')[0]}': [{w},{h}]," #Need to remove the file ending, cause we want to access the images through just the name
            res.append(line)
     return res

#Normalizes to height 1.0 - ratio stays the same
def normByHeight(width,height):
     newWidth = width/height
     newHeight = 1.0
     return newWidth, newHeight

def multiplyTuple(t, scalar):
    x, y = t
    x*=scalar
    y*=scalar
    return (x,y)
