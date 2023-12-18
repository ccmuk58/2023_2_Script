// ProblemItem.js
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { db } from "./firebaseinit";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import JDoodleAPI from "../JDoodleAPI";
import { useSelector } from "react-redux";
import { selectLogin } from "./LoginReducer";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, updateDoc, collection } from "firebase/firestore";
import { getProblemClassColor } from "../data/classColor";
import Editor from "@monaco-editor/react";

const ProblemItem = () => {
	const navigate = useNavigate();
	const loginState = useSelector(selectLogin);
	const userKey = loginState.userKey;
	const isLogin = (userKey !== null);

	const { problemId } = useParams();  // react-router-dom 에 정의된 후크
	const [problem, setProblem] = useState({});

	const fetchData = async () => {
		const docRef = doc(db, "Problems", problemId);
		const docSnap = await getDoc(docRef);
		setProblem(docSnap.data());
	};


	const {
		title, description, difficulty,
		timeLimit, memoryLimit, inputLimit, outputLimit,
		exinput, exoutput, input, output, id, exp, solvedCount, algorithms
	} = problem; // 비구조화 할당

	const [code, setCode] = useState('');
	const [language, setLanguage] = useState('cpp17');
	const [loading, setLoading] = useState(false);
	const [cpuTime, setCpuTime] = useState('');
	const [memory, setMemory] = useState('');
	const [result, setResult] = useState('');
	const [credit, setCredit] = useState('');
	const [editorLanguage, setEditorLanguage] = useState('cpp');

	useEffect(() => {
		const checkCredit = async () => {
			try {
				const c = await JDoodleAPI.getCredit();
				setCredit(c.used);
			} catch (error) {
				console.error("Error checking credit:", error);
			}
		};
		checkCredit();
		fetchData();
	}, []);

	const checkResult = () => {
		Promise.all([
			JDoodleAPI.executeCode(code, language, input[0]),
			JDoodleAPI.executeCode(code, language, input[1]),
			JDoodleAPI.executeCode(code, language, input[2]),
		]).then(async (values) => {
			console.log(values[0]);
			console.log(values[1]);
			console.log(values[2]);
			for (let i = 0; i < 3; i++) {
				const generalOutput = values[i].output.replace(/\s+$/g, '');
				const generalExoutput = output[i].replace(/\s+$/g, '');
				console.log(generalOutput);
				console.log(generalExoutput);
				if (generalOutput !== generalExoutput) {
					setResult("틀렸습니다.");
					return;
				}
			}
			const maxTime = Math.max(values[0].cpuTime, values[1].cpuTime, values[2].cpuTime);
			const maxMemory = Number(Math.max(values[0].memory, values[1].memory, values[2].memory)) / 1000;
			if (maxTime > timeLimit) {
				console.log("최대 시간 : " + maxTime + "초, 제한 시간 : " + timeLimit + "초");
				setResult("시간 초과");
				return;
			}
			if (maxMemory > memoryLimit) {
				console.log("최대 메모리 : " + maxMemory + "MB, 제한 메모리 : " + memoryLimit + "MB");
				setResult("메모리 초과");
				return;
			}
			setCpuTime(maxTime + "초");
			setMemory(maxMemory + "MB");
			setResult("맞았습니다!");

			// 사용자의 문서 참조
			const userDocRef = doc(db, "Members", userKey);
			// 문서를 읽어와 현재 'solved' 배열을 가져온다.
			const userDocSnap = await getDoc(userDocRef); // 문서 스냅샷
			const userDocData = userDocSnap.data(); // 문서 데이터
			const solvedArray = userDocData.solved;
			const Userexp = userDocData.exp;

			// 문제의 문서 참조
			const ProblemDocRef = doc(db, "Problems", problemId);
			const ProblemDocSnap = await getDoc(ProblemDocRef);
			const ProblemDocData = ProblemDocSnap.data();
			const solvedCount = ProblemDocData.solvedCount;

			// 현재 문제의 ID를 'solved' 배열에 추가
			if (!solvedArray.includes(id)) { // 문제를 푼 적이 없으면
				solvedArray.push(id);
				solvedArray.sort((a, b) => a - b); // 오름차순 정렬

				// 'solved' 필드를 업데이트
				await updateDoc(userDocRef, {
					solved: solvedArray,
					exp: Userexp + exp,
				});

				// 'solvedCount' 필드를 업데이트
				await updateDoc(ProblemDocRef, {
					solvedCount: solvedCount + 1,
				});
			}
			else {
				alert("이미 푼 문제입니다.");
				navigate('/problem');
			}


		}).catch((error) => {
			console.error("Error checking result:", error);
		});
	};

	const handleCodeChange = (value, e) => {
		setCode(value);
	};

	const handleSubmit = (e) => {
		if (isLogin) {
			e.preventDefault();
			setLoading(true);
			checkResult();
			setLoading(false);
		} else {
			alert("로그인이 필요합니다.");
			navigate('/login');
		}
	};

	return (
		<div className="content-item">
			<h2 className="problemHeader">{title}</h2>
			<hr />
			난이도: <p style={{ display: "inline", color: getProblemClassColor(difficulty), fontWeight: "bold" }}>{difficulty} </p>
			| 시간 제한 : {timeLimit}초 | 메모리 제한 : {memoryLimit}MB | 푼 사람: {solvedCount}명
			<hr />
			<div dangerouslySetInnerHTML={{ __html: description }}></div>
			<hr />

			<div className="content-item-div">
				<div className="example" >
					<h5>입력</h5>
					<div className="Limit" dangerouslySetInnerHTML={{ __html: inputLimit }}></div>
					<div className="IO" dangerouslySetInnerHTML={{ __html: exinput }}></div>
				</div>
				<div className="example">
					<h5>출력</h5>
					<div className="Limit" dangerouslySetInnerHTML={{ __html: outputLimit }}></div>
					<div className="IO" dangerouslySetInnerHTML={{ __html: exoutput }}></div>
				</div>
			</div>
			<h5>알고리즘 분류</h5>
			<div className="content-item-div">
				{algorithms?.map((algorithm) => (
					<p style={{ display: "inline-block" }}>{algorithm}&nbsp;</p>
				))}
			</div>

			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="language">
					<Form.Label>언어</Form.Label>
					<Form.Control as="select" value={language}
						onChange={(e) => {
							setLanguage(e.target.value);
							if(e.target.value === "cpp17") setEditorLanguage("cpp");
							else if(e.target.value === "python3")setEditorLanguage("python");
							else setEditorLanguage(e.target.value);
						}}>
						<option value="cpp17">C++17</option>
						<option value="c">C</option>
						<option value="python3">Python3</option>
						<option value="java">Java</option>
						<option value="php">PHP</option>
						<option value="csharp">C#</option>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="code">
					<Form.Label className="mt-3">소스 코드</Form.Label>
					{/* DOCS https://www.npmjs.com/package/@monaco-editor/react */}
					<Editor
						height="400px"
						language={editorLanguage}
						theme="vs-dark"
						value={code}
						onChange={handleCodeChange}
						options={{
							inlineSuggest: true,
							fontSize: "16px",
							formatOnType: true,
							autoClosingBrackets: true,
							minimap: { scale: 10 }
						}}
					/>
				</Form.Group>
				<div style={{ textAlign: "right" }}>
					<Button variant="primary" type="submit" disabled={loading} className="mt-1">
						{loading ? '채점중..' : '제출'}
					</Button>
					<br />
					사용 크레딧(제출당 3) : {credit} / 200
				</div>

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
						<Form.Control type="text" value={result} readOnly />
					</Form.Group>
				</div>
			</Form>
		</div>
	);
}
export default ProblemItem;