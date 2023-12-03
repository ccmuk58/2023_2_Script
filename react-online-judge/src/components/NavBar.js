import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav style={{margin: 10}}>
        <NavLink to='/' style={{padding: 5}}>ROJ</NavLink>
        <NavLink to='/problem' style={{padding: 5}}>문제</NavLink>
        <NavLink to='/ranking' style={{padding: 5}}>랭킹</NavLink>
        <NavLink to='/search' style={{padding: 5}}>검색</NavLink>
        <NavLink to='/profile' style={{padding: 5}}>프로필</NavLink>
        <NavLink to='/Login' style={{padding: 5}}>로그인</NavLink>
      </nav>
    </div>
  );
}

export default NavBar;