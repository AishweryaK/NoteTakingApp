import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE } from "../../Constants/strings";

export interface NetInfoState {
  connection: boolean;
}

const initialState: NetInfoState = {
  connection: false,
};

export const netInfo = createSlice({
  name: SLICE.INTERNET,
  initialState,
  reducers: {
    netConnection: (state, action: PayloadAction<{ connection: boolean }>) => {
      const { connection } = action.payload;
      state.connection = connection;
    },
  },
});

export const { netConnection } = netInfo.actions;
export default netInfo.reducer;
