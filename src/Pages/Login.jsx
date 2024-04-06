import React, { useState, useContext } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from '../Context/LoggedIn'


const Login = () => {
  const [showReminder, setShowReminder] = useState(false);
  const [emailTemp, setTempEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userInfoContext = useContext(UserInfoContext);
    const { 
    setIsLoggedIn,
    setEmail,
    setUsername, } = userInfoContext;


  const handleLoginClick = async () => {
      if (!emailTemp.trim() || !password.trim()) {
        setShowReminder(true); // Show reminder message if any field is empty
      
      } else {
        try {
          const response = await fetch('http://localhost:5000/authenticateUser', { // TODO: need to change this to the correct endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: emailTemp,
              password: password,
            }),
          });

          if (!response.ok) {
            navigate('/login');
            throw new Error('Failed to authenticate user');
          }

          setEmail(emailTemp);
          setIsLoggedIn(true);
          navigate('/');
        } catch (error) {
          console.error('Error authenticating user:', error);
          navigate('/login')
        }
      }
  };

  const handlecreateAccountClick = () => {
    //TODO: need to get the username from backend, using the email (unique identifier) - then set it here user setUsername()
    setEmail(emailTemp)
    navigate('/signup')
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input type="email" placeholder='Email Address' value={emailTemp} onChange={(e) => setTempEmail(e.target.value)} />
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