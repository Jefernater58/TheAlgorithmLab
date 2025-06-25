import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css";
import "../styles/Global.css";
import DemoGraph from "../components/DemoGraph"

export default function Home() {
    return <div className="Global-container">
        <Navbar/>
        <div className="Global-mainbody">
            <div className="Home-hero">
                <h1>The Algorithm Lab</h1>
                <hr className="Home-divider"/>
                <img className="Home-badge" src="https://hackatime-badge.hackclub.com/U091J0C0QSJ/the-algorithm-lab"
                     alt="Hackatime Badge"/> <img className="Home-badge"
                                                  src="https://img.shields.io/github/created-at/Jefernater58/TheAlgorithmLab"
                                                  alt="Created At Badge"/> <img className="Home-badge"
                                                                                src="https://img.shields.io/github/last-commit/Jefernater58/TheAlgorithmLab"
                                                                                alt="Last Commit Badge"/>
                <p>Welcome! The purpose of this website is to experiment with different kinds of algorithms, and
                    discover
                    how they work. You can find the different parts of the site in the navbar along the top of the
                    screen.</p>

                <p><span style={{fontWeight: "bold"}}>Heads up! </span><br/>
                    This is my first website, so don't expect it to be perfect! If you run into any issues I would
                    really appreciate it if you could let me know! Thanks :)</p>
                <br/>
                <h2>Demo Graph</h2>
            </div>
            <DemoGraph/>
        </div>
    </div>;
}
