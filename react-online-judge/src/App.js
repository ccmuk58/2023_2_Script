import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar";
import Title from "./components/Title";
import Problem from "./components/Problem";
import Ranking from "./components/Ranking";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ProblemList from "./components/ProblemList";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from "./components/ErrorPage";
import ProblemItem from "./components/ProblemItem";

const AppRouter = () => {
	return (
		<div>
			<NavBar />
			<div className="content">
				<Routes>
					<Route path="/" element={<Title />} />
					<Route path="/problem" element={<Problem />} >
						<Route index element={<ProblemList />} />
          				<Route path=':problemId' element={<ProblemItem/>}/>
					</Route>
					<Route path="/ranking" element={<Ranking />} />
					<Route path="/search" element={<Search />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<Login />} />
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
