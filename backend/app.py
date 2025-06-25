from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route("/api/hello/generate-graph", methods=["GET"])
def generate_graph():


    return jsonify([
        {"data": {"id": "a", "label": "Node A"}},
        {"data": {"id": "b", "label": "Node B"}},
        {"data": {"id": "c", "label": "Node C"}},
        {"data": {"source": "a", "target": "b"}},
        {"data": {"source": "b", "target": "c"}}
    ])


if __name__ == "__main__":
    app.run(debug=True)
