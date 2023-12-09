// LoginReducer.js

import {createSlice} from '@reduxjs/toolkit';

// 상태 변수와 리듀서 정의
export const LoginReducer = createSlice({
    name: 'LoginState',
    initialState: {
        userKey : null,
        nickname: null,
    },
    reducers: {
        LoginState: (state, action) => {
            const { userKey, nickname} = action.payload;
            state.nickname = nickname;
            state.userKey = userKey;
        },
        LogoutState: (state) => {
            state.nickname = null;
            state.userKey = null;
        },
    },
})
// 리듀서의 액션들을 비구조화로 가져오기
export const {LoginState, LogoutState} = LoginReducer.actions;

// 상태 값을 전달하는 함수 정의
export const selectLogin = (state) => ({
    userKey: state.LoginState.userKey,
    nickname: state.LoginState.nickname,
});

export default LoginReducer.reducer;
