
import history from "../history.js"
import formatInput from "../linearRegression/formatInput"
import linearRegression from "../linearRegression/linearRegression"
const initialState = {
  inputString: "",
  inputData: [],
  arrayData:[[-1,1,2,3,4,5],[-1,1,2,3,4,5]],
  theta: [],
  predictions:[],
  alpha: 0.01,
  iterations: 500,
  runTime:0,
}

export default (state = initialState,action)=>{
  switch (action.type){
    case "updateInput":
      return {
        ...state,
        inputString: action.input
      }
    case "calculateRegression":
      let [formattedData,arrayData,valid] = formatInput(state.inputString)
      console.log("passed format input")
      console.log(history)
      if(valid){
        history.push("linear-regression-visualization/results")
        let [outputTheta,outputPredictions] = linearRegression(formattedData,state.alpha,state.iterations)
        return{
          ...state,
          inputData: formattedData,
          arrayData: arrayData,
          theta: outputTheta,
          predictions:outputPredictions,
        }
      }
      else{
        alert("the data you entered is not valid please try again")
        return{
          ...state
        }
      }
    case "updateAlpha":
      return{
        ...state,
        alpha:action.alpha
      }
    case "updateIterations":
      return {
        ...state,
        iterations: action.iterations,
      }
    default:
      return state
  }
}