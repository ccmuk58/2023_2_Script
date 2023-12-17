// Title.js
import { useEffect, useState } from "react";
import { db } from "./firebaseinit";
import { collection, getDocs } from "firebase/firestore";
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
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column bg-white">
		<main class="px-3 pb-10">
			<h1 class = "text-black">React-Online-Judge</h1>
			<p class="lead text-black">This is a web application that provides a coding test environment.</p>
			
			<p class="lead">
			<a href="#" class="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</a>
			</p>
		</main>

		<div class = "box-container">
			<div class = "box">
				<div class= "box-element">
					<div class = "box-value"> {membersCount}명 </div>
					<div class = "box-name"> 전체 회원 </div>	
				</div>
				<div class= "box-element">
					<div class = "box-value"> {problemsCount}개 </div>
					<div class = "box-name"> 전체 문제 </div>	
				</div>
				<div class = "box-element">
					<div class = "box-value"> C, C++17, C#, Python3, Java, PHP </div>
					<div class = "box-name"> 사용가능언어 </div>
				</div>
			</div>
		</div>

		<footer class="mt-auto text-white-50">
			<p>made by {"\n"}20201554 최장현{"\n"}20201084 안형진</p>
		</footer>
	</div>
  );
}

export default Title;
