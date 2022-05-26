import { useState, useEffect} from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import './App.css';
import Login from "./container/Auth/Login";
import Register from "./container/Auth/Register";
import Feed from "./container/Feed";
import HomePage from "./container/Home";

import { useSelector } from 'react-redux';
import Error404 from './container/404/error404';

function App() {

  const stateToken = useSelector(state=>state.auth.token);
  const localToken = localStorage.getItem("linkedinToken");

  const [userL, setUserL] = useState({
    stateToken: null,
    localToken: null
  });

  useEffect(()=>{
    if(stateToken || localToken){
      const info = { stateToken, localToken}
      setUserL(()=>{
          return { ...info}
      })
    }
  },[stateToken, localToken])

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ (!userL.localToken) ?<HomePage />:<Navigate to={'/feed/'} replace />} /> 
          <Route path="/home" element={ (!userL.localToken) ?<HomePage />:<Navigate to={'/feed/'} replace />} /> 
          <Route path="/login" element={ (!userL.localToken) ?<Login />:<Navigate to={'/feed/'} replace /> } /> 
          <Route path="/register" element={ (!userL.localToken) ?<Register />:<Navigate to={'/feed/'} replace /> } />
          <Route path="/feed/" element={(userL.stateToken || userL.localToken)?<Feed />:<Navigate to={'/'} replace />} />
          <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
