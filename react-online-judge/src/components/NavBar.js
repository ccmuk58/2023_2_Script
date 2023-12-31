import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectLogin } from "./LoginReducer";
const NavBar = () => {
	const loginState = useSelector(selectLogin);
	const userKey = loginState.userKey; 
	const isLogin = (userKey !== null); 
	
	return (
		<div className='navigationBar'>
			<Navbar expand="lg" style={{backgroundColor:"#f8f9faee"}}>
				<Container>
					<NavLink to='/' className="navbar-brand">React-Online-Judge</NavLink>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<NavLink to='/problem' className="nav-link">문제</NavLink>
							<NavLink to='/ranking' className="nav-link">랭킹</NavLink>
							{!isLogin && <NavLink to='/login' className="nav-link">로그인</NavLink>}
							{!isLogin && <NavLink to='/register' className="nav-link">회원가입</NavLink>}							
							{isLogin && <NavLink to={`/profile/${userKey}`} className="nav-link">프로필</NavLink>}
							{isLogin && <NavLink to='/logout' className="nav-link">로그아웃</NavLink>}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default NavBar;