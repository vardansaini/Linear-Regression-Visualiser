import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Header } from "semantic-ui-react";
import {RootState} from "../store/store"

interface Props {}

const Loading = (props: Props) => {
  const regression = useSelector(( state:RootState ) => state.Data.regression);
  const dispatch = useDispatch()
  useEffect(()=>{
    console.log("CALCULATING:")
    let result = regression?.calculate()
    dispatch({ type: "setOutputData", outputData: result });
    dispatch({
      type: "setAppState",
      appState: {
        showInput: false,
        showLoading: false,
        showOutput: true,
      },
    });
  },[])
  return (
    <div className="flexStartVertically">
      <div className="flexAroundHorizontally" style={{ margin: "80px" }}>
        <ClimbingBoxLoader size={40} color={"#009c95"} />
      </div>
      <div className="flexAroundHorizontally">
        <Header color="grey">Calculating ...</Header>
      </div>
    </div>
  );
};

export default Loading;
