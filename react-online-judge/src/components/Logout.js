import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import {LogoutState} from "./LoginReducer";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
    dispatch(LogoutState());
    navigate('/');
}

export default Login;