//RankingList.
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { db } from "./firebaseinit";
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from "react";

const RankingList = () => {
  const [sortedMembers, setSortedMembers] = useState([]);

  useEffect(() => {
    // 쿼리 정의
    const q = query(collection(db, 'Members'), orderBy('exp', 'desc'));

    // onSnapshot을 사용하여 실시간 업데이트를 감지하고 초기 데이터를 가져옴
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const members = snapshot.docs.map((doc) => ({
        userKey: doc.id,
        ...doc.data(),
      }));
      setSortedMembers(members);
    });

    // 컴포넌트가 언마운트될 때 구독을 해제
    return () => unsubscribe();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함 

  const classes = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"];
  const classColor = ["#cd7f32", "#6E6E6E", "#FFBF00", "#01DFA5", "#00BFFF", "#FF0040"];

  const getClass = (exp) => {
	return classes[Math.floor(exp / 100)];
  };

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
          {sortedMembers.map(({ userKey, ID, nickname, exp }, index) => (
            <tr key={userKey}>
              <td>
                <Link className="nav-link" to={`/profile/${userKey}`}>
                  {index + 1}
                </Link>
              </td>
              <td>
                <Link className="nav-link" to={`/profile/${userKey}`}>
                  {nickname}
                </Link>
              </td>
              <td>
                <Link className="nav-link" to={`/profile/${userKey}`}>
                  {ID}
                </Link>
              </td>
              <td>
                <Link className="nav-link" to={`/profile/${userKey}`}>
                  <p style={{color: classColor[classes.indexOf(getClass(exp))], fontWeight:"bold", display:"inline" }}>{getClass(exp)}</p>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RankingList;
