import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "./store/store";

import "./App.css";

// Components:
import Input from "./Components/Input";
import Output from "./Components/Output";

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Header } from "semantic-ui-react";

interface Props {}

const App = (props: Props) => {
  const showInput = useSelector((state: RootState) => state.AppState.showInput);
  const showOutput = useSelector(
    (state: RootState) => state.AppState.showOutput
  );
  const showLoading = useSelector(
    (state: RootState) => state.AppState.showLoading
  );

  return (
    <div>
      {showInput ? <Input /> : <div />}
      {showOutput ? <Output /> : <div />}
      {showLoading ? (
        <div className="flexStartVertically">
          <div className="flexAroundHorizontally" style={{ margin: "80px" }}>
            <ClimbingBoxLoader size={40} color={"#009c95"} />
          </div>
          <div className="flexAroundHorizontally">
            <Header color="grey">Calculating ...</Header>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default App;
