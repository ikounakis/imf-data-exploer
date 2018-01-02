import React, { Component } from 'react';
import axios from 'axios';

class DatasetOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      annotations: []
    };
  }

  getDataStructure() {
    if (this.props.dataset) {
      axios.get(`http://dataservices.imf.org/REST/SDMX_JSON.svc/DataStructure/${this.props.dataset}`)
        .then(response => {
          console.log(response);
          const annotations = response.data.Structure.KeyFamilies.KeyFamily.Annotations.Annotation;
          this.setState({ annotations });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

    componentDidMount() {
      this.getDataStructure();
    }

    componentDidUpdate(prevProps) {
      if (this.props !== prevProps) {
        this.getDataStructure();
      }
    }

    findAnnotationByTitle(annotation) {
      return this === annotation.AnnotationTitle;
    }

    render() {
      if (this.state.annotations.length > 0) {
        const definition = this.state.annotations.find(this.findAnnotationByTitle, 'Definition');
        const lastUpdateDate = this.state.annotations.find(this.findAnnotationByTitle, 'Latest Update Date');
        
        return (
          <div>
            <h3>Dataset Overview</h3>
            <table>
              <tr>
                <td>{definition.AnnotationTitle}</td>
                <td>{definition.AnnotationText['#text']}</td>
              </tr>
              <tr>
                <td>{lastUpdateDate.AnnotationTitle}</td>
                <td>{lastUpdateDate.AnnotationText['#text']}</td>
              </tr>
            </table>
          </div>
        );
      }

      return null;
    }
}

export default DatasetOverview;
