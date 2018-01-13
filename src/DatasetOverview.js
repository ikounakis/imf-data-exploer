import React, { Component } from 'react';

class DatasetOverview extends Component {
  render() {
    if (this.props.annotations.size) {
      const definition = this.props.annotations.get('Definition');
      const lastUpdateDate = this.props.annotations.get('Latest Update Date');
      const htmlDefinition = {__html: definition.AnnotationText['#text']}
      return (
        <div>
          <h3>Dataset Overview</h3>
          <table>
            <tbody>
              <tr>
                <td>{definition.AnnotationTitle}</td>
                <td dangerouslySetInnerHTML={htmlDefinition}></td>
              </tr>
              <tr>
                <td>{lastUpdateDate.AnnotationTitle}</td>
                <td>{lastUpdateDate.AnnotationText['#text']}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  }
}

export default DatasetOverview;
