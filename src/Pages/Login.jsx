import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showReminder, setShowReminder] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLoginClick = () => {
      if (!email.trim() || !password.trim()) {
        setShowReminder(true); // Show reminder message if any field is empty
      } else {
        // TODO: send login data to backend checking if it exists. if exists you log in, if not, return message to user:
        // sendUserData()=>{
          // data: {
          //   email: email
          //   password: password
          // }
        // }
        navigate('/');
      }
  };

  const handlecreateAccountClick = () => {
    navigate('/signup')
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLoginClick}>Login</button>
        {showReminder && <p className="reminder-message">Please fill out all fields</p>}
        <p className="loginsignup-login">Dont have an account? <span onClick={handlecreateAccountClick}>Create one here</span></p>
      </div>
    </div>
  );
};

export default Login;