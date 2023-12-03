import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import userData from "../data/userData";
const RankingList = () => {
	return (
		<div className="content-item">
			<h1 className="header">랭킹</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>랭킹</th>
						<th>닉네임</th>
						<th>경험치</th>
					</tr>
				</thead>
				<tbody>
					{
						Object.entries(userData).map(([userId, { nickname, password, email, exp, solved}]) => (
							<tr key={userId} to={`/profile/${userId}`}>
								<td>
									<Link className="nav-link" to={`/profile/${userId}`}>
									{userId}
									</Link>
								</td>
								<td>
									<Link className="nav-link" to={`/profile/${userId}`}>
										{nickname}
									</Link>
								</td>
								<td>
									<Link className="nav-link" to={`/profile/${userId}`}>
										{exp}
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