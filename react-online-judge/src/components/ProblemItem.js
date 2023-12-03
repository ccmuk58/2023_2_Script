import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
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

			<div className="example">
			<p>입력</p>
			<p className="IO">{input}</p>
			</div>
			<div className="example">
			<p>출력</p>
			<p className="IO">{output}</p>
			</div>
		</div>
	);
}
export default ProblemItem;