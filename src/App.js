import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from './home';
import Level1 from './Gamepage3/Level1';
import Level2 from './Gamepage3/Level2';
import Level3 from './Gamepage3/Level3';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Level1" element={<Level1 />} />
          <Route path="/Level2" element={<Level2 />} />
          <Route path="/Level3" element={<Level3 />} />
          <Route path="/level3" element={<Level3 />} />
        </Routes>
      </BrowserRouter>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
