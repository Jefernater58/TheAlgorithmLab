import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import GraphView from "./components/GraphView";

function App() {
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/hello`)
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);

    const [graphData, setGraphData] = useState([]);

    // Simulate getting graph data from Flask
    useEffect(() => {
        // You can later replace this with a real fetch from Flask
        const exampleGraph = [
            { data: { id: 'a', label: 'Node A' } },
            { data: { id: 'b', label: 'Node B' } },
            { data: { id: 'c', label: 'Node C' } },
            { data: { source: 'a', target: 'b' } },
            { data: { source: 'b', target: 'c' } },
        ];
        setGraphData(exampleGraph);
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Graph Visualizer</h1>
            <GraphView elements={graphData} />
        </div>
    );
}

export default App;


