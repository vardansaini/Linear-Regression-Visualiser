/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Dropdown,
  DropdownItemProps,
  Header,
  Message,
  Input as InputSemantic,
} from "semantic-ui-react";

import Regression from "../Algorithms/Regression";
import { RootState } from "../store/store";

import "./Input.css";

interface Props {}

export default function Input({}: Props): ReactElement {
  const regressionTypes: DropdownItemProps[] = [
    { text: "Linear", value: "(a*x)+b" },
    { text: "Exponential", value: "a*(b^x)" },
    { text: "Quadratic", value: "(a*(x^2)) + b" },
    { text: "Custom", value: "CUSTOM" },
    // { text: "Logarithmic",va},
  ];
  const typesToOptions: { [key: string]: any } = {
    Linear: { alpha: 0.01, iterations: 3000 },
    Exponential: { alpha: 0.005, iterations: 1000 },
    Quadratic: { alpha: 0.005, iterations:1000 },
    Custom: { alpha: 0.001, iterations: 1000 },
  };

  const textAreaPlaceholder: string = "waguan \nslimes";
  // redux dispatch:
  const dispatch = useDispatch();
  // text area text:
  let [text, setText] = useState<string>("");
  let [error, setError] = useState<string>("");
  let [regressionEquation, setRegressionEquation] = useState<string>("(a*x)+b");
  let [options, setOptions] = useState({
    alpha: typesToOptions["Linear"].alpha,
    iterations: typesToOptions["Linear"].iterations,
  });


  let handleTextAreaChange = (event: any) => {
    setText(event.target.value);
  };
  let handleDropdown = (event: any, data: any) => {
    setRegressionEquation(data.value);
    setOptions(typesToOptions[event.target.textContent]);
  };

  useEffect(() => {
    console.log("HUUHH")
  }, [dispatch])

  let calculate = async () => {
    // Formatting + Input checking:
    let formattedInput: number[][] = formatInput(text);
    if (formattedInput.length !== 2) {
      setError("Invalid Input, Please try again");
      return;
    }
    if (formattedInput[0].length !== formattedInput[1].length) {
      setError("Make sure length of x and y are the same! Please try again");
      return;
    }
    // show loading screen
    dispatch({
      type: "setAppState",
      appState: {
        showInput: false,
        showLoading: true,
        showOutput: false,
      },
    });
    // intialize regression class with all the options
    let regression: Regression = new Regression(
      regressionEquation,
      formattedInput,
      options.alpha,
      options.iterations
    );
    dispatch({type:"setInputData",inputData:formattedInput})
    dispatch({
      type:"setRegression",
      regression:regression,
    })
  };

  let formatInput = (input: string): number[][] => {
    try {
      // split string by \n to get an array of lines
      let lines = input.split("\n");
      let numberLines = lines.map((line) => {
        // Split line by commas
        let splitLine = line.split(",");
        // convert each value from a string to a number
        let numberLine = splitLine.map((number) => parseFloat(number));
        return numberLine;
      });
      return numberLines;
    } catch (error) {
      return [];
    }
  };

  return (
    <div className="flexStartVertically">
      <div className="flexAroundHorizontally">
        <Dropdown
          fluid
          selection
          options={regressionTypes}
          onChange={handleDropdown}
          // set linear as default
          defaultValue="(a*x)+b"
        />
      </div>
      {regressionEquation === "CUSTOM" ? (
        <div className="flexAroundHorizontally">
          <InputSemantic label="Custom Equation" placeholder="(a*x) + b" />
        </div>
      ) : (
        <div />
      )}
      <div className="flexAroundHorizontally">
        <textarea
          placeholder={textAreaPlaceholder}
          value={text}
          onChange={handleTextAreaChange}
        />
      </div>
      {error === "" ? (
        <div />
      ) : (
        <div className="flexAroundHorizontally">
          <Message error>{error}</Message>
        </div>
      )}
      <div className="flexAroundHorizontally buttonContainer">
        <Button color="teal" onClick={calculate}>
          Calculate
        </Button>
      </div>
    </div>
  );
}
