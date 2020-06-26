
import history from "../history.js"
import formatInput from "../linearRegression/formatInput"
const initialState = {
  inputString: "",
  inputData: [],
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
      let [formattedData,valid] = formatInput(state.inputString)
      if(valid){
        history.push("/results")
        return{
          ...state,
          inputData: formattedData
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