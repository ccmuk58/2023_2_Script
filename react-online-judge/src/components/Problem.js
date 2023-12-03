import { Nav, Tab, Tabs } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
const Problem = () => {

	return (
		<>
			<h2>문제</h2>
			<hr />
			<Outlet />
		</>
	)
}
export default Problem;