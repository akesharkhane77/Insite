import sys
import os
import time
path = "uploads/"
for filename in os.listdir(path):
    file_path = os.path.join(path, filename)
    print("<div class='innerContainer'>")
    with open(file_path,'r', encoding="ISO-8859-1") as f:
      t = f.read()
      t = t.split()
      print(t)
    print("</div>")
    try:
        time.sleep(1)
        os.remove(file_path)
    except:
        print("Somethig went wrong",file_path)
#sys.stdout.flush() 