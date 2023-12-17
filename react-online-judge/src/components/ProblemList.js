import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { db } from "./firebaseinit";
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectLogin } from "./LoginReducer";

const ProblemList = () => {
  const [sortedProblems, setSortedProblems] = useState([]);
  const [solvedArray, setSolvedArray] = useState([]); // 문제를 풀었는지 안풀었는지를 저장하는 배열
  const loginState = useSelector(selectLogin);
  const userKey = loginState.userKey;

  useEffect(() => {
	const fetchProblems = async () => {
	  const q = query(collection(db, "Problems"), orderBy("id", "asc"));
	  const querySnapshot = await getDocs(q);
	  const problems = [];
	  querySnapshot.forEach((doc) => {
		// 문서의 데이터와 ID를 가져와서 객체로 만듭니다.
		problems.push({ problemId: doc.id, ...doc.data() });
	  });
	  setSortedProblems(problems);
	};
	fetchProblems();
  
	const fetchSolved = async () => {
	  // 문제를 풀었는지 안풀었는지를 저장하는 배열을 가져옵니다.
	  if (userKey) {
		const userDocRef = doc(db, "Members", userKey);
		const userDocSnap = await getDoc(userDocRef);
		const userDocData = userDocSnap.data();
		const solvedArray = userDocData.solved || []; // 문제를 풀었는지 안풀었는지를 저장하는 배열
		setSolvedArray(solvedArray);
	  }
	};
	fetchSolved();
  }, [userKey]);

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
          {sortedProblems.map(({ problemId, id, title, difficulty }) => (
            <tr key={id}>
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
                  {solvedArray.includes(id) ? "O" : "X"}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProblemList;
