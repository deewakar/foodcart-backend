import matplotlib.pyplot as plt
import numpy as np
import json

with open('graph.json', 'r') as fp:
    data = json.load(fp) 

# x-axis , number of trees in Random Forest
x = []

# classification measures as different lines
accuracy = []
precision = []
recall = []
f1 = []

for item in data:
   x.append(item['maxTrees']); 
   accuracy.append(item['accuracy'])
   precision.append(item['precision'])
   recall.append(item['recall'])
   f1.append(item['f1'])

plt.figure(num = 3, figsize=(8, 5))
plt.xlabel("Number of Trees in Random Forest")
plt.ylabel("Classification Measures")
plt.plot(x, accuracy, color='red', linewidth=1.0, label="Accuracy")
plt.plot(x, precision, color='blue', linewidth=1.0, label="Precision")
plt.plot(x, recall, color='orange', linewidth=1.0, label="Recall")
plt.plot(x, f1, color='magenta', linewidth=1.0, label="F1-Score")
plt.legend()

plt.show()
