import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutState } from "./LoginReducer";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    // useEffect 내에서 상태 업데이트와 페이지 이동을 보장
  useEffect(() => {
    dispatch(LogoutState());
    navigate('/');
  }, [dispatch, navigate]);

};

export default Logout;
