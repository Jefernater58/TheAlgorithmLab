import CytoscapeComponent from "react-cytoscapejs"
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import {useEffect, useState} from "react";

cytoscape.use(dagre);

export default function PathfindingGraph() {
    const layout = {
        name: "breadthfirst",
        directed: false,
        padding: 10,
        spacingFactor: 1.75,
        animate: true,
        roots: ["A"]
    };

    const [graphElements, setGraphElements] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/generate-graph?nodes=20&edges=20`)
            .then((res) => res.json())
            .then((data) => setGraphElements(data));
    })

    const stylesheet = [
        {
            selector: "node",
            style: {
                "background-color": "#eff1f5",
                "width": "40px",
                "height": "40px",
                "label": "data(label)",
                "color": "#4c4f69",
                "font-size": "14px",
                "text-valign": "center",
                "text-halign": "center",
                "border-color": "#4c4f69",
                "border-width": 1,
                "shape": "ellipse"
            }
        },
        {
            selector: "node.start",
            style: {
                "background-color": "#30c748"
            }
        },
        {
            selector: "node.target",
            style: {
                "background-color": "#ef4444",
                "shape": "diamond"
            }
        },

        {
            selector: "edge",
            style: {
                "line-color": "#4c4f69",
                "width": 1,
                "curve-style": "bezier",
                "target-arrow-shape": "triangle",
                "target-arrow-color": "#94a3b8",
                "font-size": "16px",
                "text-rotation": "autorotate",
                "text-margin-y": -14,
                "color": "#374151"
            }
        },
        {
            selector: "edge.heavy",
            style: {
                "line-color": "#f97316",
                "target-arrow-color": "#f97316",
                "width": 4
            }
        },

        {
            selector: "node:selected",
            style: {"border-width": 3, "border-color": "#7287fd", "cursor": "pointer"}
        },
        {
            selector: "edge:selected",
            style: {"width": 6, "cursor": "pointer"}
        }
    ];

    return (
        <div style={{width: "100%", height: "calc(100% - 70px)", margin: "auto"}}>
            <CytoscapeComponent
                elements={graphElements}
                style={{width: "100%", height: "100%", border: "1px solid #4c4f69", background: "#eff1f588"}}
                layout={layout}
                stylesheet={stylesheet}
            />
        </div>
    );
}
