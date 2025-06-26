from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)


@app.route("/api/generate-graph", methods=["GET"])
def generate_graph():
    num_nodes = int(request.args.get("nodes"))

    node_letters = "abcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρστυφχψω"[:num_nodes]
    print(node_letters)
    result = ([{"data": {"id": node_letters[0], "label": node_letters[0].upper()}, "classes": "start"}] +
              [{"data": {"id": node_letters[i], "label": node_letters[i].upper() if i < 26 else node_letters[i]}}
              for i in range(1, num_nodes - 1)] +
              [{"data": {"id": node_letters[-1], "label": node_letters[-1].upper() if node_letters.index(node_letters[-1]) < 26 else node_letters[-1]}, "classes": "target"}])

    for j in range(num_nodes):
        source = node_letters[j]
        result.append({"data": {"source": source, "target": random.choice(node_letters.replace(source, ""))}})

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
