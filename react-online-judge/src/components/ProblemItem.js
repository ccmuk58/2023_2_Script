import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import problemData from "../data/problemData";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import JDoodleAPI from "../JDoodleAPI";

const ProblemItem = () => {
	const { problemId } = useParams();  // react-router-dom 에 정의된 후크
	const problem = problemData[problemId];

	const [code, setCode] = useState('');
	const [language, setLanguage] = useState('cpp17');
	const [output, setOutput] = useState('');
	const [cpuTime, setCpuTime] = useState('');
	const [memory, setMemory] = useState('');
	const [loading, setLoading] = useState(false);

	const handleCodeChange = (e) => {
		setCode(e.target.value);
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const result = await JDoodleAPI.executeCode(code, language);
		setLoading(false);
		console.log(result);
		setOutput(result.output);
		setCpuTime(result.cpuTime + ' sec');
		setMemory(result.memory + ' bytes');
	};


	if (!problem) {
		return <span>undefined</span>
	}
	const { title, description, difficulty, exinput, exoutput } = problem;
	return (

		<div className="content-item">
			<h2 className="problemHeader">{title}</h2>
			<hr />
			난이도: {difficulty} | 시간 제한 : 1초 | 메모리 제한 : 1MB | 푼 사람: 0명
			<hr />
			<p>{description}</p>
			<hr />

			<div className="content-item-div">
				<div className="example">
					<p>입력</p>
					<p className="IO">{exinput}</p>
				</div>
				<div className="example">
					<p>출력</p>
					<p className="IO">{exoutput}</p>
				</div>
			</div>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="language">
					<Form.Label>언어</Form.Label>
					<Form.Control as="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
						<option value="cpp17">C++17</option>
						<option value="c">C</option>
						<option value="python3">Python3</option>
						<option value="java">Java</option>
						<option value="php">PHP</option>
						<option value="csharp">C#</option>
						<option value="pascal">Pascal</option>
						<option value="objc">Objective-C</option>
						<option value="rust">Rust</option>
						<option value="ruby">Ruby</option>
						<option value="perl">Perl</option>
						<option value="scala">Scala</option>
						<option value="swift">Swift</option>
						<option value="go">Go</option>
						<potion value="nodejs">NodeJS</potion>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="code">
					<Form.Label className="mt-3">소스 코드</Form.Label>
					<Form.Control as="textarea" rows={10} value={code} onChange={handleCodeChange} />
				</Form.Group>
				<Button variant="primary" type="submit" disabled={loading} className="mt-1">
					{loading ? '채점중..' : '제출'}
				</Button>

				{
					// 3개의 폼 한줄에 나오게
				}
				<div className="content-item-div">
					<Form.Group controlId="cpuTime" className="m-3 ">
						<Form.Label>실행 시간</Form.Label>
						<Form.Control type="text" value={cpuTime} readOnly />
					</Form.Group>
					<Form.Group controlId="memory" className="m-3">
						<Form.Label>메모리</Form.Label>
						<Form.Control type="text" value={memory} readOnly />
					</Form.Group>
					<Form.Group controlId="output" className="m-3">
						<Form.Label>결과</Form.Label>
						<Form.Control type="text" value={output} readOnly />
					</Form.Group>
				</div>
				

			</Form>


		</div>
	);
}
export default ProblemItem;