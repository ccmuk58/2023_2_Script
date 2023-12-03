import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch} from "react-redux";
import {LoginState} from "./LoginReducer";
import userData from "../data/userData";

const Login = () => {
	const [credit, setCredit] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogin = () => {
		// 사용자 확인
		if (credit.userID in userData) {
			if (userData[credit.userID].password === credit.password) {
				dispatch(LoginState({ userID: credit.userID, nickname: userData[credit.userID].nickname }));
				navigate('/');
			} else {
				alert('존재하지 않는 아이디 또는 비밀번호가 일치하지 않습니다.');
			}
		} else {
			alert('존재하지 않는 아이디 또는 비밀번호가 일치하지 않습니다.');
		}
	};
	
	return (
		<>
			<h1>Login Page</h1>
			<div style={{padding: 10}}>
				<span>Username: </span><br/>
				<input type='text' 
					onChange={(e) => setCredit({...credit, userID: e.target.value})}/><br/>
				<span>Password: </span><br/>
				<input type='password' 
					onChange={(e) => setCredit({...credit, password: e.target.value})}/><br/>
				<button onClick={handleLogin}>Login</button>
			</div>
		</>
	);
}

export default Login;