import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { isEqual } from 'lodash';
import DatasetSelect from './DatasetSelect';
import DatasetOverview from './DatasetOverview';
import DatasetChart from './DatasetChart';
import DatasetDimensions from './DatasetDimensions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      selectedDataset: 'default',
      codeLists: new Map(),
      dimensions: [],
      annotations: new Map(),
      selectedDimensions: {},
      startPeriod: '1945',
      endPeriod: '2020',
      selectedSeries: null
    };

    this.onDatasetChange = this.onDatasetChange.bind(this);
    this.onDimensionChange = this.onDimensionChange.bind(this);
  }

  arrayToMap(array, callback) {
    return array.reduce(callback, {});
  }

  compareDatasets(a, b) {
    return a.Name['#text'].localeCompare(b.Name['#text']);
  }

  getDatasets() {
    return axios.get('http://dataservices.imf.org/REST/SDMX_JSON.svc/Dataflow')
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

  getDataStructure() {
    return axios.get(`http://dataservices.imf.org/REST/SDMX_JSON.svc/DataStructure/${this.state.selectedDataset}`)
      .then(response => {
        console.log(response);
        let codeLists = new Map();
        let dimensions = [];
        let annotations = new Map();
        let selectedDimensions = {};

        if (response.data.Structure) {
          codeLists = new Map(response.data.Structure.CodeLists.CodeList.map(c => [c['@id'], c]));
          dimensions = response.data.Structure.KeyFamilies.KeyFamily.Components.Dimension;
          annotations = new Map(response.data.Structure.KeyFamilies.KeyFamily.Annotations.Annotation.map(a => [a.AnnotationTitle, a]));

          const getFirstCodeValue = (map, obj) => {
            map[obj['@codelist']] = codeLists.get(obj['@codelist']).Code[0]['@value'];
            return map;
          }
          selectedDimensions = this.arrayToMap(dimensions, getFirstCodeValue);
        }

        this.setState({
          codeLists,
          dimensions,
          annotations,
          selectedDimensions
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getData() {
    const dimensions = Object.values(this.state.selectedDimensions).join('.');
    const query = `${this.state.selectedDataset}/${dimensions}?startPeriod=${this.state.startPeriod}&endPeriod=${this.state.endPeriod}`
    console.log(query);
    
    return axios.get(`http://dataservices.imf.org/REST/SDMX_JSON.svc/CompactData/${query}`)
      .then(response => {
        console.log(response);
        const selectedSeries = response.data.CompactData.DataSet.Series;
        this.setState({ selectedSeries })
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getDatasets();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.state.selectedDataset, prevState.selectedDataset)) {
      this.getDataStructure();
    }

    if (!isEqual(this.state.selectedDimensions, prevState.selectedDimensions)) {
      this.getData();
    }
  }

  onDatasetChange(selectedDataset) {
    this.setState({ selectedDataset });
  }

  onDimensionChange(selectedDimension) {
    this.setState((prevState, props) => {
      const selectedDimensions = Object.assign({}, prevState.selectedDimensions);
      selectedDimensions[selectedDimension.id] = selectedDimension.value;
      return { selectedDimensions };
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to IMF Data Explorer</h1>
        </header>
        <DatasetSelect
          datasets={this.state.datasets}
          value={this.state.selectedDataset}
          onChange={this.onDatasetChange}
        />
        <DatasetDimensions
          codeLists={this.state.codeLists} 
          dimensions={this.state.dimensions}
          value={this.state.selectedDimensions}
          onChange={this.onDimensionChange}
        />
        <DatasetOverview annotations={this.state.annotations} />
        <DatasetChart
          dataset={this.state.selectedDataset}
          series={this.state.selectedSeries}
          codeLists={this.state.codeLists}
        />
      </div>
    );
  }
}

export default App;
