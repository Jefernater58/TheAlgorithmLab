from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/generate-graph", methods=["GET"])
def generate_graph():
    num_nodes = request.args.get("nodes")
    num_edges = request.args.get("edges")

    print(num_nodes, num_edges)

    return jsonify([
        {"data": {"id": "a", "label": "Node A"}},
        {"data": {"id": "b", "label": "Node B"}},
        {"data": {"id": "c", "label": "Node C"}},
        {"data": {"source": "a", "target": "b"}},
        {"data": {"source": "b", "target": "c"}}
    ])


if __name__ == "__main__":
    app.run(debug=True)
