import formatInput from "../linearRegression/formatInput";
import linearRegression from "../linearRegression/linearRegression";
const initialState = {
  inputString: "",
  inputData: [],
  arrayData: [
    [-1, 1, 2, 3, 4, 5],
    [-1, 1, 2, 3, 4, 5],
  ],
  theta: [],
  predictions: [
    [0, 1],
    [0, 1],
  ],
  alpha: 0.01,
  iterations: 100,
  runTime: 0,
  showResults: false,
  costFunctionSurface: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "updateInput":
      return {
        ...state,
        inputString: action.input,
      };
    case "calculateRegression":
      let [formattedData, arrayData, valid] = formatInput(state.inputString);
      console.log("passed format input");
      if (valid) {
        let [
          outputTheta,
          outputPredictions,
          costSurfaceData,
        ] = linearRegression(formattedData, state.alpha, state.iterations);
        return {
          ...state,
          showResults: true,
          inputData: formattedData,
          arrayData: arrayData,
          theta: outputTheta,
          predictions: outputPredictions,
          costFunctionSurface: costSurfaceData,
        };
      } else {
        alert("the data you entered is not valid please try again");
        return {
          ...state,
        };
      }
    case "updateAlpha":
      return {
        ...state,
        alpha: action.alpha,
      };
    case "updateIterations":
      return {
        ...state,
        iterations: action.iterations,
      };
    default:
      return state;
  }
};
