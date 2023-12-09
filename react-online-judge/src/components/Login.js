import {collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import {db} from "./firebaseinit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginState } from "./LoginReducer";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Login = () => {
	const [credit, setCredit] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch(); 

	const handleLogin = async () => {
		// Firestore에서 'id' 필드 값이 credit.userID와 일치하는 사용자 찾기
		const q = query(collection(db, 'Members'), where('ID', '==', credit.userID));
		const querySnapshot = await getDocs(q);

		// 해당 사용자가 존재하는지 확인
		if (!querySnapshot.empty) {
			const userDoc = querySnapshot.docs[0];
			const userData = userDoc.data();  

			// 비밀번호 비교
			if (userData.PW === credit.password) {
				// 비밀번호 일치 시 로그인 성공
				dispatch(LoginState({ userKey: userDoc.id, nickname: userData.nickname}));
				alert(`${userDoc.id}`);
				navigate('/');
			} else {
				// 비밀번호 불일치
				alert('비밀번호가 일치하지 않습니다.');
			}
		} else {
			// 해당 사용자가 존재하지 않음
			alert('존재하지 않는 아이디입니다.');
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

export default Login;
