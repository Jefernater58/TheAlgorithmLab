import {useRef, useState} from "react";
import Navbar from "../components/Navbar";
import "../styles/Pathfinding.css";
import "../styles/Global.css";
import {Play, Shuffle, Undo2} from "lucide-react";
import PathfindingGraph from "../components/PathfindingGraph"

export default function Pathfinding() {
    const graphRef = useRef(null);
    const [inputs, setInputs] = useState({start: "A", target: "Z"});
    const [playbackSpeed, setPlaybackSpeed] = useState("normal");
    const [nodeCount, setNodeCount] = useState("26");
    const [algorithm, setAlgorithm] = useState("dijkstras");

    const updateInput = (field, value) => {
        setInputs(prev => ({...prev, [field]: value}));
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function playSteps(steps) {
         let sleepTime = 750;
         if (playbackSpeed === "normal") sleepTime = 250;
         else if (playbackSpeed === "fast") sleepTime = 75;

        for (let i = 0; i < steps.length; i++) {
            for (let j = 0; j < steps[i].length; j++) {
                graphRef.current?.setCurrentStep(steps[i][j]);
            }
            await sleep(sleepTime);
            for (let j = 0; j < steps[i].length; j++) {
                graphRef.current?.setPastStep(steps[i][j]);
            }
        }
    }

    function playButtonPressed() {
        const elements = graphRef.current?.getElements();
        const start = inputs.start.toLowerCase();
        const target = inputs.target.toLowerCase();

        fetch(`${process.env.REACT_APP_API_URL}/api/run-pathfinder?start=${start}&target=${target}&algorithm=${algorithm}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({elements})
            }).then(res => res.json())
            .then(data => {
                if (data.target_reached) {
                    playSteps(data.steps).then(r => {
                        for (let i = 0; i < data.nodes_in_path.length; i++) {
                            let nodeId = data.nodes_in_path[i];
                            setGraphPathNode(nodeId);
                            graphRef.current?.setPathEdge(nodeId, data.nodes_in_path[i-1]);
                            graphRef.current?.setPathEdge(nodeId, inputs.start.toLowerCase());
                            graphRef.current?.setPathEdge(nodeId, inputs.target.toLowerCase());
                        }
                        graphRef.current?.setGraphTargetNode(inputs.target);
                    });
                }
            });
    }

    function resetPage() {
        window.location.reload();
    }

    function randomiseGraph() {
        let v = parseInt(nodeCount);
        if (!isNaN(v)) {
            if (v > 50) v = 50;
            else if (v < 2) v = 2;
            setNodeCount(v.toString());
        } else {
            setNodeCount("26");
            v = 26;
        }

        graphRef.current?.randomise(v).then(data => {
            const startNode = data.find(el => el.classes === "start");
            const targetNode = data.find(el => el.classes === "target");
            updateInput("start", startNode?.data?.label || "");
            updateInput("target", targetNode?.data?.label || "");
        });

    }

    function setNodeCountBounds(e) {
        let value = e.target.value;
        setNodeCount(value);
    }

    function setGraphPathNode(nodeId) {
        graphRef.current?.setGraphPathNode(nodeId);
    }

    function setGraphStart(event) {
        graphRef.current?.setGraphStartNode(event.target.value);
    }

    function setGraphTarget(event) {
        graphRef.current?.setGraphTargetNode(event.target.value);
    }


    return <div className="Global-container">
        <Navbar/>
        <div className="Global-mainbody">
            <div className="Pathfinding-options">
                <h2>Graph Options</h2>
                <label className="Global-input-label">num_nodes (min: 2, max: 50)</label>
                <input onChange={setNodeCountBounds} type="number" max="50" min="2" className="Global-text-input"
                       id="numNodes" value={nodeCount}/>
                <br/>
                <button onClick={randomiseGraph} style={{float: "left"}} className="Global-button"><Shuffle size="18"
                                                                                                            style={{marginRight: "4px"}}/>Generate
                    Graph
                </button>
                <br/><br/><br/>
                <h2>Pathfinding Options</h2>
                <label className="Global-input-label">algorithm</label>
                <select value={algorithm} onChange={(e) => {
                    setAlgorithm(e.target.value)
                }} className="Global-select" id="Algorithm">
                    <option value="dijkstras">Dijkstra's</option>
                    <option value="a*">A*</option>
                    <option value="breadth-first">Breadth-First Search</option>
                    <option value="depth-first">Depth-First Search</option>
                    <option value="greedy-best-first">Greedy Best-First Search</option>
                    <option value="bellman-ford">Bellman-Ford</option>
                    <option value="floyd-warshall">Floyd-Warshall</option>
                </select>
                <br/>
                <label className="Global-input-label">start_node</label>
                <input value={inputs.start} onChange={(e) => {
                    setGraphStart(e);
                    updateInput("start", e.target.value);
                }} type="text" className="Global-text-input" id="StartNode"/>
                <br/>
                <label className="Global-input-label">target_node</label>
                <input value={inputs.target} onChange={(e) => {
                    setGraphTarget(e);
                    updateInput("target", e.target.value);
                }} type="text" className="Global-text-input" id="TargetNode"/>
                <br/>
                <label className="Global-input-label">replay_speed</label>
                <select onChange={(e) => {
                    setPlaybackSpeed(e.target.value)
                }} value={playbackSpeed} className="Global-select" id="ReplaySpeed">
                    <option value="slow">Slow</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                </select>
                <br/>
                <button onClick={playButtonPressed} id="PlayButton" style={{float: "left", marginRight: "15px"}}
                        className="Global-button Global-accent-button"><Play size="18" style={{marginRight: "4px"}}/>Play
                </button>
                <button onClick={resetPage} id="ResetButton" style={{float: "right"}} className="Global-button"><Undo2
                    size="18" style={{marginRight: "4px"}}/>Reset
                </button>
            </div>
            <div className="Pathfinding-graph">
                <h2>Graph</h2>
                <PathfindingGraph ref={graphRef}/>
            </div>
        </div>
    </div>;
}
