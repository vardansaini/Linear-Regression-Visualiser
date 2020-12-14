import Regression from "../Algorithms/Regression";

interface DataType {
  inputData:number[][],
  outputData:number[][],
  regression:Regression|undefined
}

const initialData: DataType = {
  outputData:[],
  inputData:[],
  regression:undefined,
};

const Data = (state = initialData, action: any): DataType => {
  switch (action.type) {
    case "setInputData":
      return {
        ...state,
        inputData:action.inputData,
      };
    case "setOutputData":
      return {
        ...state,
        outputData:action.outputData,
      }
    case "setRegression":
      return {
        ...state,
        regression:action.regression
      }

    default:
      return {
        ...state,
      };
  }
};

export default Data;
