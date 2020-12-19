from flask import Flask, request, make_response, jsonify, Response
import pandas as pd
from flask_cors import CORS
from mlsc import mls

from OpenSSL import SSL


app = Flask(__name__)
CORS(app, supports_credentials=True)
data = pd.read_csv('https://firebasestorage.googleapis.com/v0/b/aarambh-aider.appspot.com/o/images%2Ffile.csv?alt=media', index_col=0)
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
    data = [['Vedang Joshi', 9], ['Dhananjay Purohit', 8], ['Ritik Jain', 6]]
    df = pd.DataFrame(data, columns = ['name', 'score'])
    df = df.sort_values(by=['score'], ascending=False)
    resp = {
        "items": list(df.to_dict(orient="Index").values())
    }
    return jsonify(resp)

@app.route("/question")
def question():
    global text
    return jsonify({"items": mls(text).getResponse()})

if __name__ == '__main__':
    app.run(debug=True)
