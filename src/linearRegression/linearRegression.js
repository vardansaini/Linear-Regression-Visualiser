import * as tf from "@tensorflow/tfjs";

let costFunction = (xData, yData, theta) => {
  const m = xData.shape[0];
  let part1 = tf
    .sum(tf.square(tf.sub(tf.matMul(xData, theta), yData)))
    .arraySync();
  return (1 / (2 * m)) * part1;
};

let predictY = (xData, theta) => {
  let predictions = tf.matMul(xData, theta).reshape([1, -1]).arraySync();
  console.log(predictions);
  return predictions;
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
  console.log("POTATO");
  let theta0 = theta.arraySync()[0];
  let theta1 = theta.arraySync()[1];

  let theta0Values = tf.linspace(-2 * theta0, 2 * theta0, 20).arraySync();
  let theta1Values = tf.linspace(-2 * theta1, 2 * theta0, 20).arraySync();

  console.log("THETA VALUES");
  console.log(theta0Values);
  console.log(theta1Values);
};

let normalizeData = (xData, yData);
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
    tf.tensor([0, 1], [2, 1]),
    alpha,
    iterations
  );

  //get the cost function surface

  let costSurfaceData = costSurface(xData, yData, outputTheta);

  return [outputTheta, predictY(xData, outputTheta)];
};

export default linearRegression;
