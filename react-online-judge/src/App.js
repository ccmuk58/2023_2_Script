  import { BrowserRouter as Router, Routes, Route, Link, NavLink, 
    Outlet, useParams, useNavigate, Navigate } from 'react-router-dom';
  import './App.css';
  import { useState } from 'react';
  import Profile from './components/Pages/Profile';
  import Home from './components/Pages/Home';
  import ProtectRoute from './components/ProtectRoute';
  import {Login, Logout} from './components/Login';

  const About = () => {
    return (
      <h1>s</h1>
    );
  }

  const NoPage = () => {
    return (
      <div style={{padding: 20}}>
        <h1>404: Page Not Found</h1>
        <p>The page is not exist.</p>
      </div>
    );
  }

  const AdminPage = () => {
    return (
      <div style={{padding: 20}}>
        <h1>ADMIN page</h1>
        <p>This is a Admin page view.</p>
      </div>
    );
  }

  const AppRouter = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    return (
      <>
        <nav style={{margin: 10}}>
          <NavLink to='/' style={{padding: 5}}>Home</NavLink>
          <NavLink to='/about' style={{padding: 5}}>About</NavLink>
          {user && <NavLink to='/admin' style={{padding: 5}}>Admin</NavLink>}
          <span> | </span>
          {!user && <NavLink to='/login' style={{padding: 5}}>Login</NavLink>}
          {user && <NavLink to='/profile' style={{padding: 5}}>Profile</NavLink>}
          {user && <NavLink to='/logout' style={{padding: 5}}>Logout</NavLink>}
        </nav>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/admin' 
            element={<ProtectRoute user={user}><AdminPage/></ProtectRoute>}/>
          <Route path='*' element={<NoPage/>}/>
          <Route path='/login' element={<Login setUser={setUser} />}></Route>
          <Route path='/profile' element={<Profile user = {user} />}></Route>
          <Route path='/logout' 
                  element={<Logout setUser={setUser} navigate={navigate}/>}></Route>
        </Routes>    
      </>
    );
  }

  function App() {
    return (
      <Router>
        <AppRouter />
      </Router>
    );
  }

  export default App;
