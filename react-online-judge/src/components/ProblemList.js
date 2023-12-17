import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { db } from "./firebaseinit";
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectLogin } from "./LoginReducer";
import { getProblemClassColor } from "../data/classColor";

const ProblemList = () => {
  const [sortedProblems, setSortedProblems] = useState([]);
  const [solvedArray, setSolvedArray] = useState([]); // 문제를 풀었는지 안풀었는지를 저장하는 배열
  const [search, setSearch] = useState(""); // 검색어를 저장하는 상태변수

  const loginState = useSelector(selectLogin);
  const userKey = loginState.userKey;

  useEffect(() => {
    const fetchProblems = async () => {
      const q = query(collection(db, "Problems"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      const problems = [];
      querySnapshot.forEach((doc) => {
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

    const filteredProblems = sortedProblems // 검색어를 포함하는 문제만 필터링합니다.
	.filter(({ id, title, difficulty, description, input, output }) => {
		if (search === "") {
			return true;
		} else {
			const idMatch = id.toString().toLowerCase().includes(search.toLowerCase());
			const titleMatch = title.toLowerCase().includes(search.toLowerCase());
			const descriptionMatch = description.toLowerCase().includes(search.toLowerCase());
			const inputMatch = typeof input === "string" && input.toLowerCase().includes(search.toLowerCase());
			const outputMatch = typeof output === "string" && output.toLowerCase().includes(search.toLowerCase());
			const difficultyMatch = difficulty.toLowerCase().includes(search.toLowerCase());

			return idMatch || titleMatch || descriptionMatch || inputMatch || outputMatch || difficultyMatch;
		}
	});
  return (
    <div className="content-item">
      <h1 className="header">문제 목록</h1>
      <div className="container my-5">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="검색어를 입력하세요"
          onChange={(e) => setSearch(e.target.value)}
        />
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
            {filteredProblems.map(({ problemId, id, title, difficulty, description }) => (
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
                      <p style={{ color: getProblemClassColor(difficulty), fontWeight: "bold", display: "inline" }}>
                        {difficulty}
                      </p>
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
    </div>
  );
};

export default ProblemList;
