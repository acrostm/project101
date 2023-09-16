import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({ name: '' });
  useEffect(() => {
    // fetch('/api')
  }, []);
  return (
    <div className="App">
      Hello, World!
      coded by _{data.name}
    </div>
  );
}

export default App;
