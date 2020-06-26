import React, { Component } from 'react'
import { connect } from 'react-redux'

import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';

import "./results.css"

class Results extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const Plot = createPlotlyComponent(Plotly);
    return (
      <div className = "resultsContainer">
        <Plot
          data={[
            {
              x: this.props.data[0],
              y: this.props.data[1],
              type: 'scatter',
              mode: 'markers',
              marker: {color: 'red'},
            },
          ]}
          layout={{width: "40vw", height: "40vh", title: 'A Fancy Plot'}}
          config = {{staticPlot: true}}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data : state.page.arrayData,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)
