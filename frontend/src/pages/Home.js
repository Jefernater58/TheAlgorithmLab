import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css";
import "../styles/Global.css";

export default function Home() {
    return <div className="Global-container">
        <Navbar />
        <h1>The Algorithm Lab</h1>
    </div>;
}
