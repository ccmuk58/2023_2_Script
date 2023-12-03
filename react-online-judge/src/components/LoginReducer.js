// LoginReducer.js

import {createSlice} from '@reduxjs/toolkit';

// 상태 변수와 리듀서 정의
export const LoginReducer = createSlice({
    name: 'LoginState',
    initialState: {
        isLogin: false,
        user: null,
        type: null,
    },
    reducers: {
        LoginState: (state, action) => {
            const { user, type } = action.payload;
            state.isLogin = true;
            state.user = user;
            state.type = type;
        },
        LogoutState: (state, action) => {
            const { user, type } = action.payload;
            state.isLogin = false;
            state.user = null;
            state.type = null;
        },
    },
})
// 리듀서의 액션들을 비구조화로 가져오기
export const {LoginState, LogoutState} = LoginReducer.actions;
// 상태 값을 전달하는 함수 정의
export const selectLogin = (state) => state.LoginState;

export default LoginReducer.reducer;
