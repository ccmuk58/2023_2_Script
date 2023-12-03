import { useParams } from "react-router-dom";
import userData from "../data/userData";

const Profile = () => {
	const { userId } = useParams();  // react-router-dom 에 정의된 후크
	const user = userData[userId];

	if (!user) {
		return <span>유저를 찾을 수 없습니다.</span>
	}
	const { nickname, password, email, exp, solved } = user;
	const solvedPoblems = [];
	function solvedCount(solved) {
		let count = 0;
		for (let i = 0; i < solved.length; i++) {
			if (solved[i] === true) {
				solvedPoblems.push(i + 1);
				count++;
			}
		}
		return count;
	}
	return (
		<div className="content-item">
			<img className="profileImg" style={{height:"300px", borderRadius:"50%", 
			border:"2px solid #111", marginBottom:"10px"}
		} 
			src={`/img/${userId}.png`} alt="profileImage"/>
			<br/>
			<h1>{nickname}</h1>
			<img src={`http://mazassumnida.wtf/api/v2/generate_badge?boj=${userId}`}
			 alt="solveacImg"></img>
			<p>{userId}</p>
			<p>{email}</p>
			<p>경험치 : {exp}</p>
			<p>푼 문제 : 총 {solvedCount(solved)}개</p>
			<p>푼 문제 번호</p>
			{solvedPoblems.map((problemId) => (
				<p style={{display:"inline-block"}}>{problemId}&nbsp;</p>
			))}
		</div>
	);
}
export default Profile;