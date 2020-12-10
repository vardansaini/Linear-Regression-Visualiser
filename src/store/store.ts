import {combineReducers} from "redux"

import Data from "./Data"


const rootReducer = combineReducers({
  Data:Data,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
