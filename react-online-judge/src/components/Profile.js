import userData from "../data/userData";
import { useSelector } from "react-redux";
import { selectLogin } from "./LoginReducer";

const Profile = () => {
	const loginState = useSelector(selectLogin);
	const userID = loginState.userID;

	if (!userID) {
		return <span>유저를 찾을 수 없습니다.</span>
	}
	const { nickname, password, email, exp, solved } = userData[userID];
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
			src={`/img/${userID}.png`} alt="profileImage"/>
			<br/>
			<h1>{nickname}</h1>
			<img src={`http://mazassumnida.wtf/api/v2/generate_badge?boj=${userID}`}
			 alt="solveacImg"></img>
			<p>{userID}</p>
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