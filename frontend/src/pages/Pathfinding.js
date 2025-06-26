import {useRef} from "react";
import Navbar from "../components/Navbar";
import "../styles/Pathfinding.css";
import "../styles/Global.css";
import {Play, Shuffle, Undo2} from "lucide-react";
import PathfindingGraph from "../components/PathfindingGraph"

export default function Pathfinding() {
    const graphRef = useRef(null);

    function randomiseGraph(event, nodes="26") {
        // TODO: the button randomiseGraph needs to make it have the correct number of nodes
        if (isNaN(parseInt(nodes))) nodes = 26;
        else if (parseInt(nodes) > 50) nodes = 50;
        else if (parseInt(nodes) < 2) nodes = 2;
        graphRef.current?.randomise(parseInt(nodes));
    }

    function setGraphStart(event) {
        graphRef.current?.setGraphStartNode(event.target.value);
    }
    function setGraphTarget(event) {
        graphRef.current?.setGraphTargetNode(event.target.value);
    }

    return <div className="Global-container">
        <Navbar />
        <div className="Global-mainbody">
            <div className="Pathfinding-options">
                <h2>Graph Options</h2>
                <label className="Global-input-label">num_nodes (min: 2, max: 50)</label>
                <input onChange={(e) => randomiseGraph(e, e.target.value)} type="number" max="50" min="2" className="Global-text-input" id="numNodes" defaultValue="26" />
                <br/>
                <button onClick={randomiseGraph} style={{float: "left"}} className="Global-button"><Shuffle size="18" style={{marginRight: "4px"}}/>Randomise Graph</button>
                <br/><br/><br/>
                <h2>Pathfinding Options</h2>
                <label className="Global-input-label">algorithm</label>
                <select defaultValue={"dijkstras"} className="Global-select" id="Algorithm">
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
                <input onChange={setGraphStart} type="text" className="Global-text-input" id="StartNode" defaultValue="A" />
                <br/>
                <label className="Global-input-label">target_node</label>
                <input onChange={setGraphTarget} type="text" className="Global-text-input" id="TargetNode" defaultValue="Z" />
                <br/>
                <label className="Global-input-label">replay_speed</label>
                <select defaultValue="normal" className="Global-select" id="ReplaySpeed">
                    <option value="slow">Slow</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                </select>
                <br/>
                <button id="PlayButton" style={{float: "left", marginRight: "15px"}} className="Global-button Global-accent-button"><Play size="18" style={{marginRight: "4px"}}/>Play</button>
                <button id="ResetButton" style={{float: "right"}} className="Global-button"><Undo2 size="18" style={{marginRight: "4px"}}/>Reset</button>
            </div>
            <div className="Pathfinding-graph">
                <h2>Graph</h2>
                <PathfindingGraph ref={graphRef} />
            </div>
        </div>
    </div>;
}
