from flask import Flask, request, make_response, jsonify, Response
import pandas as pd
from flask_cors import CORS
from mlsc import mls

from OpenSSL import SSL


app = Flask(__name__)
CORS(app, supports_credentials=True)
# data = pd.read_csv('https://firebasestorage.googleapis.com/v0/b/aarambh-aider.appspot.com/o/images%2Ffile.csv?alt=media', index_col=0)
data = pd.DataFrame([], columns = ['name', 'time', 'correct'])
scor = pd.DataFrame([], columns = ['name', 'score'])
text = ""

@app.route("/submit", methods=['GET', 'POST'])
def home():
    global text
    if request.method == 'POST':
        text = request.get_json(force=True)
        print(text)
        return jsonify(message="Success", statusCode=201)
    else:
        return jsonify(message="use post", statusCode=200)

@app.route('/leader')
def leaderboard():
    temp = data
    temp = temp.sort_values(by=['time'])

    resp = {
        "items": list(temp.to_dict(orient="Index").values())
    }
    return jsonify(resp)

@app.route('/score')
def score():
    global scor
    scor = scor.sort_values(by=['score'], ascending=False)
    resp = {
        "items": list(scor.to_dict(orient="Index").values())
    }
    return jsonify(resp)

@app.route("/question")
def question():

    global data
    data = pd.DataFrame(data, columns = ['name', 'time', 'correct'])

    text = "Android is a mobile operating system based on a modified version of the Linux kernel and other open source software, designed primarily for touchscreen mobile devices such as smartphones and tablets. Android is developed by a consortium of developers known as the Open Handset Alliance and commercially sponsored by Google. It was unveiled in November 2007, with the first commercial Android device launched in September 2008. It is free and open source software; its source code is known as Android Open Source Project (AOSP), which is primarily licensed under the Apache License. However most Android devices ship with additional proprietary software pre-installed,[10] most notably Google Mobile Services (GMS)[11] which includes core apps such as Google Chrome, the digital distribution platform Google Play and associated Google Play Services development platform. About 70 percent of Android smartphones run Google's ecosystem;[12] competing Android ecosystems and forks include Fire OS (developed by Amazon) or LineageOS. However the \"Android\" name and logo are trademarks of Google which impose standards to restrict \"uncertified\" devices outside their ecosystem to use Android branding."
    return jsonify(mls(text).getResponse())

@app.route("/answer", methods=['POST'])
def answer():
    global data
    global scor
    if request.method == 'POST':
        l = eval(str(request.get_json(force=True)))
        for i in range(2):
            kl = {"correct": l[i]['isCorrect'], "name": l[i]['name'], "time": l[i]['time']}
            data = data.append(kl, ignore_index=True)

        sc = 0
        if l[0]['isCorrect']:
            sc += 1
        if l[1]['isCorrect']:
            sc += 1

        scor = scor.append({"name": l[0]['name'], "score": sc}, ignore_index=True)

        return jsonify({"message": "OK"});

if __name__ == '__main__':
    app.run(debug=True)
