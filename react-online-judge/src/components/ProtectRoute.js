// ProtectRoute.js 
// 유저가 아닌 상태에서 접근하면 로그인 페이지로 이동하도록 하는 컴포넌트

import { Navigate } from "react-router-dom";

const ProtectRoute = ({ user, children }) => { 
    if(!user) {
      return (
        <Navigate to='/login' replace />
      );
    }
    return children;
  }

export default ProtectRoute;