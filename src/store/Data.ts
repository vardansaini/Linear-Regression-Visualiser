interface DataType {
  inputData:number[][]
  outputData:number[][]
}

const initialData: DataType = {
  outputData:[],
  inputData:[],
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

    default:
      return {
        ...state,
      };
  }
};

export default Data;
