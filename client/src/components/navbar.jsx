import React from 'react';


const Navbar = ({ onLogout }) => {
  return (
    <div className='navbar'>
      <h1>Notes App</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
