import {collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import {db} from "./firebaseinit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginState } from "./LoginReducer";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Register = () => {
	const [credit, setCredit] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = async () => {
		// Firestore에서 'id' 필드 값이 credit.userID와 일치하는 사용자 찾기
		const q = query(collection(db, 'Members'), where('ID', '==', credit.userID));
		const querySnapshot = await getDocs(q);

		// 해당 사용자가 존재하는지 확인
		if (!querySnapshot.empty) {
			alert('이미 존재하는 아이디입니다.');
		}
		else{

		} 
        
	};

	return (
		<>
			<FloatingLabel controlId="floatingInput" label="아이디">
				<Form.Control type="text" placeholder="id" onChange={(e) => setCredit({...credit, userID: e.target.value})}/>
			</FloatingLabel>
			<FloatingLabel controlId="floatingInput" label="비밀번호">
				<Form.Control type="password" placeholder="password" onChange={(e) => setCredit({...credit, password: e.target.value})}/>
			</FloatingLabel>
			<Button variant="secondary" onClick={handleLogin}>로그인</Button>
		</>
	);
};

export default Register;
