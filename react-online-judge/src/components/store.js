// store.js
import { configureStore } from "@reduxjs/toolkit";
import { LoginState } from "./LoginReducer";

// 리덕스 스토어 생성
export default configureStore({
    reducer: {
        counter: LoginState
    }
});