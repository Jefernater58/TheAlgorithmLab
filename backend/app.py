from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import math

app = Flask(__name__)
CORS(app)


@app.route("/api/run-pathfinder", methods=["POST"])
def run_pathfinder():
    algorithm = request.args.get("algorithm")
    start = request.args.get("start")
    target = request.args.get("target")
    elements = request.get_json()["elements"]

    nodes_json = []
    edges_json = []
    for element in elements:
        if element["group"] == "nodes":
            nodes_json.append(element)
        else:
            edges_json.append(element)

    if algorithm == "dijkstras":
        return dijkstras(nodes_json, edges_json)

    return jsonify([])


def dijkstras(nodes_json, edges_json):
    unvisited_nodes = [{"id": n["data"]["id"], "previous_node": "", "distance_from_start": 0 if "start" in n["classes"] else math.inf, "target": "target" in n["classes"]} for n in nodes_json]
    visited_nodes = []

    while True:
        lowest_distance = math.inf
        current_node = None
        for node in unvisited_nodes:
            if node["distance_from_start"] < lowest_distance:
                lowest_distance = node["distance_from_start"]
                current_node = node
        if current_node is None:
            return jsonify({"target_reached": False})

        unvisited_nodes.remove(current_node)
        visited_nodes.append(current_node)

        if current_node["target"]:
            target_node_id = current_node["id"]
            break

        neighbours_id = get_neighbours(current_node["id"], edges_json)
        for node in unvisited_nodes:
            if node["id"] in neighbours_id:
                new_distance = current_node["distance_from_start"] + 1
                if new_distance < node["distance_from_start"]:
                    node["distance_from_start"] = new_distance
                    node["previous_node"] = current_node["id"]

    nodes_in_path_id = []
    current_id = target_node_id
    done = False
    while not done:
        for node in visited_nodes:
            if node["id"] == current_id:
                if node["distance_from_start"] == 0:
                    nodes_in_path_id.pop()
                    done = True
                    break
                nodes_in_path_id.append(node["previous_node"])
                current_id = node["previous_node"]

    return jsonify({"target_reached": True, "nodes_in_path": nodes_in_path_id})


def get_neighbours(node_id, edges_json):
    neighbours = []
    for edge in edges_json:
        if edge["data"]["source"] == node_id:
            neighbours.append(edge["data"]["target"])
        elif edge["data"]["target"] == node_id:
            neighbours.append(edge["data"]["source"])
    return neighbours


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
