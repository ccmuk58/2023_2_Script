// RankingList.js
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import userData from "../data/userData";
const RankingList = () => {
	const sortedUserData = Object.entries(userData).sort(([, a], [, b]) => b.exp - a.exp);

	function getClass(exp) {
		if(exp < 100) return "Bronze";
		else if(exp < 200) return "Silver";
		else if(exp < 300) return "Gold";
		else if(exp < 400) return "Platinum";
		else if(exp < 500) return "Diamond";
		else  return "Master";
	}

	return (
		<div className="content-item">
			<h1 className="header">랭킹</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>랭킹</th>
						<th>닉네임</th>
						<th>아이디</th>
						<th>등급</th>
					</tr>
				</thead>
				<tbody>
					{
						sortedUserData.map(([userId, { nickname, exp, ranking }], index) => (
							<tr key={userId} to={`/profile/${userId}`}>
								<td>
									<Link className="nav-link" to={`/profile/${userId}`}>
										{index+1}
									</Link>
								</td>
								<td>
									<Link className="nav-link" to={`/profile/${userId}`}>
										{nickname}
									</Link>
								</td>
								<td>
									<Link className="nav-link" to={`/profile/${userId}`}>
										{userId}
									</Link>
								</td>
								<td>
									<Link className="nav-link" to={`/profile/${userId}`}>
										{getClass(exp)}
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
export default RankingList;