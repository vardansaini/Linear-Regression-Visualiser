/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dropdown,
  DropdownItemProps,
  Message,
  Input as InputSemantic,
} from "semantic-ui-react";

import Regression from "../Algorithms/Regression";
import "./Input.css";
import { parse } from "mathjs";

const data = require("../data.json");

interface Props {}

export default function Input({}: Props): ReactElement {
  const regressionTypes: DropdownItemProps[] = [
    { text: "Linear", value: "(a*x)+b" },
  ];
  const typesToOptions: { [key: string]: any } = {
    Linear: { alpha: "0.01", iterations: "3000" },
  };

  const textAreaX: string = "x: 0,1,2,3,4,5";
  const textAreaY: string = "y: 0,1,2,3,4,5";
  // redux dispatch:
  const dispatch = useDispatch();
  // text area text:
  let [textX, setTextX] = useState<string>("");
  let [textY, setTextY] = useState<string>("");
  let [error, setError] = useState<string>("");
  let [regressionEquation, setRegressionEquation] = useState<string>("(a*x)+b");
  let [options, setOptions] = useState({
    alpha: typesToOptions["Linear"].alpha,
    iterations: typesToOptions["Linear"].iterations,
  });
  let [starting, setStarting] = useState<[string, string]>(["0", "0"]);
  let [custom, setCustom] = useState<boolean>(false);

  let handleTextAreaChangeX = (event: any) => {
    setTextX(event.target.value);
  };
  let handleTextAreaChangeY = (event: any) => {
    setTextY(event.target.value);
  };
  let handleDropdown = (event: any, data: any) => {
    if (event.target.textContent === "Custom") {
      setCustom(true);
      setRegressionEquation("");
    } else {
      setRegressionEquation(data.value);
      setCustom(false);
    }
    setOptions(typesToOptions[event.target.textContent]);
  };

  useEffect(() => {
    init();
  }, []);

  let refresh = () => {
    window.location.reload();
  };

  let init = async () => {
    let formattedInput: number[][] = [];
    formattedInput.push(data[0]);
    formattedInput.push(data[1]);
    try {
      parseInt(options.iterations);
      Number(options.alpha);
      Number(starting[0]);
      Number(starting[1]);
    } catch (error) {
      setError("Invalid Input, Please try again");
      return;
    }
    try {
      parse(regressionEquation);
    } catch (error) {
      setError("Invalid Custom function");
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
      Number(options.alpha),
      Number(options.iterations),
      [Number(starting[0]), Number(starting[1])]
    );
    dispatch({ type: "setInputData", inputData: formattedInput });
    dispatch({
      type: "setRegression",
      regression: regression,
    });
  };

  let calculate = async () => {
    // Formatting + Input checking:
    let formattedInputX: number[][] = formatInput(textX);
    let formattedInputY: number[][] = formatInput(textX);
    if (formattedInputX.length !== 1 && formattedInputY.length !== 1) {
      setError("Invalid Input, Please try again");
      return;
    }
    if (formattedInputX[0].length !== formattedInputY[0].length) {
      setError("Make sure length of x and y are the same! Please try again");
      return;
    }
    // combine x and y into one array
    let formattedInput: number[][] = [];
    formattedInput.push(formattedInputX[0]);
    formattedInput.push(formattedInputY[0]);
    try {
      parseInt(options.iterations);
      Number(options.alpha);
      Number(starting[0]);
      Number(starting[1]);
    } catch (error) {
      setError("Invalid Input, Please try again");
      return;
    }
    try {
      parse(regressionEquation);
    } catch (error) {
      setError("Invalid Custom function");
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
      Number(options.alpha),
      Number(options.iterations),
      [Number(starting[0]), Number(starting[1])]
    );
    dispatch({ type: "setInputData", inputData: formattedInput });
    dispatch({
      type: "setRegression",
      regression: regression,
    });
  };

  let formatInput = (input: string): number[][] => {
    try {
      // split string by \n to get an array of lines
      let lines = input.split("\n");
      if (lines.length == 1) {
        let numberLines = lines.map((line) => {
          // Split line by commas
          let splitLine = line.split(",");
          // convert each value from a string to a number
          let numberLine = splitLine.map((number) => parseFloat(number));
          return numberLine;
        });

        return numberLines;
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  return (
    <div className="flexAroundHorizontally">
      <div
        className="flexAroundHorizontally"
        style={{ maxWidth: "1000px" }}
        id="inputs"
      >
        <Dropdown
          fluid
          selection
          options={regressionTypes}
          onChange={handleDropdown}
          // set linear as default
          defaultValue="(a*x)+b"
          style={{ minWidth: "200px" }}
        />
      </div>
      <div className="flexAroundHorizontally">
        <InputSemantic
          label={custom ? "Custom Equation" : "Equation"}
          placeholder="(a*x) + b"
          onChange={(event, data) => setRegressionEquation(data.value)}
          value={regressionEquation}
          disabled={!custom}
        />
      </div>
      <div className="flexAroundHorizontally">
        <textarea
          placeholder={textAreaX}
          value={textX}
          onChange={handleTextAreaChangeX}
        />
      </div>
      <div className="flexAroundHorizontally">
        <textarea
          placeholder={textAreaY}
          value={textY}
          onChange={handleTextAreaChangeY}
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
      <div className="flexAroundHorizontally buttonContainer">
        <Button color="teal" onClick={refresh}>
          Reset
        </Button>
      </div>
    </div>
  );
}
