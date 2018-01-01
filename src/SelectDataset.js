import React, { Component } from 'react';
import axios from 'axios';

class SelectDataset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datasets: []
        };

        this.onChange = this.onChange.bind(this);
    }

    compareDatasets(a, b) {
        return a.Name['#text'].localeCompare(b.Name['#text']);
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

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <select value={this.props.value} onChange={this.onChange}>
                {this.state.datasets.map(dataset =>
                    <option key={dataset['@id']} value={dataset.KeyFamilyRef.KeyFamilyID}>
                        {dataset.Name['#text']}
                    </option>
                )}
            </select>
        );
    }
}

export default SelectDataset;
