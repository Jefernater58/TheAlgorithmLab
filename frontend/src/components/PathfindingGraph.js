import CytoscapeComponent from "react-cytoscapejs"
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import {useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";

cytoscape.use(dagre);

export default forwardRef((props, ref) => {
    const cyRef = useRef(null);
    const [graphElements, setGraphElements] = useState([]);

    useImperativeHandle(ref, () => ({
        async randomise(numNodes) {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/generate-graph?nodes=${numNodes}`);
            const data = await response.json();
            setGraphElements(data);

            const cy = cyRef.current;
            cy.nodes().removeClass("start target");

            return data
        },

        setGraphStartNode(startNode) {
            const cy = cyRef.current;
            cy.nodes().removeClass("start");
            cy.getElementById(startNode.toLowerCase()).addClass("start");
        },
        setGraphTargetNode(targetNode) {
            const cy = cyRef.current;
            cy.nodes().removeClass("target");
            cy.getElementById(targetNode.toLowerCase()).addClass("target");
        },

        getGraphStartNode() {
            for (let i = 0; i < graphElements.length; i++) {
                const node = graphElements[i];
                if (node.classes === "start") {
                    return node.data.label
                }
            }

            return "";
        },
        getGraphTargetNode() {
            for (let i = 0; i < graphElements.length; i++) {
                const node = graphElements[i];
                if (node.classes === "target") {
                    return node.data.label
                }
            }

            return "";
        }
    }))

    const layout = {
        name: "dagre",
        nodeSep: 50,
        edgeSep: 10,
        rankSep: 50,
        rankDir: "LR",
        padding: 20,
        animate: true
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/generate-graph?nodes=26`)
            .then((res) => res.json())
            .then((data) => {
                setGraphElements(data);
            });
    }, []);

    useEffect(() => {
        if (cyRef.current && graphElements.length > 0) {
            cyRef.current.json({elements: graphElements});
            cyRef.current.layout(layout).run();
        }
    }, [graphElements]);

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
                "border-width": 4,
                "border-color": "#30c748",     // green
                "border-style": "solid",
            }
        },
        {
            selector: "node.target",
            style: {
                "border-width": 4,
                "border-color": "#ef4444",     // red
                "border-style": "solid",
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
        <div style={{width: "100%", height: "calc(100% - 70px)", margin: "auto"}}>
            <CytoscapeComponent
                cy={(cy) => {
                    cyRef.current = cy
                }}
                elements={graphElements}
                style={{width: "100%", height: "100%", border: "1px solid #4c4f69", background: "#eff1f588"}}
                layout={layout}
                stylesheet={stylesheet}
            />
        </div>
    );
});