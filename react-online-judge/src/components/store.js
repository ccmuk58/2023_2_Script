// store.js
import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer";

// 리덕스 스토어 생성
export default configureStore({
    reducer: {
        LoginState: LoginReducer
    },
});