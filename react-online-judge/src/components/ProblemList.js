import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { db } from "./firebaseinit";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const ProblemList = () => {
	const [sortedProblems, setSortedProblems] = useState([]);

	const getProblems = async () => {
		const q = query(collection(db, "Problems"), orderBy("id",'asc'));
		const querySnapshot = await getDocs(q);
		const problems = [];
		querySnapshot.forEach((doc) => {
			// 문서의 데이터와 ID를 가져와서 객체로 만듭니다.
			problems.push({ problemId: doc.id, ...doc.data() });
		});
		return problems;	
	};

	useEffect(() => {
		const fetchProblems = async () => {
			const problems = await getProblems();
			setSortedProblems(problems);
		};

		fetchProblems();
	},[]);

	return (
		<div className="content-item">
			<h1 className="header">문제 목록</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>No</th>
						<th>제목</th>
						<th>난이도</th>
						<th>Solve</th>
					</tr>
				</thead>
				<tbody>
					{
						sortedProblems.map(({problemId, id, title, description, difficulty, solved }) => (
							<tr key={id} to={`/problem/${problemId}`}>
								<td>
									<Link className="nav-link" to={`/problem/${problemId}`}>
										{id}
									</Link>
								</td>
								<td>
									<Link className="nav-link" to={`/problem/${problemId}`}>
										{title}
									</Link>
								</td>
								<td>
									<Link className="nav-link" to={`/problem/${problemId}`}>
										{difficulty}
									</Link>
								</td>
								<td>
									<Link className="nav-link" to={`/problem/${problemId}`}>
										{solved + ""}
									</Link>
								</td>
							</tr>
						))
					}
				</tbody>
			</Table>
		</div>

	);
}
export default ProblemList;