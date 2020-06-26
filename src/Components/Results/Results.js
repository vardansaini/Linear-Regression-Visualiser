import React, { Component } from 'react'
import { connect } from 'react-redux'
import BasicPlot from "./BasicPlot"


class Results extends Component {
  render() {
    return (
      <div>
        <BasicPlot/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)
