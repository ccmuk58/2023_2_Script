import { Form, useParams } from "react-router-dom";
import problemData from "../data/problemData";
const ProblemItem = () => {
	const { problemId } = useParams();  // react-router-dom 에 정의된 후크
	const problem = problemData[problemId];

	if (!problem) {
		return <span>undefined</span>
	}
	const { title, description, difficult, input, output } = problem;
	return (
		<div className="content-item">
			<h3>{title}</h3>
			<hr />
			<p>{description}</p>
			<hr />
			
			
			<p className="example">입력</p>
			<p className="example">출력</p>
			<p className="example">{input}</p>
			<p className="example">{output}</p>
		</div>
	);
}
export default ProblemItem;