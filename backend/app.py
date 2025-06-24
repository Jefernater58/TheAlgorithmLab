from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/sort")
def sort_data():
    data = [5, 3, 8, 1, 2]
    sorted_data = sorted(data)
    return jsonify({"original": data, "sorted": sorted_data})


if __name__ == "__main__":
    app.run(debug=True)
