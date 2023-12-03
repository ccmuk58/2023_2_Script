import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectLogin } from "./LoginReducer";
const NavBar = () => {
	const loginState = useSelector(selectLogin);
	const isLogin = loginState.isLogin;
	const userId = loginState.userID; 
	
	return (
		<div className='navigationBar'>
			<Navbar bg="light" expand="lg">
				<Container>
					<NavLink to='/' className="navbar-brand">React-Online-Judge</NavLink>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<NavLink to='/problem' className="nav-link">문제</NavLink>
							<NavLink to='/ranking' className="nav-link">랭킹</NavLink>
							<NavLink to='/search' className="nav-link">검색</NavLink>
							{!isLogin && <NavLink to='/login' className="nav-link">로그인</NavLink>}
							{isLogin && <NavLink to={`/profile/${userId}`} className="nav-link">프로필</NavLink>}
							{isLogin && <NavLink to='/logout' className="nav-link">로그아웃</NavLink>}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default NavBar;