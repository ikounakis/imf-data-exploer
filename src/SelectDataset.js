import React, { Component } from 'react';
import axios from 'axios';

class SelectDataset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datasets: []
        }
    }

    compareDatasets(a, b) {
        return a.Name['#text'].localeCompare(b.Name['#text'])
    }

    componentDidMount() {
        axios.get('http://dataservices.imf.org/REST/SDMX_JSON.svc/Dataflow')
        .then(response => {
          console.log(response);
          const datasets = response.data
                            .Structure.Dataflows.Dataflow
                            .sort(this.compareDatasets);
          this.setState({ datasets });
        })
        .catch(error => {
          console.log(error);
        });
    }

    render() {
        return (
            <select>
                {this.state.datasets.map(dataset =>
                    <option key={dataset['@id']} value={dataset['@id']}>
                        {dataset.Name['#text']
                    }</option>
                )};
            </select>
        )
    }
}

export default SelectDataset;
