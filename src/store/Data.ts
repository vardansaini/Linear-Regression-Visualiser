interface DataType {
  inputString: string;
  inputData: number[][];
}

const initialData: DataType = {
  inputString: "",
  inputData: [[]],
};

const Data = (state = initialData, action: any): DataType => {
  switch (action.type) {
    case "setInputString":
      return {
        ...state,
        inputString: action.inputString,
      };
    case "setInputData":
      return {
        ...state,
        inputData:action.inputData,
      };

    default:
      return {
        ...state,
      };
  }
};

export default Data;
