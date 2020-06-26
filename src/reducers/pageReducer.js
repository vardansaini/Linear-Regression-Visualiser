
import history from "../history.js"
import formatInput from "../linearRegression/formatInput"
const initialState = {
  inputString: "",
  inputData: [],
  arrayData:[[-1,1,2,3,4,5],[-1,1,2,3,4,5]],
  regressionEquation:"y=mx+c"
}

export default (state = initialState,action)=>{
  switch (action.type){
    case "updateInput":
      return {
        ...state,
        inputString: action.input
      }
    case "calculateRegression":
      console.log("INPUT STRING")
      console.log(state.inputString)
      let [formattedData,arrayData,valid] = formatInput(state.inputString)
      console.log("passed format input")
      console.log(history)
      if(valid){
        history.push("/results")
        return{
          ...state,
          inputData: formattedData,
          arrayData: arrayData,
        }
      }
      else{
        alert("the data you entered is not valid please try again")
        return{
          ...state
        }
      }
    default:
      return state
  }
}