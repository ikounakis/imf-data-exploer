import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import SelectDataset from './SelectDataset';
import DatasetOverview from './DatasetOverview';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      selectedDataset: ''
    };

    this.onDatasetChange = this.onDatasetChange.bind(this)
  }

  compareDatasets(a, b) {
    return a.Name['#text'].localeCompare(b.Name['#text']);
  }

  getDatasets() {
    axios.get('http://dataservices.imf.org/REST/SDMX_JSON.svc/Dataflow')
      .then(response => {
        console.log(response);
        const datasets = response.data.Structure.Dataflows.Dataflow.sort(this.compareDatasets);
        const selectedDataset = datasets[0].KeyFamilyRef.KeyFamilyID;
        this.setState({
          datasets,
          selectedDataset
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getDatasets();
  }

  onDatasetChange(selectedDataset) {
    this.setState({ selectedDataset });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to Data Explorer</h1>
        </header>
        <SelectDataset datasets={this.state.datasets} value={this.state.selectedDataset} onChange={this.onDatasetChange}/>
        <DatasetOverview dataset={this.state.selectedDataset}/>
      </div>
    );
  }
}

export default App;
