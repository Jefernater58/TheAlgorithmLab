import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
    return <nav id="Navbar-navbar">
        <ul id="Navbar-list">
            <li><NavLink className="Navbar-link" to="/home">Home</NavLink></li>
            <li><NavLink className="Navbar-link" to="/pathfinding">Pathfinding</NavLink></li>
            <li><NavLink className="Navbar-link" to="/sorting">Sorting</NavLink></li>
            <li><NavLink className="Navbar-link" to="/searching">Searching</NavLink></li>
            <li><NavLink className="Navbar-link" to="/extras">Extras ;)</NavLink></li>
        </ul>
    </nav>;
}

