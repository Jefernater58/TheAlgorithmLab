import "../styles/Grid.css";
import React, { useState, useEffect, useRef, useCallback } from "react";

const clampScale = (raw) => {
    const n = parseInt(raw, 10);
    if (isNaN(n)) return 20;
    return Math.min(Math.max(n, 20), 100);
};

const Grid = ({ scaleString = "20" }) => {
    const [scale, setScale]       = useState(() => clampScale(scaleString));
    const [rowNum, setRowNum]     = useState(0);
    const [columnNum, setColumnNum] = useState(0);
    const [grid, setGrid]         = useState([]);
    const gridRef = useRef(null);

    const cellStyle = { width:  `${scale}px` };
    const rowStyle  = { height: `${scale}px` };

    const updateGridSize = useCallback(() => {
        if (!gridRef.current) return;
        const { clientWidth: w, clientHeight: h } = gridRef.current;
        setColumnNum(Math.floor(w / scale));
        setRowNum   (Math.floor(h / scale));
    }, [scale]);

    useEffect(() => {
        setScale(clampScale(scaleString));
    }, [scaleString]);

    useEffect(() => {
        window.addEventListener("resize", updateGridSize);
        return () => window.removeEventListener("resize", updateGridSize);
    }, [updateGridSize]);

    useEffect(updateGridSize, [scale]);

    useEffect(() => {
        setGrid(createGrid(rowNum, columnNum));
    }, [rowNum, columnNum]);

    return (
        <div className="Grid" ref={gridRef}>
            {grid.map((row, r) => (
                <div key={r} className="Grid-row" style={rowStyle}>
                    {row.map((cell, c) => (
                        <div
                            key={c}
                            className="Grid-cell"
                            style={cellStyle}
                            data-row={r}
                            data-col={c}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

const createGrid = (rows, cols) =>
    Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => ({
            row: r,
            col: c,
            isStart: false,
            isEnd:   false,
            isWall:  false,
            visited: false,
            distance: Infinity,
            previousNode: null,
        }))
    );

export default Grid;
