import React, { Component } from 'react'
import {
  Link,
  useHistory
} from "react-router-dom";

import {connect} from 'react-redux'
import "./home.css"
import history from "../../history"

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
          <label>
            2D Data to be fitted
          </label>
          <textarea placeholder="X data followed by Y data
1,2,3,4,5
2,3,4,5,6
          " value = {this.props.inputData} onChange = {this.handleChange}>

          </textarea>
          <br />
          <button onClick = {this.handleClick}>Calculate</button>
          
          <button onClick = {()=>{
            history.push("/results")
            }}>Calculate</button>
          
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  inputData: state.page.inputString
})
const mapDispatchToProps = (dispatch) => ({
  updateInput : (inputData) =>{
    dispatch({type:"updateInput",input:inputData})
  },
  calculateRegression : ()=>{
    dispatch({type:"calculateRegression"})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)