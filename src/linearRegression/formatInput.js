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
  console.log(tensorData.arraySync())
  if ((tensorData.shape[0]<2) || (tensorData.shape[1]<2)){
    valid = false
  }
  return [tensorData,valid]
}

export default formatInput