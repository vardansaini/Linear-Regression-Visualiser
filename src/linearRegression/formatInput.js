import * as tf from "@tensorflow/tfjs"

let formatInput = (input) =>{
  let valid = true
  let data = input.split("\n")
  let data2 = []
  data.forEach(line => {
    data2.push((line.split(",")))
  });
  let data3 = data2.map((line)=>
    line.map((number)=>
      Number(number)
    )
  )
  let tensorData = tf.tensor(data3)
  tensorData.print()
  if ((tensorData.shape[0]<2) || (tensorData.shape[1]<2)|| (tensorData.shape[0]>2)){
    valid = false
  }
  let arrayData = tensorData.arraySync()

  // console.log("potato")
  // let a = tf.tensor([1,2,3],[1,3])
  // let b = tf.tensor([[4,5],[7,8],[9,10]],[3,2])
  // a.print()
  // tf.ones([b.shape[0],1]).print()
  // b.print()
  // console.log(tf.sum(b).arraySync())
  return [tensorData,arrayData,valid]
}

export default formatInput