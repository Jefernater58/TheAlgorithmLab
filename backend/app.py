from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/generate-graph", methods=["GET"])
def generate_graph():
    node_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    num_nodes = int(request.args.get("nodes"))
    num_edges = int(request.args.get("edges"))

    print(num_nodes, num_edges)

    return jsonify([
        {"data": {"id": node_letters[i].lower(), "label": node_letters[i]}}
    ] for i in range(num_nodes))

    # return jsonify([
    #    {"data": {"id": "a", "label": "Node A"}},
    #    {"data": {"id": "b", "label": "Node B"}},
    #    {"data": {"id": "c", "label": "Node C"}},
    #    {"data": {"source": "a", "target": "b"}},
    #    {"data": {"source": "b", "target": "c"}}
    # ])


if __name__ == "__main__":
    app.run(debug=True)
