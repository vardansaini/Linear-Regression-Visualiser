import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Link, Redirect,HashRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "./Components/Home/Home";
import Header from "./Components/Header";
import Results from "./Components/Results/Results";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const routerHistroy = createBrowserHistory();
    // history={routerHistroy}
    return (
      <HashRouter>
        <div className="mainDiv">
          <Header />
          <Switch>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/">
              {this.props.redirectToResults ? <Redirect to="/results" /> : ""}
              <Home />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  redirectToResults: state.page.showResults,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
