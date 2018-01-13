import React, { Component } from 'react';

class DatasetDimensions extends Component {
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
        {this.props.dimensions.map(dimension =>
          <label key={dimension['@codelist']}>
            {this.props.codeLists.get(dimension['@codelist']).Name['#text']}:
            <select id={dimension['@codelist']} value={this.props.value[dimension['@codelist']]} onChange={this.onChange}>
              {this.props.codeLists.get(dimension['@codelist']).Code.map(code =>
                <option key={code['@value']} value={code['@value']}>
                  {code.Description['#text']}
                </option>
              )}
            </select>
          </label>
        )}
      </div>
    );
  }
}

export default DatasetDimensions;
