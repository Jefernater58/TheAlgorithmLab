from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)


@app.route("/api/generate-graph", methods=["GET"])
def generate_graph():
    num_nodes = int(request.args.get("nodes"))
    num_edges = int(request.args.get("edges"))

    node_letters = "abcdefghijklmnopqrstuvwxyz"[:num_nodes]

    result = [{"data": {"id": node_letters[i], "label": node_letters[i].upper()}}
              for i in range(num_nodes)]

    for j in range(num_nodes):
        source = node_letters[j]
        result.append({"data": {"source": source, "target": random.choice(node_letters.replace(source, ""))}})

    """total_edges = 0
    while True:
        if total_edges >= num_edges:
            break

        source = random.choice(node_letters)
        target = random.choice(node_letters.replace(source, ""))
        data = {"data": {"source": source, "target": target}}

        if data not in result:
            result.append(data)
            total_edges += 1"""

    return jsonify(result)

    # return jsonify([
    #    {"data": {"id": "a", "label": "Node A"}},
    #    {"data": {"id": "b", "label": "Node B"}},
    #    {"data": {"id": "c", "label": "Node C"}},
    #    {"data": {"source": "a", "target": "b"}},
    #    {"data": {"source": "b", "target": "c"}}
    # ])


if __name__ == "__main__":
    app.run(debug=True)
