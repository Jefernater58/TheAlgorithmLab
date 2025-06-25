import CytoscapeComponent from "react-cytoscapejs";

export default function DemoGraph() {
    const elements = [
        {data: {id: "A", label: "A"}},
        {data: {id: "B", label: "B"}},
        {data: {id: "C", label: "C"}},
        {data: {id: "D", label: "D"}},
        {data: {id: "E", label: "E"}},
        {data: {id: "F", label: "F"}},

        {data: {source: "A", target: "B",}},
        {data: {source: "A", target: "C",}},
        {data: {source: "B", target: "D",}},
        {data: {source: "C", target: "D",}},
        {data: {source: "D", target: "E",}},
        {data: {source: "E", target: "F",}},
        {data: {source: "F", target: "A",}}
    ];

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
            style: {"border-width": 3, "border-color": "#7287fd"}
        },
        {
            selector: "edge:selected",
            style: {"width": 6}
        }
    ];

    return (
        <div style={{width: "600px", height: "400px", margin: "auto"}}>
            <CytoscapeComponent
                elements={elements}
                style={{width: "100%", height: "100%", border: "1px solid #4c4f69", background: "#eff1f588"}}
                layout={{name: "breadthfirst", roots: ["A"]}}
                stylesheet={stylesheet}
            />
        </div>
    );
}
