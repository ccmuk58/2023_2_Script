import { Nav, Tab, Tabs } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
const Problem = () => {

	return (
		<>
			<h1 className="content-item">Problem Page</h1>
			<Outlet />
		</>
	)
}
export default Problem;