import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', { username, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/login');

    } catch (error) {
      console.log(error);
      // Handle registration error here (display error message, etc.)
    }
  };

  return (
    <div className='log'>
  
        <>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
            <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/login';
      }}
> Login</button>
          </form>
        </>
      
    </div>
  );
};

export default Register;
