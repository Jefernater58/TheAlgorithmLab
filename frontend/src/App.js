import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
    useEffect(() => {
        fetch("https://your-flask-app.onrender.com/api/hello")
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);
}

export default App;


