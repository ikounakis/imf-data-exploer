import React, { Component } from 'react';

class SelectDataset extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <select value={this.props.value} onChange={this.onChange}>
        {this.props.datasets.map(dataset =>
          <option key={dataset['@id']} value={dataset.KeyFamilyRef.KeyFamilyID}>
            {dataset.Name['#text']}
          </option>
        )}
      </select>
    );
  }
}

export default SelectDataset;
