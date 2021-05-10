import { configureStore } from "@reduxjs/toolkit";
import taskBoardReducer from "./taskBoardSlice";

export const store = configureStore({
  reducer: {
    taskBoard: taskBoardReducer,
  },
});
