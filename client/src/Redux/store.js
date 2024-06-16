import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slices/authSlice";
import { passwordReducer } from "./Slices/passwordSlice";
import { profileReducer } from "./Slices/profileSlice";
import { noteReducer } from "./Slices/noteSlice";
import { categoryReducer } from "./Slices/categorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    password: passwordReducer,
    profile: profileReducer,
    note: noteReducer,
    category: categoryReducer,
  },
});

export default store;
