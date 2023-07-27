import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      localStorage.setItem('token', response.data.token); // Set the token in local storage
      navigate('/'); // Navigate to the App component after login
    } catch (error) {
      console.log(error);
      alert("Incorrect Email or Password");
      
      
    }
  };

  return (
    <div className="log">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
       <button type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/register';
      }}
> Register</button>
      </form>
    </div>
  );
};

export default Login;
