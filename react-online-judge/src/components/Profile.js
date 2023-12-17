import { useParams } from "react-router-dom";
import { db } from "./firebaseinit";
import { collection, getDoc, doc, query, where } from 'firebase/firestore';
import { useState } from "react";
import { useEffect } from "react";
import { getClassColor, getClassName } from "../data/classColor";
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
	const { nickname, ID, email, exp, solved } = user;
	const solvedProblems = [];
	const userClass = getClassColor(exp);
	const classColor = getClassColor(exp);
	const userClassExp = exp % 100;
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
				<h1 style={{ fontWeight: "bold" }}>{nickname}</h1>
				<p>{email}</p>

				<div className="content-item-div" style={{justifyContent:"space-between"}}>
					<p style={{ width: "100%",fontWeight:"bold", color: classColor }}>{userClass}</p>
					<div className="exp-bar">
						<div className="exp-bar-inner" style={{
							width: `${userClassExp}%`,
							backgroundColor: classColor
						}}></div>

					</div>
						<p>{userClassExp}/100</p>
						<p>총 {exp}EXP</p>
				</div>
				<div className="content-item-div">
					<p>푼 문제 : 총 {solvedCount(solved)}개</p>
					{solvedProblems.map((problemId) => (
						<p style={{ display: "inline-block" }}>{problemId}&nbsp;</p>
					))}
				</div>
				<div className="content-item-div">

					<div>
						<p>Solve.ac 프로필</p>
						<a href={`https://solved.ac/${ID}`}>
							<img src={`http://mazassumnida.wtf/api/v2/generate_badge?boj=${ID}`}
								alt="solveacImg"></img>
						</a>

					</div>

				</div>
			</div>
		</>
	);
}
export default Profile;