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
				<Form.Label>입력</Form.Label>
				<Form.Control
					value={input}
					disabled
					className="IO"
				/>
			</div>
			<div className="example">
			<Form.Label>출력</Form.Label>
				<Form.Control
					value={output}
					disabled
					className="IO"
				/>
			</div>
		</div>
	);
}
export default ProblemItem;