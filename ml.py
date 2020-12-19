from textblob import TextBlob
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from PyDictionary import PyDictionary

text = "An integrated circuit or monolithic integrated circuit (also referred to as an IC, a chip, or a microchip) is a set of electronic circuits on one small flat piece (or \"chip\") of semiconductor material that is normally silicon. The integration of large numbers of tiny MOS transistors into a small chip results in circuits that are orders of magnitude smaller, faster, and less expensive than those constructed of discrete electronic components. The IC's mass production capability, reliability, and building-block approach to integrated circuit design has ensured the rapid adoption of standardized ICs in place of designs using discrete transistors. ICs are now used in virtually all electronic equipment and have revolutionized the world of electronics. Computers, mobile phones, and other digital home appliances are now inextricable parts of the structure of modern societies, made possible by the small size and low cost of ICs."

sentences = text.split(".")

noun = []
proper = []
blob = TextBlob(text)

for i in blob.tags:
    if i[1] == 'NNP':
        proper.append(i[0])

for i in blob.tags:
    if i[1] == 'NN':
        noun.append(i[0])

print(set(noun))
print(set(proper))

for i in set(proper):
    print(i, text.count(i))

kl = set()

final = []

for i in set(proper):
    for j in sentences:
        if i in j:
            if j not in kl:
                final.append(j.replace(i, "_____"))
                kl.add(j)

print(random.choice(final))

dictionary = PyDictionary()
# print(blob.tags)
gh = set()

seg = []
for i in blob.tags:
    if i[1] == 'JJ':
        if i not in gh:
            gh.add(i[0])
            ss = dictionary.antonym(i[0])
            if ss is not None:
                seg.append((i[0], ss[0]))

sek = set()
tr = []
for i in sentences:
    for j in seg:
        if j[0] in i:
            if i not in sek:
                sek.add(i)
                tr.append(i.replace(j[0], j[1]))

print(tr)
