import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Login from './components/forms/login/Login';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="d-flex flex-row-reverse main-content">
        <div className="empty-space" >&nbsp;</div>
        <Login />
      </div>
    </div>
  );
}

export default App;
