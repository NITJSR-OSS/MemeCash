import requests
import profile
import os
import csv
from io import BytesIO
from PIL import Image


# Max number of file is 1137
with open("csv file path goes here") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=",")
    line_count = 0
    for row in csv_reader:
        if line_count < "no of file you want to download goes here max 1137":
            print(f"{line_count+1} starting")
            url = str(row[0])
            _, ext = os.path.splitext(url)
            r = requests.get(url)
            # Save path followed with respective names(here it is a directory named MemesFetched)
            i = Image.open(BytesIO(r.content)).save(
                f"MemesFetched/meme{line_count+1}{ext}"
            )
            print(f"{line_count+1} completed")
        else:
            print("End")
            break
        line_count += 1
