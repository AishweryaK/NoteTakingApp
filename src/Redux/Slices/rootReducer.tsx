import { combineReducers } from "redux";
import authReducer from "./demoSlice";
import netInfoReducer from "./internetSlice";


const rootReducer = combineReducers({
    user: authReducer,
    internet: netInfoReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>

export default rootReducer;
