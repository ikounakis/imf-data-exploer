import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {dataflows: ''}
  }

  componentDidMount() {
    axios.get('http://dataservices.imf.org/REST/SDMX_JSON.svc/Dataflow')
      .then(response => {
        console.log(response);
        this.setState({
          dataflows: response.data.Structure.Dataflows.Dataflow
                      .map(dataflow =>
                        <li key={dataflow['@id']}>
                          {dataflow.Name['#text']}
                        </li>
                      )
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to IMF Data Explorer</h1>
        </header>
        <ul className="App-intro">
          {this.state.dataflows}
        </ul>
      </div>
    );
  }
}

export default App;
