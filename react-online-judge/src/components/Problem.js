import { Nav, Tab, Tabs } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
const Problem = () => {

	return (
		<>
			<h1 className="header">문제</h1>
			<hr />
			<Outlet />
		</>
	)
}
export default Problem;