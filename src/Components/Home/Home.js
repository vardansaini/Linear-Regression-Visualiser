import React, { Component } from 'react'
import {
  Link,
  useHistory
} from "react-router-dom";

import {connect} from 'react-redux'
import "./home.css"
import history from "../../history"
import { Button,Slider } from '@material-ui/core';

class Home extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleChange = (event) =>{
    this.props.updateInput(event.target.value)
  }
  handleClick = () =>{
    this.props.calculateRegression()
  }
  render() {
    return (
      <div className = "homeDiv">
        <div className = "slidersDiv">
          <div className = "sliderDiv">
            <label>Alpha:</label>
            <Slider
            value = {this.props.alpha}
            onChange = {(event,value) =>{
              this.props.updateAlpha(value)
            }}
            aria-labelledby="Alpha"
            valueLabelDisplay="auto"
            min={0}
            step = {0.01}
            max={0.5}/>
          </div>
          <div className = "sliderDiv">
            <label>Iterations:</label>
            <Slider
            value = {this.props.iterations}
            onChange = {(event,value) =>{
              this.props.updateIterations(value)
            }}
            aria-labelledby="Iterations"
            valueLabelDisplay="auto"
            min={10}
            max={1000}/>
          </div>
        </div>
        <label>
          2D Data to be fitted
        </label>
        <textarea placeholder="X data followed by Y data
1,2,3,4,5
2,3,4,5,6
        " value = {this.props.inputData} onChange = {this.handleChange}>

        </textarea>
        <br />
        <Button onClick = {this.handleClick}>Calculate</Button>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  inputData: state.page.inputString,
  alpha: state.page.alpha,
  iterations: state.page.iterations,
})
const mapDispatchToProps = (dispatch) => ({
  updateInput : (inputData) =>{
    dispatch({type:"updateInput",input:inputData})
  },
  calculateRegression : ()=>{
    dispatch({type:"calculateRegression"})
  },
  updateAlpha: (alpha) =>{
    dispatch({type:"updateAlpha",alpha:alpha})
  },
  updateIterations:(iterations)=>{
    dispatch({type:"updateIterations",iterations:iterations})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)