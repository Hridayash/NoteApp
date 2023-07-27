import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';
import CreateForm from './components/creatnote';
import Note from './components/note';
import Login from './login';
import Register from './register';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');


  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/register'); 
  };

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className='app'>
      {isLoggedIn ? (
        <>
          <Navbar onLogout={handleLogout} />
          <CreateForm />
          <Note />
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
         
        </>
      )}
    </div>
  );
}

export default App;
