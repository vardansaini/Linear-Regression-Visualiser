import React from 'react';
// import Plot from 'react-plotly.js';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';


export default class BasicPlot extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const Plot = createPlotlyComponent(Plotly);
    return (
      <div>
        <div id = "tester"></div>
        {/* <button onClick = {this.plotGraph}>Test</button> */}
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
            {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
          ]}
          layout={{width: "40vw", height: "40vh", title: 'A Fancy Plot'}}
          config = {{staticPlot: true}}
        />
      </div>
    );
  }
}