from flask import Flask, request, make_response, jsonify, Response

app = Flask(__name__)

@app.route("/submit", methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        print(request.get_json())
        return jsonify(message="Success", statusCode=201)
    else:
        return jsonify(message="use post", statusCode=200)


if __name__ == '__main__':
    app.run(debug=True)
