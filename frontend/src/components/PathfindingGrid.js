import {useEffect, useRef, useState} from "react";
import "../styles/Pathfinding.css";
import "../styles/Global.css";
import {Play, Shuffle, Undo2} from "lucide-react";
import Grid from "../components/Grid";

export default function PathfindingGrid() {
    const [algorithm, setAlgorithm] = useState("dijkstras");
    const [playbackSpeed, setPlaybackSpeed] = useState("normal");
    const [gridWidth, setGridWidth] = useState("20");
    const [gridHeight, setGridHeight] = useState("20");

    function playButtonPressed() {

    }

    useEffect(() => {
        console.log(gridWidth);
    }, [gridWidth]);

    useEffect(() => {
        console.log(gridHeight);
    }, [gridHeight]);

    return <div className="Global-mainbody Pathfinding-mainbody">
        <div className="Pathfinding-options">
            <h2>Grid Options</h2>
            <label className="Global-input-label">grid_width (min: 2, max: 50)</label>
            <input onChange={(e) => {setGridWidth(e.target.value)}} type="number"
                   max="50" min="2" className="Global-text-input" value={gridWidth}/>
            <br/>
            <label className="Global-input-label">grid_height (min: 2, max: 50)</label>
            <input onChange={(e) => {setGridHeight(e.target.value)}} type="number"
                   max="50" min="2" className="Global-text-input" value={gridHeight}/>

            <br/><br/>
            <h2>Pathfinding Options</h2>
            <label className="Global-input-label">algorithm</label>
            <select value={algorithm} onChange={(e) => {setAlgorithm(e.target.value)}} className="Global-select" id="Algorithm">
                <option value="dijkstras">Dijkstra's</option>
                <option value="a*">A*</option>
                <option value="breadth-first">Breadth-First Search</option>
                <option value="depth-first">Depth-First Search</option>
                <option value="greedy-best-first">Greedy Best-First Search</option>
                <option value="bellman-ford">Bellman-Ford</option>
                <option value="floyd-warshall">Floyd-Warshall</option>
            </select>
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
            <button onClick={window.location.reload} id="ResetButton" style={{float: "right"}} className="Global-button"><Undo2
                size="18" style={{marginRight: "4px"}}/>Reset
            </button>
        </div>
        <div className="Pathfinding-graph">
            <Grid/>
        </div>
    </div>;
}