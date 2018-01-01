import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SelectDataset from './SelectDataset';
import DatasetOverview from './DatasetOverview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: ''
    };

    this.onDatasetChange = this.onDatasetChange.bind(this)
  }

  onDatasetChange(dataset) {
    this.setState({ dataset })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to IMF Data Explorer</h1>
        </header>
        <SelectDataset value={this.state.dataset} onChange={this.onDatasetChange}/>
        <DatasetOverview />
      </div>
    );
  }
}

export default App;
