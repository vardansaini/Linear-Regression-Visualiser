import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
  Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Home from "./Components/Home/Home"
import Header from "./Components/Header"
import Results from "./Components/Results/Results"
import "./App.css"

import history from "./history.js"

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router history={history}>
        <div className = "mainDiv">
          <Header />
          <Switch>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    )
    
  }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App)