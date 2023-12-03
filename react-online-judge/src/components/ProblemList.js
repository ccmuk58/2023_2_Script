import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import problemData from "../data/problemData";
const ProblemList = () => {
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
						Object.entries(problemData).map(([problemId, { title, description, difficulty, solved }]) => (
							<tr key={problemId} to={`/problem/${problemId}`}>
								<td>
									<Link className="nav-link" to={`/problem/${problemId}`}>
										{problemId}
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