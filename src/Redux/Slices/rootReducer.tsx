import { combineReducers } from "redux";
import authReducer from "./userSlice";
import netInfoReducer from "./internetSlice";
import loader from "./loader";


const rootReducer = combineReducers({
    user: authReducer,
    loader,
    internet: netInfoReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>

export default rootReducer;
