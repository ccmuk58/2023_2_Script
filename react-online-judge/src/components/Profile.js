// Profile.js

import { useParams } from "react-router-dom";
import { db } from "./firebaseinit";
import { collection, getDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from "react";
import { getClassColor, getClassName, getProblemClassColor } from "../data/classColor";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Profile = () => {
	const { userId } = useParams();
	const [user, setUser] = useState(null);
	const [solvedProblems, setSolvedProblems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const docRef = doc(db, "Members", userId);
			const docSnap = await getDoc(docRef);
			setUser(docSnap.data());
		};

		fetchData(); // 컴포넌트가 마운트될 때 데이터를 가져오기 위해 함수 호출
	}, []);

	useEffect(() => {
		if (user && user.solved && user.solved.length > 0) {
			const fetchProblems = async () => {
				const q = query(collection(db, "Problems"), where("id", "in", user.solved));
				const querySnapshot = await getDocs(q);
				const problems = [];
				querySnapshot.forEach((doc) => {
					problems.push({ problemId: doc.id, ...doc.data() });
				});
				setSolvedProblems(problems);
			};

			fetchProblems();
		}
	}, [user]); // user 상태가 변경될 때마다 실행

	if (!user) {
		return <span>유저를 찾을 수 없습니다.</span>
	}
	const { nickname, ID, email, exp, solved } = user;
	const userClass = getClassName(exp);
	const classColor = getClassColor(exp);
	const userClassExp = exp % 100;
	const solvedCount = solved.length;

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

				<div className="content-item-div" style={{ justifyContent: "space-between" }}>
					<p style={{ width: "100%", fontWeight: "bold", color: classColor }}>{userClass}</p>
					<div className="exp-bar">
						<div className="exp-bar-inner" style={{
							width: `${userClassExp}%`,
							backgroundColor: classColor
						}}></div>

					</div>
					<p>{userClassExp}/100</p>
					<p>총 {exp}EXP</p>
				</div>
				<div className="content-solved">
					<p>푼 문제 : 총 {solvedCount}개</p>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>No</th>
								<th>제목</th>
								<th>난이도</th>
							</tr>
						</thead>
						<tbody>
							{solvedProblems.map((problem) => (
								<tr key={problem.problemId}>
									<td>
										<Link className="nav-link" to={`/problem/${problem.problemId}`}>{problem.id}</Link>
									</td>
									<td>
										<Link className="nav-link" to={`/problem/${problem.problemId}`}>{problem.title}</Link>
									</td>
									<td>
										<Link className="nav-link" to={`/problem/${problem.problemId}`} style={{fontWeight:"bold" ,color:getProblemClassColor(problem.difficulty)}}>{problem.difficulty}</Link>
									</td>
								</tr>
							))}

						</tbody>
					</Table>
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