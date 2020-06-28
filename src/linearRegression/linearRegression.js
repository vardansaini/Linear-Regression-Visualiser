import * as tf from "@tensorflow/tfjs";

let costFunction = (xData, yData, theta) => {
  const m = xData.shape[0];
  let part1 = tf
    .sum(tf.square(tf.sub(tf.matMul(xData, theta), yData)))
    .arraySync();
  return (1 / (2 * m)) * part1;
};

let predictY = (xData, theta) => {
  let yPredictions = tf.matMul(xData, theta).reshape([1, -1]);
  yPredictions.print();
  xData.print();
  let predictions = tf.concat([xData.gather([1], 1).transpose(), yPredictions]);
  console.log("Predictions:");
  predictions.print();
  return predictions.arraySync();
};

let gradientDescent = (xData, yData, theta, alpha, iterations) => {
  const m = xData.shape[0];
  for (let i = 0; i < iterations; i++) {
    // console.log(i)
    let part2 = tf.sub(tf.matMul(xData, theta), yData);
    theta = tf.sub(
      theta,
      tf.matMul(xData.transpose(), part2).mul(tf.scalar(alpha / m))
    );
    // theta.print()
    // console.log(costFunction(xData,yData,theta))
  }
  return theta;
};
let costSurface = (xData, yData, theta) => {
  let theta0 = theta.arraySync()[0];
  let theta1 = theta.arraySync()[1];

  // let x = tf.linspace(-2 * theta0, 2 * theta0, 50).arraySync();
  // let y = tf.linspace(-2 * theta1, 2 * theta0, 50).arraySync();
  let x = tf.linspace(-5, 5, 50).arraySync();
  let y = tf.linspace(-5, 5, 50).arraySync();
  console.log("THETA VALUES");
  console.log(x);
  console.log(y);

  let z = [];
  for (let xx = 0; xx < x.length; xx++) {
    let row = [];
    for (let yy = 0; yy < y.length; yy++) {
      let thetas = tf.tensor([x[xx], y[yy]], [2, 1]);
      let cost = costFunction(xData, yData, thetas)
      row.push(cost);
    }
    z.push(row)
  }
  console.log("COST SURFACE:");
  console.log(z);
  return [x, y, z];
};

let linearRegression = (data, alpha, iterations) => {
  //setting up data:
  const axis = 1;
  data = data.transpose();
  data = tf.concat([tf.ones([data.shape[0], 1]), data], axis);
  let xData = data.gather([0, 1], 1);
  let yData = data.gather([2], 1);

  //perform gradient descent
  let outputTheta = gradientDescent(
    xData,
    yData,
    tf.tensor([1, 1], [2, 1]),
    alpha,
    iterations
  );

  //get the cost function surface

  let costSurfaceData = costSurface(xData, yData, outputTheta);

  return [
    outputTheta.arraySync(),
    predictY(xData, outputTheta),
    costSurfaceData,
  ];
};

export default linearRegression;
