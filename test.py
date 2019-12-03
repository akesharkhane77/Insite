import os
path = "uploads/"
for filename in os.listdir(path):
    file_path = os.path.join(path, filename)
    print("<div class='innerContainer'>")
    with open(file_path, 'r') as f:
      t = f.read()
      t = t.split()
      print(t)
      print("</div>")
    os.remove(file_path)