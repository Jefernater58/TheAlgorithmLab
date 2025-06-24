import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return <nav id="navbar">
        <Link to="/home">Home</Link>
        <Link to="/pathfinding">Pathfinding</Link>
    </nav>;
}

