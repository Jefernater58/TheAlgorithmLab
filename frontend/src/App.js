import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Pathfinding from "./pages/Pathfinding";
import Sorting from "./pages/Sorting";
import Searching from "./pages/Searching";
import Extras from "./pages/Extras";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/pathfinding" element={<Pathfinding />} />
                <Route path="/Sorting" element={<Sorting />} />
                <Route path="/Searching" element={<Searching />} />
                <Route path="/Extras" element={<Extras />} />
            </Routes>
        </Router>
    );
}


