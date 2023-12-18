// Title.js
import { useEffect, useState } from "react";
import { db } from "./firebaseinit";
import { collection, getDocs } from "firebase/firestore";
import { getProblemClassColor } from "../data/classColor";
function Title() {
	const [membersCount, setMembersCount] = useState(null);
	const [problemsCount, setProblemsCount] = useState(null);

	useEffect(() => {
		const fetchMembersCount = async () => { // 회원수 가져오기
			const membersCollection = collection(db, "Members");
			const membersQuerySnapshot = await getDocs(membersCollection);
			const count = membersQuerySnapshot.size;
			setMembersCount(count);
		};

		const fetchProblemsCount = async () => { // 문제수 가져오기
			const problemsCollection = collection(db, "Problems");
			const problemsQuerySnapshot = await getDocs(problemsCollection);
			const count = problemsQuerySnapshot.size;
			setProblemsCount(count);
		};

		fetchMembersCount();
		fetchProblemsCount();
	}, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함


	return (
		<div className="content-item m-4">
			<div className="mb-5">
				<h1 className="header pb-0">ROJ</h1>
				<h5 className="header pb-5">React-Online-Judge</h5>
				<h7 className="pb-5">알고리즘 문제를 풀고, 순위를 경쟁하는 사이트입니다.</h7>
			</div>

			<div className="content-item-div p-5">
				<div>
					<h3>전체 문제</h3>
					<br />
					<h5>{problemsCount} 문제</h5>
				</div>

				<div>
					<h3>사용자 수</h3>
					<br />
					<h5>{membersCount} 명</h5>
				</div>
			</div>
			<div className="content-item-div p-5">
				<div>
					<h3>언어</h3>
					<br />
					<p className="classText">C</p>
					<p className="classText">C++</p>
					<p className="classText">C#</p>
					<p className="classText">Java</p>
					<p className="classText">Python</p>
					<p className="classText">PHP</p>
				</div>
				<div>
					<h3>클래스</h3>
					<br />
					<p className="classText"style={{color:getProblemClassColor("Ruby")}}>Ruby</p>
					<p className="classText"style={{color:getProblemClassColor("Diamond")}}>Diamond</p>
					<p className="classText"style={{color:getProblemClassColor("Platinum")}}>Platinum</p>
					<p className="classText"style={{color:getProblemClassColor("Gold")}}>Gold</p>
					<p className="classText"style={{color:getProblemClassColor("Silver")}}>Silver</p>
					<p className="classText"style={{color:getProblemClassColor("Bronze")}}>Bronze</p>

				</div>
			</div>

			<div className="credit">
				<p>made by {"\n"}20201554 최장현{"\n"}20201084 안형진</p>
			</div>


		</div>
	);
}

export default Title;
