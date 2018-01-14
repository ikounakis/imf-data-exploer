import React, { Component } from 'react';
import Highcharts from 'highcharts';
import noData from 'highcharts//modules/no-data-to-display';
import { isEqual } from 'lodash';

class DatasetChart extends Component {
  emptyChart() {
    return Highcharts.chart(this.props.dataset, {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Empty chart'
      },
      series: [{
          name: 'N/A',
          data: []
      }]
    });
  }

  findCodeByValue(code) {
    return code['@value'] === this;
  }

  getCodeDescription(codeList, codeValue) {
    return this.props.codeLists
      .get(codeList)
      .Code
      .find(this.findCodeByValue, codeValue)
      .Description['#text'];
  }

  chartData() {
    if (this.props.series && this.props.series.Obs && Array.isArray(this.props.series.Obs)) {
      const title = this.getCodeDescription(`CL_INDICATOR_${this.props.dataset}`, this.props.series['@INDICATOR']);
      const xCategories = this.props.series.Obs.map(ob => ob['@TIME_PERIOD']);
      const yTitle = this.getCodeDescription('CL_UNIT_MULT', this.props.series['@UNIT_MULT']);
      const seriesName = this.getCodeDescription(`CL_AREA_${this.props.dataset}`, this.props.series['@REF_AREA']);
      const seriesData = this.props.series.Obs.map(ob => Number(ob['@OBS_VALUE']));;

      return Highcharts.chart(this.props.dataset, {
        chart: {
          type: 'line'
        },
        title: {
          text: title
        },
        xAxis: {
          categories: xCategories
        },
        yAxis: {
          title: {
            text: yTitle
          }
        },
        series: [{
          name: seriesName,
          data: seriesData
        }]
      });
    }

    return this.emptyChart();
  }

  componentDidMount() {
    noData(Highcharts);
    this.chart = this.emptyChart();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.series, prevProps.series)) {
      this.chart = this.chartData();
    }
  }

  render() {
    return (
      <div id={this.props.dataset}></div>
    );
  }

}

export default DatasetChart;
