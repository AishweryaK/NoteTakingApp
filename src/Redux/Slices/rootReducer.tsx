import { combineReducers } from "redux";
import authReducer from "./demoSlice";


export const rootReducer = combineReducers({
    user : authReducer,
});