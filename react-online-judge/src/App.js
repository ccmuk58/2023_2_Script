import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar";
import Title from "./components/Title";
import Problem from "./components/Problem";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import ProblemList from "./components/ProblemList";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from "./components/ErrorPage";
import ProblemItem from "./components/ProblemItem";
import RankingList from "./components/RankingList";

const AppRouter = () => {
	return (
		<div>
			<NavBar />
			<div className="content">
				<Routes>
					<Route path="/" element={<Title />} />
					<Route path="/problem" element={<Problem />} >
						<Route index element={<ProblemList />} />
						<Route path=':problemId' element={<ProblemItem />} />
					</Route>
					<Route path='ranking' element={<RankingList />} />
					{/*로그인된 아이디로 프로필 접근 처리*/}
					<Route path="/profile/:userId" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/logout" element={<Logout />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</div>
		</div>

	)
}

function App() {
	return (
		<Router>
			<div className="App">
				<AppRouter />
			</div>
		</Router>
	);
}

export default App;
