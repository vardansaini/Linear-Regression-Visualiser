import { derivative, MathNode, parse } from "mathjs";

class Regression {
  protected xValues: number[];
  protected yValues: number[];
  // x and y values
  protected data: number[][];
  // length of x/y
  protected m: number;
  protected iterations: number;
  protected alpha: number;

  // mathjs function, format that we are trying to achieve
  protected function: MathNode;
  protected functionString: string;

  // parameter 1:a 2:b
  protected a: number;
  protected b: number;
  
  // array of [a,b]
  protected steps: number[][];

  constructor(
    functionString: string,
    inputData: number[][],
    alpha: number,
    iterations: number
  ) {
    console.log({ functionString, inputData, iterations, alpha });
    // Function used: E.g. a*x +b
    this.functionString = functionString;
    this.xValues = inputData[0];
    this.yValues = inputData[1];
    this.m = inputData[0].length;
    this.data = inputData;
    this.a = 1;
    this.b = 1;
    this.iterations = iterations;
    this.alpha = alpha;

    this.steps = []

    // Parses the string function to a mathjs Mathnode
    this.function = parse(functionString);
  }

  // evaluates the cost of using parameters a and b
  cost = (a: number, b: number) => {
    let cost: number = 0;
    for (let i = 0; i < this.xValues.length; i++) {
      cost +=
        (this.yValues[i] -
          this.function.evaluate({ a: a, b: b, x: this.xValues[i] })) **
        2;
    }
    return cost;
  };

  sumForAllXY = (f: MathNode, params: any) => {
    let sum = 0;
    for (let i = 0; i < this.xValues.length; i++) {
      sum += f.evaluate({ ...params, x: this.xValues[i], y: this.yValues[i] });
    }
    return sum;
  };
  calculate = (): number[] => {
    let absoluteDifference: MathNode = parse(
      ["((", this.function.toString(), "-y)^2)/2"].join("")
    );
    let aFunc: MathNode = derivative(absoluteDifference, "a");
    let bFunc: MathNode = derivative(absoluteDifference, "b");
    console.log(aFunc.toString());
    console.log(bFunc.toString());

    for (let i = 0; i < this.iterations; i++) {
      // console.log(this.cost(this.a,this.b))
      // console.log(this.a,this.b)
      this.a -=
        this.alpha *
        (1 / this.m) *
        this.sumForAllXY(aFunc, { a: this.a, b: this.b });
      this.b -=
        this.alpha *
        (1 / this.m) *
        this.sumForAllXY(bFunc, { a: this.a, b: this.b });
      this.steps.push([this.a,this.b])
    }
    console.log(this.a, this.b);
    return [this.a, this.b];
  };
}

export default Regression;
