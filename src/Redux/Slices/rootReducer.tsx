// import { combineReducers } from "redux";
// import authReducer from "./demoSlice";
// import netInfoReducer from "./internetSlice";


// export const rootReducer = combineReducers({
//     user : authReducer,
//     internet : netInfoReducer,
// });

import { combineReducers } from "redux";
import authReducer, { UserInfoState } from "./demoSlice";
import netInfoReducer, { NetInfoState } from "./internetSlice";

export interface RootState {
    user: UserInfoState;
    internet: NetInfoState;
}

export const rootReducer = combineReducers<RootState>({
    user: authReducer,
    internet: netInfoReducer,
});
