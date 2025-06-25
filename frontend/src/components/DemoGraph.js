import CytoscapeComponent from "react-cytoscapejs";

export default function DemoGraph() {
    const elements = [
        // Nodes
        {data: {id: "A", label: "A"}},
        {data: {id: "B", label: "B"}},
        {data: {id: "C", label: "C"}},
        {data: {id: "D", label: "D"}},
        {data: {id: "E", label: "E"}},
        {data: {id: "F", label: "F"}},

        // Edges (with weights)
        {data: {source: "A", target: "B", weight: 2}},
        {data: {source: "A", target: "C", weight: 4}},
        {data: {source: "B", target: "D", weight: 1}},
        {data: {source: "C", target: "D", weight: 3}},
        {data: {source: "D", target: "E", weight: 6}},
        {data: {source: "E", target: "F", weight: 2}},
        {data: {source: "F", target: "A", weight: 5}}
    ];

    const stylesheet = [
        /* ---- NODES ---- */
        {
            selector: "node",
            style: {
                "background-color": "#eff1f5",        // default node fill
                "width": "40px",
                "height": "40px",
                "label": "data(label)",              // pull label from data
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
            style: {                               // give start node a tint
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

        /* ---- EDGES ---- */
        {
            selector: "edge",
            style: {
                "line-color": "#4c4f69",
                "width": 1,
                "curve-style": "bezier",
                "target-arrow-shape": "triangle",
                "target-arrow-color": "#94a3b8",
                "label": "data(weight)",              // show weights
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

        /* ---- ON-HOVER (interactive) ---- */
        {
            selector: "node:selected",
            style: {"border-width": 3, "border-color": "#38bdf8", "cursor": "pointer"}
        },
        {
            selector: "edge:selected",
            style: {"width": 6, "cursor": "pointer"}
        }
    ];

    return (
        <div style={{width: "600px", height: "400px", margin: "auto"}}>
            <CytoscapeComponent
                elements={elements}
                style={{width: "100%", height: "100%", border: "1px solid #4c4f69", background: "#eff1f588"}}
                layout={{name: "circle"}}
                stylesheet={stylesheet}
            />
        </div>
    );
}
