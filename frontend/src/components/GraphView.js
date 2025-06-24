import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

function GraphView({ elements }) {
    const cyRef = useRef(null);

    useEffect(() => {
        // Clear previous graph
        if (cyRef.current) {
            cyRef.current.innerHTML = '';
        }

        cytoscape({
            container: cyRef.current,
            elements: elements,
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#0074D9',
                        'label': 'data(label)',
                        'text-valign': 'center',
                        'color': '#fff',
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ],
            layout: { name: 'circle' }
        });
    }, [elements]);

    return (
        <div ref={cyRef} style={{ width: '100%', height: '500px', border: '1px solid #ddd' }} />
    );
}

export default GraphView;
