import time

f = open('./AVA.txt','r')
tagName = 'sky' #The tag we want to parse out of the big file
tagNo = '7'#In string form so that we don't need to parse the entry to int everytime

def parse(f, tagNumber):
    l1 = f.readline()
    line = l1[:-1] #Drop the \n at the end
    i = 0
    res = []
    while (line != ''):
        entry = line.split(' ')
        if (tagNumber in entry[12:14]): #If the tag number is found in column 13 or 14 (counting from 1)
            res.append(entry)
        if (i%50000 == 0): #Just for logging purposes
            print('Currently at entry: ', i)
        i+=1
        line = f.readline()
    print('Currently at entry: ', i)
    return res

#Parsing the big file into a list of entries
print('Starting parsing now.')
startParse = time.time()
skyEntries = parse(f, tagNo)
endParse = time.time()
parsingTime = endParse - startParse
print("Finished parsing in ", parsingTime, " seconds.")

#Writing the list of entries to a new text file
finalFileName = 'AVA-'+tagName+'.txt' #Create the filename according to the tag name
finalFile = open(finalFileName,'w')
print('Starting writing now.')
startWrite = time.time()
for e in skyEntries:
    line = ' '.join(e) #Flatten the entry into a string
    # line += '\n' #Append the new line at the end
    finalFile.write(line)
endWrite = time.time()
writingTime = endWrite - startWrite
print('Finished writing in ', writingTime, ' seconds.')

print('Entries containing the category ',tagName,' (7): ', len(skyEntries))