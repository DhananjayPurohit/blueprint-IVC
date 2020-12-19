import pandas as pd

data = [['Vedang Joshi', 1.345, True], ['Dhananjay Purohit', 1.231, True], ['Ritik Jain', 2.3, False]]

df = pd.DataFrame(data, columns = ['name', 'time', 'correct'])

df.to_csv('file.csv')
