import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch} from "react-redux";
import {LoginState} from "./LoginReducer";
import userData from "../data/userData";
import { Button, FloatingLabel, Form } from "react-bootstrap";

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
			<h1 className="header">로그인</h1>
			<div className="loginForm">
				<FloatingLabel controlId="floatingInput" label="아이디">
				<Form.Control type="text" placeholder="id" onChange={(e) => setCredit({...credit, userID: e.target.value})}/>
				</FloatingLabel>
				<FloatingLabel controlId="floatingInput" label="비밀번호">
				<Form.Control type="password" placeholder="id" onChange={(e) => setCredit({...credit, password: e.target.value})}/>
				</FloatingLabel>
				<Button variant="secondary" onClick={handleLogin}>로그인</Button>

			</div>
			<div className="content-item">
			<p className="credit">made by {"\n"}20201554 최장현{"\n"}20201554 안형진</p>
			</div>
		</>
	);
}

export default Login;