import React from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer';
function App() {
  return (
    <div className="App">
      <Timer title={"My Timer"} endTime={5} elapsedTime={0} />
    </div>
  );
}

export default App;
