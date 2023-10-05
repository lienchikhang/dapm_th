import logo from './logo.svg';
import './App.css';
import { Link, BrowserRouter, Route, Routes, useRoutes, useNavigate, redirect, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user.currentUser);
  const admin = user?.payload?.isAdmin;
  return (
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard'/>}/>
        <Route path='/login' element={admin ? <Navigate to='/dashboard'/>: <Login/>}/>
        <Route path='/dashboard' element={admin ? <Dashboard/> : <Navigate to='/login'/>}/>

      </Routes>
  );
}

export default App;
