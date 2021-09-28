import utils
import os

class Entry:
    def __init__(self, id, url, name, author, license, imageURL):
        self.id = int(id)
        self.url = url
        self.name = name
        self.author = author
        self.license = license
        self.imageURL = imageURL

    def __str__(self):
        s = [self.id, self.url, self.name, self.author, self.license, self.imageURL]
        return str(s)
    
    def __repr__(self):
        return self.__str__()


# infoFilePath = "D:/Documents/Uni Kurse/Bachelorarbeit/CC Crawler/infoFile.txt"
cleanInfoFilePath = "D:/Documents/Uni Kurse/Bachelorarbeit/CC Crawler/clean_infoFile.txt"
# infoFile = open(infoFilePath, 'r', encoding = 'utf-8')
imageFolderPath = 'D:/Documents/Uni Kurse/Bachelorarbeit/CC Crawler/images'

def fixLine(splitLine):
    if (len(splitLine)>6):
        newImageName = ''
        for element in splitLine[2:-3]:
            newImageName += element + ','
        newImageName = newImageName[-1] #Remove the last ','
        splitLine = splitLine[:2] + [newImageName] + splitLine[-3:]
    else:
        print("There is nothing to fix on this line:", splitLine)
    return splitLine

def createEntry(line):
    line = line[:-1]
    splitLine = line.split(',')
    #There might be a ',' in the name of the image - if that's the case build the split up name back together
    if (len(splitLine)>6):
        splitLine = fixLine(splitLine)
    return Entry(*splitLine)

def createEntries(f):
    header = f.readline()
    entries = []
    for line in f.readlines():
        entry = createEntry(line)
        entries.append(entry)
    return entries

def checkForDuplicates(li):
    duplicates = []
    for element in li:
        if li.count(element)>1:
            element.append(duplicates)
    return duplicates

def getImageNames(path = imageFolderPath):
    return utils.listFiles(path)

def getImageIds(imageNameList):
    imageIds = [int(imageName.split('_')[0]) for imageName in imageNameList]
    return imageIds

def createNewImageName(newId, oldName):
    temp = oldName.split('_')
    temp[0] = str(newId) #Overwrite existing id with new id
    newName = '_'.join(temp)
    return newName

def getImageIdFromName(imageName):
    return int(imageName.split()[0])

def sortImageNamesById(imageNameList):
    imageIds = getImageIds(imageNameList)
    toSort = [(i, name) for i,name in zip(imageIds, imageNameList)] #Create a list of tuples of type: [(0, '0_xxx_xxx_xxx.jpg), (1, '2_xxx_xxx_xxx.jpg), ...]
    # toSort = []
    # for i,name in zip(imageIds, imageNameList):
    #     t = (i, name)
    #     toSort.append(t)
    res = [pair[1] for pair in sorted(toSort, key = lambda pair:pair[0])]
    return res

def fixNumberingInInfoFile(infoFilePath):
    infoFile = open(infoFilePath, 'r', encoding='utf-8')
    header = infoFile.readline()
    print(header)
    lines = infoFile.readlines()
    for line,i in zip(lines, range(0,len(lines))):
            temp = line.split(',')
            temp[0] = str(i)
            lines[i] = ','.join(temp)
            print(line)
    infoFile = open(infoFilePath, 'w', encoding = 'utf-8')
    infoFile.write(header)
    infoFile.writelines(lines)
    infoFile.close()

def fixNumberingInImageFolder(imageFolderPath):
    imageNames = getImageNames(imageFolderPath) #list of strings
    imageNames = sortImageNamesById(imageNames)
    #Change the image names
    for imageName, id in zip(imageNames, range(0,len(imageNames))):
        oldImagePath = imageFolderPath + "/" + imageName
        newImageName = createNewImageName(id, imageName)
        newImagePath = imageFolderPath + "/" + newImageName
        os.rename(oldImagePath,newImagePath)
        print("Old Image Path:", oldImagePath)
        print("New Image Path:", newImagePath)
    print("Amount of pictures:",len(imageNames))
    print("Current id:", id)

#This function changes all image names in the image folder to correspond to progressive numbering, as well as the id's in the given info_file.txt
def fixIds(imageFolderPath, infoFilePath):
    #Change the image names
    # fixNumberingInImageFolder(imageFolderPath)
    #Change the id's in the info file
    # fixNumberingInInfoFile(infoFilePath)
    pass

fixIds(imageFolderPath, cleanInfoFilePath)


#All this was used just once ---- not important anymore
#Will contain the image entries
# entries = createEntries(infoFile)

# imageNames = utils.listFiles('D:/Documents/Uni Kurse/Bachelorarbeit/CC Crawler/images')
# imageIds = [int(imageName.split('_')[0]) for imageName in imageNames]
# imageIds.sort()

# # print("DUPLICATES:",checkForDuplicates(imageFlickrIds))
# # print(infoFile.seek(0,0))
# # print(infoFile.readline())
# # notDownloaded = []
# clean_info = open('clean_infoFile.txt','w',encoding='utf-8')
# iFile = open(infoFilePath, 'r', encoding = 'utf-8')
# h = iFile.readline() #Toss the header
# lines = iFile.readlines()
# print(len(imageIds), 'images downloaded')
# print(len(lines), "lines")
# for id in imageIds:
#     clean_info.write(lines[id])


#To see which pictures were "not downloaded" - turns out they are duplicates and should NOT have been downloaded in the first place! Good!
# for entry in entries:
#     url = entry.url
#     entry_flickr_id = url.split('/')[-1].split('_')[0]
#     if (entry.url in imageFlickrIds):
#         notDownloaded.append(entry)
#         # f_not.write(str(entry)[1:-1]) #Convert the entry back to string and remove the [ ] brackets for readability
#         # f_not.write('\n')
#         print(entry)


# print("Amount of downloaded pictures:", len(imageNames))