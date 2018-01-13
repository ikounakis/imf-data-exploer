import React, { Component } from 'react';

class DatasetSelect extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div>
        <label>
          Dataset:
          <select value={this.props.value} onChange={this.onChange}>
            {this.props.datasets.map(dataset =>
              <option key={dataset['@id']} value={dataset.KeyFamilyRef.KeyFamilyID}>
                {dataset.Name['#text']}
              </option>
            )}
          </select>
        </label>
      </div>
    );
  }
}

export default DatasetSelect;
