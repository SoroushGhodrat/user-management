// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./store/features/users/usersSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  // other reducers go here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
