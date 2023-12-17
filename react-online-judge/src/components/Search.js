
import { useState, useEffect } from "react";
import { db } from "./firebaseinit";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Search = () => {
  const [search, setSearch] = useState(""); // 검색어를 저장하는 상태변수
  const [problems, setProblems] = useState([]); // 문제 목록을 저장하는 상태변수

  useEffect(() =>{
      const q = query(collection(db, "Problems"), orderBy('id','desc'));
      
      //onSnapshot을 사용하여 실시간 업데이트를 감지하고 초기 데이터를 가져옴
      const unsubscribe = onSnapshot(q, (snapshot) => {
          const problems = snapshot.docs.map((doc) => ({
              problemId: doc.id,
              ...doc.data(),
          }));
          setProblems(problems);
      });

      // 컴포넌트가 언마운트될 때 구독을 해제
      return () => unsubscribe();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

  const searching = (e) => {
    setSearch(e.target.value);
  };

  

  const filteredProblems = problems
  .filter((problem) => {
    if (search === "") {
      return true;
    } else {
      const titleMatch = problem.title.toLowerCase().includes(search.toLowerCase());
      const descriptionMatch = problem.description.toLowerCase().includes(search.toLowerCase());
      const inputMatch = typeof problem.input === 'string' && problem.input.toLowerCase().includes(search.toLowerCase());
      const outputMatch = typeof problem.output === 'string' && problem.output.toLowerCase().includes(search.toLowerCase());

      return titleMatch || descriptionMatch || inputMatch || outputMatch;
    }
  })
  .map((problem) => (
    <tr key={problem.userKey}>
      <td className="p-3">
        <h3>{problem.title}</h3>
      </td>
      <td className="p-3">
        <p>{problem.description}</p>
      </td>
    </tr>
  ));

  return (
    <div className="container my-5">
      <input
        type="text"
        className="form-control mb-3" 
        placeholder="Search..."
        onChange={searching}
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Description</th>
          </tr>
        </thead>
        <tbody>{filteredProblems}</tbody>
      </table>
    </div>
  );
};

export default Search;
