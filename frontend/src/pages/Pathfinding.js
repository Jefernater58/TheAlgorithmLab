import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Pathfinding.css";
import "../styles/Global.css";
import {Play, Undo2} from "lucide-react";
import PathfindingGraph from "../components/PathfindingGraph"

export default function Pathfinding() {
    return <div className="Global-container">
        <Navbar />
        <div className="Global-mainbody">
            <div className="Pathfinding-options">
                <h2>Pathfinding Options</h2>
                <label className="Global-input-label">algorithm</label>
                <select className="Global-select" id="Algorithm">
                    <option value="dijkstras" selected>Dijkstra's</option>
                    <option value="a*">A*</option>
                    <option value="breadth-first">Breadth-First Search</option>
                    <option value="depth-first">Depth-First Search</option>
                    <option value="greedy-best-first">Greedy Best-First Search</option>
                    <option value="bellman-ford">Bellman-Ford</option>
                    <option value="floyd-warshall">Floyd-Warshall</option>
                </select>
                <br/>
                <label className="Global-input-label">start_node</label>
                <input type="text" className="Global-text-input" id="StartNode" defaultValue="A" />
                <br/>
                <label className="Global-input-label">target_node</label>
                <input type="text" className="Global-text-input" id="TargetNode" defaultValue="Z" />
                <br/>
                <label className="Global-input-label">replay_speed</label>
                <select className="Global-select" id="ReplaySpeed">
                    <option value="slow">Slow</option>
                    <option value="normal" selected>Normal</option>
                    <option value="fast">Fast</option>
                </select>
                <br/>
                <button id="PlayButton" style={{float: "left"}} className="Global-button Global-accent-button"><Play size="18" style={{marginRight: "4px"}}/>Play</button>
                <button id="ResetButton" style={{float: "right"}} className="Global-button"><Undo2 size="18" style={{marginRight: "4px"}}/>Reset</button>
            </div>
            <div className="Pathfinding-graph">
                <h2>Graph</h2>
                <PathfindingGraph />
            </div>
        </div>
    </div>;
}
