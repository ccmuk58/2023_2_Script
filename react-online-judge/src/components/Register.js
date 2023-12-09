import {collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import {db} from "./firebaseinit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginState } from "./LoginReducer";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Register = () => {
	const [credit, setCredit] = useState( {exp : 0, solved : []} );
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleRegister = async () => {
		// Firestore에서 'id' 필드 값이 credit.userID와 일치하는 사용자 찾기
		const q = query(collection(db, 'Members'), where('ID', '==', credit.ID));
		const querySnapshot = await getDocs(q);

		// 해당 사용자가 존재하는지 확인
		if (!querySnapshot.empty) {
			alert('이미 존재하는 아이디입니다.');
		}
		else{
			const docRef = await addDoc(collection(db, 'Members'), credit);

			dispatch(LoginState({ userID: docRef.id, nickname: credit.nickname }));
			navigate('/');
		} 
	};

	return (
		<>
			<FloatingLabel controlId="floatingInput" label="아이디">
				<Form.Control type="text" placeholder="id" onChange={(e) => setCredit({...credit, ID: e.target.value})}/>
			</FloatingLabel>
			<FloatingLabel controlId="floatingInput" label="비밀번호">
				<Form.Control type="password" placeholder="password" onChange={(e) => setCredit({...credit, PW: e.target.value})}/>
			</FloatingLabel>
			<FloatingLabel controlId="floatingInput" label="이메일">
				<Form.Control type="text" placeholder="email" onChange={(e) => setCredit({...credit, email: e.target.value})}/>
			</FloatingLabel>
			<FloatingLabel controlId="floatingInput" label="닉네임">
				<Form.Control type="text" placeholder="nickname" onChange={(e) => setCredit({...credit, nickname: e.target.value})}/>
			</FloatingLabel>
			<Button variant="secondary" onClick={handleRegister}>회원가입</Button>
		</>
	);
};

export default Register;
