import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Pathfinding from "./pages/Pathfinding";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/pathfinding" element={<Pathfinding />} />
            </Routes>
        </Router>
    );
}


