import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SelectDataset from './SelectDataset';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to IMF Data Explorer</h1>
        </header>
        <SelectDataset />
      </div>
    );
  }
}

export default App;
