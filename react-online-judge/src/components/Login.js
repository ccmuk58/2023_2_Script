import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch} from "react-redux";
import {LoginState} from "./LoginReducer";

const Login = () => {
	const [credit, setCredit] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogin = ()=>{
		// 사용자 확인
		if(credit.username === 'admin' && credit.password === 'admin'){
			// 리덕스에 로그인 정보 저장
			dispatch(LoginState([credit.username, 'admin']));
		}
		navigate('/');
	}
	return (
		<>
			<h1>Login Page</h1>
			<div style={{padding: 10}}>
				<span>Username: </span><br/>
				<input type='text' 
					onChange={(e) => setCredit({...credit, username: e.target.value})}/><br/>
				<span>Password: </span><br/>
				<input type='password' 
					onChange={(e) => setCredit({...credit, password: e.target.value})}/><br/>
				<button onClick={handleLogin}>Login</button>
			</div>
		</>
	);
}

export default Login;