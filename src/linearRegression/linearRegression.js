import * as tf from "@tensorflow/tfjs"


let costFunction = (xData,yData,theta) =>{
  const m = xData.shape[0]
  let part1 = tf.sum(tf.square(tf.sub(tf.matMul(xData,theta),yData))).arraySync()
  return ((1/(2*m))*(part1))
}

let predictY = (xData,theta) =>{
  let predictions = tf.matMul(xData,theta).reshape([1,-1]).arraySync()
  console.log(predictions)
  return predictions
}

let gradientDescent = (xData,yData,theta,alpha,iterations) =>{
  const m = xData.shape[0]
  for (let i = 0; i < iterations; i++) {
    // console.log(i)
    let part2 = tf.sub(tf.matMul(xData,theta),yData)
    theta = tf.sub(theta,tf.matMul(xData.transpose(),part2).mul(tf.scalar(alpha/m)))
    // theta.print()
    // console.log(costFunction(xData,yData,theta))
  }
  return theta
}

let linearRegression = (data) =>{
  const axis = 1
  data = data.transpose()
  data.print()
  data = tf.concat([tf.ones([data.shape[0],1]),data],axis)
  let xData = data.gather([0,1],1)
  let yData = data.gather([2],1)
  console.log("XDATA Y DATA")
  xData.print()
  yData.print()
  data.print()
  let outputTheta = gradientDescent(xData,yData,tf.tensor([0,0],[2,1]),0.01,1000)
  outputTheta.print()
  return [outputTheta,predictY(xData,outputTheta)]
}

export default linearRegression