from os import listdir
from os.path import isfile, join
from pathlib import Path

def listFiles(path):
    onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
    return onlyfiles

def createFolderIfNeeded(p):
    Path(p).mkdir(parents=True, exist_ok=True)