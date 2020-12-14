type RegressionTypes = "linear";

class Regression {
  private type: RegressionTypes;
  private inputData: number[][];

  constructor(type: RegressionTypes, inputData: number[][]) {
    this.type = type;
    this.inputData = inputData;
  }

  calculate = async () => {
  };
}

export default Regression;
