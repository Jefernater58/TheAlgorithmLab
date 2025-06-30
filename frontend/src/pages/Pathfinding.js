import React, {useState} from "react";
import Navbar from "../components/Navbar";
import "../styles/Pathfinding.css";
import "../styles/Global.css";

import PathfindingGraph from "../components/PathfindingGraph";
import PathfindingGrid from "../components/PathfindingGrid";

export default function Pathfinding() {
    const [showGraph, setShowGraph] = useState(true);

    const graphOption = {
        fontWeight: showGraph ? "bold": "normal",
    }
    const gridOption = {
        fontWeight: showGraph ? "normal": "bold",
    }

    return <div className="Global-container">
        <Navbar/>
        <div className="Pathfinding-navbar">
            <ul id="Pathfinding-list">
                <li onClick={() => setShowGraph(true)} style={graphOption} className="Pathfinding-listitem">Graph</li>
                <li onClick={() => setShowGraph(false)} style={gridOption} className="Pathfinding-listitem">2D Grid</li>
            </ul>
            <hr className="Navbar-divider" />
        </div>
        {showGraph ? <PathfindingGraph/> : <PathfindingGrid/>}
    </div>;
}
