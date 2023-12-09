import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { db } from "./firebaseinit";
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";

const RankingList = () => {
  const [sortedMembers, setSortedMembers] = useState([]);

  const getMembers = async () => {
    const q = query(collection(db, 'Members'), orderBy('exp', 'desc'));
    const querySnapshot = await getDocs(q);
    const members = [];
    querySnapshot.forEach((doc) => {
      // 문서의 데이터와 ID를 가져와서 객체로 만듭니다.
      members.push({ userKey: doc.id, ...doc.data() });
    });
    return members;
	
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await getMembers();
      setSortedMembers(members);
    };

    fetchMembers();
  }, []);

  function getClass(exp) {
    if (exp < 100) return "Bronze";
    else if (exp < 200) return "Silver";
    else if (exp < 300) return "Gold";
    else if (exp < 400) return "Platinum";
    else if (exp < 500) return "Diamond";
    else return "Master";
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
          {sortedMembers.map(({ userKey, ID, nickname, exp, ranking }, index) => (
            <tr key={userKey} to={`/profile/${userKey}`}>
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
                  {getClass(exp)}
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