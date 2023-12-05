import React, { useState } from "react";
import problemData from "../data/problemData";

const Search = () => {
  const [search, setSearch] = useState("");

  const searching = (e) => {
    setSearch(e.target.value);
  };

  const filteredProblems = Object.entries(problemData)
    .filter(([key, problem]) => {
      if (search === "") {
        return true; // 입력이 없으면 모든 문제를 보여준다.
      } else {
        return ( // 대소문자 구분 없이 검색어가 제목이나 설명에 포함되어 있으면 보여준다.
          problem.title.toLowerCase().includes(search.toLowerCase()) ||
          problem.description.toLowerCase().includes(search.toLowerCase()) ||
          problem.input.toLowerCase().includes(search.toLowerCase()) ||
          problem.output.toLowerCase().includes(search.toLowerCase())
        );
      }
    })
    .map(([key, problem]) => ( // 검색 결과를 테이블에 표시한다.
      <tr key={key}>
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
