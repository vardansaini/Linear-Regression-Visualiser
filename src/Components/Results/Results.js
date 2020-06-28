import React, { Component } from "react";
import { connect } from "react-redux";

import Plotly from "plotly.js-gl3d-dist";
import createPlotlyComponent from "react-plotly.js/factory";

import "./results.css";

class Results extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const Plotly = require()
    const Plot = createPlotlyComponent(Plotly);

    return (
      <div className="resultsContainer">
        <div>
          <h4>Theta Values:</h4>
          <p>Theta 0: {this.props.theta[0]}</p>
          <p>Theta 1: {this.props.theta[1]}</p>
        </div>
        <div>
          <Plot
            data={[
              {
                name: "data",
                x: this.props.data[0],
                y: this.props.data[1],
                type: "scatter",
                mode: "markers",
                marker: { color: "green" },
              },
              {
                name: "regression line",
                type: "scatter",
                x: this.props.predictions[0],
                y: this.props.predictions[1],
                mode: "lines",
                line: {
                  color: "rgb(219, 64, 82)",
                  width: 2,
                },
              },
            ]}
            layout={{
              // width:,
              title: "Data with regression",
            }}
            // config={{ staticPlot: true }}
          />
        </div>
        <div>
          <Plot
            data={[
              {
                name: "data",
                x: this.props.costSurface[0],
                y: this.props.costSurface[1],
                z: this.props.costSurface[2],
                // x:[10,20,30],
                // y:[20,30],
                // z: [
                //   [3.75, 0, 3.75, 15, 33.75],
                //   [1.75, 0.5, 6.75, 20.5, 41.75],
                //   [0.75, 2, 10.75, 27, 50.75],
                //   [0.75, 4.5, 15.75, 34.5, 60.75],
                // ],
                type: "surface",
                contours: {
                  z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: { z: true },
                  },
                },
              },
            ]}
            layout={{ width: "300px", height: "auto", title: "3D" }}
            // config = {{staticPlot: true}}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.page.arrayData,
  predictions: state.page.predictions,
  costSurface: state.page.costFunctionSurface,
  theta: state.page.theta,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
