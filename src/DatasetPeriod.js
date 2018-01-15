import React, { Component } from 'react';

class DatasetPeriod extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange({
      id: event.target.id,
      value: event.target.value
    });
  }

  render() {
    return (
      <div>
        <label>
          Start:
          <input
            id='start' type='number' min='1945' max='2045' step='1'
            value={this.props.value.start} onChange={this.onChange}
          />
        </label>
        <label>
          End:
          <input
            id='end' type='number' min='1945' max='2045' step='1'
            value={this.props.value.end} onChange={this.onChange}
          />
        </label>
      </div>
    )
  }
}

export default DatasetPeriod;
