import { combineReducers } from "redux";
import authReducer from "./demoSlice";


export const rootReducer = combineReducers({
    auth: authReducer,
});