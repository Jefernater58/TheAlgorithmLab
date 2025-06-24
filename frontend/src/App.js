import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/hello`)
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);
}

export default App;


