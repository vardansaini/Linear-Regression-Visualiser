import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Container } from "semantic-ui-react";

import Regression from "../Algorithms/Regression";

import "./Input.css";

interface Props {}

export default function Input({}: Props): ReactElement {
  const textAreaPlaceholder: string = "waguan \nslimes";
  // redux dispatch:
  const dispatch = useDispatch();
  // text area text:
  let [text, setText] = useState<string>("");

  let handleTextAreaChange = (event: any) => {
    setText(event.target.value);
  };

  let calculate = async () => {
    dispatch({
      type: "setAppState",
      appState: {
        showInput: false,
        showLoading: true,
        showOutput: false,
      },
    });

    let formattedInput:number[][] = formatInput(text);

    let regression: Regression = new Regression("linear",formattedInput);
    let result = await regression.calculate();

    dispatch({ type: "setOutputData", outputData: result });
    dispatch({
      type: "setAppState",
      appState: {
        showInput: false,
        showLoading: false,
        showOutput: true,
      },
    });
  };

  let formatInput = (input: string): number[][] => {
    // split string by \n to get an array of lines
    let lines = input.split("\n");
    let numberLines = lines.map((line) => {
      // Split line by commas
      let splitLine = line.split(",");
      // convert each value from a string to a number
      let numberLine = splitLine.map((number)=>parseFloat(number))
      return numberLine
    });

    return numberLines;
  };

  return (
    <div className="flexStartVertically">
      <div className="flexAroundHorizontally">
        <textarea
          placeholder={textAreaPlaceholder}
          value={text}
          onChange={handleTextAreaChange}
        />
      </div>
      <div className="flexAroundHorizontally buttonContainer">
        <Button color="teal" onClick={calculate}>
          Calculate
        </Button>
      </div>
    </div>
  );
}
