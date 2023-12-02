import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ setUser }) => {
    const [credit, setCredit] = useState({});
    const navigate = useNavigate();  
    const handleLogin = () => {
      // 회원인지 확인하기
      if(credit.username === 'admin' && credit.password === '123') {
        setUser({username: credit.username});
        navigate('/'); 
      }
    }
    return (
      <div style={{padding: 10}}>
        <span>Username: </span><br/>
        <input type='text' 
          onChange={(e) => setCredit({...credit, username: e.target.value})}/><br/>
        <span>Password: </span><br/>
        <input type='password' 
          onChange={(e) => setCredit({...credit, password: e.target.value})}/><br/>
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  
 export const Logout = ({ setUser, navigate }) => {
    setUser(null); // user 상태변수 값을 삭제 
    navigate('/');
  }