import * as tf from "@tensorflow/tfjs";

let formatInput = (input) => {
  let valid = true;
  let data = input.split("\n");
  let data2 = [];
  data.forEach((line) => {
    data2.push(line.split(","));
  });
  let data3 = data2.map((line) => line.map((number) => Number(number)));
  let tensorData = tf.tensor(data3);
  tensorData.print();
  if (
    tensorData.shape[0] < 2 ||
    tensorData.shape[1] < 2 ||
    tensorData.shape[0] > 2
  ) {
    valid = false;
  }
  let arrayData = tensorData.arraySync();

  // console.log("TESTING");
  // let a = tf.tensor(
  //   [
  //     [1, 2, 3],
  //     [4, 5, 6],
  //     [2, 3, 4],
  //   ],
  //   [3, 3]
  // );
  // a.print();
  // let b = tf.batchNorm(a, tf.zeros(a.shape), tf.ones(a.shape));
  // b.print();
  // console.log("ENDOF TESTING");

  return [tensorData, arrayData, valid];
};
 
export default formatInput;
