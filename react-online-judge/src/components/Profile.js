import { useParams } from "react-router-dom";
import { db } from "./firebaseinit";
import { collection, getDoc,doc, query, where } from 'firebase/firestore';
import userData from "../data/userData";
import { useState } from "react";
import { useEffect } from "react";

const Profile = () => {
	const { userId } = useParams();
	const [user, setUser] = useState(null);
	const fetchData = async () => {
		const docRef = doc(db, "Members", userId);
		const docSnap = await getDoc(docRef);
  
		if (docSnap.exists()) {
		  console.log("Document data:", docSnap.data());
		  setUser(docSnap.data());
		} else {
		  console.log("No such document!");
		}
	  };
	useEffect(() => {
	  fetchData(); // 컴포넌트가 마운트될 때 데이터를 가져오기 위해 함수 호출
	}, []);
  
	if (!user) {
	  return <span>유저를 찾을 수 없습니다.</span>
	}
	const { nickname, ID, PW, email, exp, solved } = user;
	const solvedProblems = [];
	function solvedCount(solved) {
		let count = 0;
		for (let i = 0; i < solved.length; i++) {
			if (solved[i] === true) {
				solvedProblems.push(i + 1);
				count++;
			}
		}
		return count;
	}
	return (
		<>
			<div className="content-item">
				<h1 className="header">프로필</h1>
				<img className="profileImg" style={{
					height: "300px", borderRadius: "50%",
					border: "2px solid #111", marginBottom: "10px"
				}
				}
					src={`/img/${ID}.png`} alt="profileImage" />
				<br />
				<h1>{nickname}</h1>
				<a href={`https://solved.ac/${ID}`}>
					<img src={`http://mazassumnida.wtf/api/v2/generate_badge?boj=${ID}`}
						alt="solveacImg"></img>
				</a>
				<p>{ID}</p>
				<p>{email}</p>
				<p>경험치 : {exp}</p>
				<p>푼 문제 : 총 {solvedCount(solved)}개</p>
				<p>푼 문제 번호</p>
				{solvedProblems.map((problemId) => (
					<p style={{ display: "inline-block" }}>{problemId}&nbsp;</p>
				))}
			</div>
		</>
	);
}
export default Profile;