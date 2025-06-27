from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)


@app.route("/api/run-pathfinder", methods=["POST"])
def run_pathfinder():
    algorithm = request.args.get("algorithm")
    start = request.args.get("start")
    target = request.args.get("target")
    elements = request.get_json()

    print(algorithm, start, target)
    print("\n\n")
    print(elements)

    return jsonify([])


@app.route("/api/generate-graph", methods=["GET"])
def generate_graph():
    num_nodes = int(request.args.get("nodes"))

    node_letters = "abcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρστυφχψω"[:num_nodes]

    nodes = ([{"data": {"id": node_letters[0], "label": node_letters[0].upper()}, "classes": "start"}] +
              [{"data": {"id": node_letters[i], "label": node_letters[i].upper() if i < 26 else node_letters[i]}}
              for i in range(1, num_nodes - 1)] +
              [{"data": {"id": node_letters[-1], "label": node_letters[-1].upper() if node_letters.index(node_letters[-1]) < 26 else node_letters[-1]}, "classes": "target"}])

    edges = []

    current_node = 0
    while current_node < num_nodes:
        source = node_letters[current_node]
        target = random.choice(node_letters.replace(source, ""))

        exists = False
        for edge in edges:
            if source == edge["data"]["target"] and target == edge["data"]["source"]:
                exists = True
                break

        if not exists:
            edges.append({"data": {"source": source, "target": target}})
            current_node += 1

    return jsonify(nodes + edges)


if __name__ == "__main__":
    app.run(debug=True)
