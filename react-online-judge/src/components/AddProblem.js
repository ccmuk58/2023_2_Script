import {collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate } from "react-router-dom";
import {db} from "./firebaseinit";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const AddProblem = () => {
	const [credit, setCredit] = useState( {input : [], output : [], solvedCount : 0} );

    const index = async () =>{
        const problemsRef = collection(db, 'Problems');
        const problemsSnapshot = await getDocs(problemsRef);
        return problemsSnapshot.size;
    }
    setCredit({...credit, ID : index()});

	const handleProduce = async () => {
		// Firestore에서 'id' 필드 값이 credit.userID와 일치하는 사용자 찾기
		const docRef = await addDoc(collection(db, 'Problems'), credit);
	};

	return (
		<>
			<FloatingLabel controlId="floatingInput" label="알고리즘">
				<Form.Control type="text" placeholder="algorithms" onChange={(e) => setCredit({...credit, algorithms: e.target.value})}/>
			</FloatingLabel>
			<FloatingLabel controlId="floatingInput" label="description">
				<Form.Control type="text" placeholder="description" onChange={(e) => setCredit({...credit, description: e.target.value})}/>
			</FloatingLabel>
			<FloatingLabel controlId="floatingInput" label="difficulty">
				<Form.Control type="text" placeholder="difficulty" onChange={(e) => setCredit({...credit, difficulty: e.target.value})}/>
			</FloatingLabel>
			<FloatingLabel controlId="floatingInput" label="exinput">
				<Form.Control type="text" placeholder="exinput" onChange={(e) => setCredit({...credit, exinput: e.target.value})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="exoutput">
				<Form.Control type="text" placeholder="exoutput" onChange={(e) => setCredit({...credit, exoutput: e.target.value})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="exp">
				<Form.Control type="number" placeholder="exp" onChange={(e) => setCredit({...credit, exp: e.target.value})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="input">
				<Form.Control type="text" placeholder="input1" onChange={(e) => setCredit({...credit, input: [e.target.value, credit.input[1], credit.input[2]]})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="input">
				<Form.Control type="text" placeholder="input2" onChange={(e) => setCredit({...credit, input: [ credit.input[0], e.target.value, credit.input[2]]})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="input">
				<Form.Control type="text" placeholder="input3" onChange={(e) => setCredit({...credit, input: [credit.input[0], credit.input[1], e.target.value]})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="inputLimit">
				<Form.Control type="text" placeholder="inputLimit" onChange={(e) => setCredit({...credit, inputLimit: e.target.value})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="memoryLimit">
                <Form.Control type="number" placeholder="memoryLimit" onChange={(e) => setCredit({...credit, memoryLimit: e.target.value})}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="output1">
				<Form.Control type="text" placeholder="output1" onChange={(e) => setCredit({...credit, output: [e.target.value, credit.output[1], credit.output[2]]})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="output2">
				<Form.Control type="text" placeholder="output2" onChange={(e) => setCredit({...credit, output: [credit.output[0], e.target.value, credit.output[2]]})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="output3">
				<Form.Control type="text" placeholder="output3" onChange={(e) => setCredit({...credit, output:[credit.output[0], credit.output[1], e.target.value]})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="outputLimit">
				<Form.Control type="text" placeholder="outputlimit" onChange={(e) => setCredit({...credit, outputLimit: e.target.value})}/>
			</FloatingLabel>
        
            <FloatingLabel controlId="floatingInput" label="timeLimit">
				<Form.Control type="number" placeholder="nickname" onChange={(e) => setCredit({...credit, timeLimit: e.target.value})}/>
			</FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="title">
				<Form.Control type="text" placeholder="nickname" onChange={(e) => setCredit({...credit, title: e.target.value})}/>
			</FloatingLabel>
			<Button variant="secondary" onClick={handleProduce}>문제 생성</Button>
		</>
	);
};

export default AddProblem;
