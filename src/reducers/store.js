import {combineReducers} from 'redux';
import pageReducer from "./pageReducer"
const allReducers = combineReducers({
    page:pageReducer,
})

export default allReducers;