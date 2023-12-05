const Search = () => {
// searching중인 단어 저장하기 위한 변수
const [search, setSearch] = useState("");

//input onChange일때 실행되는 함수
const searching = (e) => {
  setSearch(e.target.value);
};

	return (
		<>
			<input type="text" style={{ margin: "30px", height: "30px" }} onChange={searching} />
		</>
	)
}
export default Search;