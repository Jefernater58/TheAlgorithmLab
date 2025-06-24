import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({ original: [], sorted: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/sort")
        .then((res) => res.json())
        .then((result) => setData(result));
  }, []);

  return (
      <div style={{ padding: 20 }}>
        <h1>Sorting Visualizer</h1>
        <p><strong>Original:</strong> {data.original.join(", ")}</p>
        <p><strong>Sorted:</strong> {data.sorted.join(", ")}</p>
      </div>
  );
}

export default App;

