// LoginReducer.js

import {createSlice} from '@reduxjs/toolkit';

// 상태 변수와 리듀서 정의
export const LoginReducer = createSlice({
    name: 'LoginState',
    initialState: {
        isLogin: false,
        userID: null,
        nickname: null,
    },
    reducers: {
        LoginState: (state, action) => {
            const { userID, nickname } = action.payload;
            state.isLogin = true;
            state.userID = userID;
            state.nickname = nickname
        },
        LogoutState: (state) => {
            state.isLogin = false;
            state.userID = null;
            state.nickname = null;
        },
    },
})
// 리듀서의 액션들을 비구조화로 가져오기
export const {LoginState, LogoutState} = LoginReducer.actions;

// 상태 값을 전달하는 함수 정의
export const selectLogin = (state) => ({
    isLogin: state.LoginState.isLogin,
    userID: state.LoginState.userID,
    nickname: state.LoginState.nickname,
});

export default LoginReducer.reducer;
