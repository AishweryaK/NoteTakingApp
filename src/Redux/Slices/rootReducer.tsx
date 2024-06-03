import { combineReducers } from "redux";
import authReducer from "./demoSlice";
import netInfoReducer from "./internetSlice";


export const rootReducer = combineReducers({
    user : authReducer,
    internet : netInfoReducer,
});