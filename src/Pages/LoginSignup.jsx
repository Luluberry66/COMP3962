import React, { useState, useContext } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from '../Context/LoggedIn'

const LoginSignup = () => {
  const userInfoContext = useContext(UserInfoContext);
  const { 
    setIsLoggedIn,
    setEmail,
    setUsername, } = userInfoContext;
  const [isChecked, setIsChecked] = useState(false); 
  const [showReminder, setShowReminder] = useState(false);
  const [usernameTemp, setTempUsername] = useState('');
  const [emailTemp, setTempEmail] = useState('');
  const [passwordTemp, setTempPassword] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setShowReminder(false);
  };

  const handleContinueClick = async () => {
    if (isChecked) {
      if (!usernameTemp.trim() || !emailTemp.trim() || !passwordTemp.trim()) {
        setShowReminder(true);
      } else {
        try {
          const response = await fetch('http://localhost:5000/register', { // TODO: need to change this to the correct endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: usernameTemp,
              email: emailTemp,
              password: passwordTemp,
            }),
          });

          if (!response.ok) {
            navigate('/signup');
            throw new Error('Failed to create user');
          }

          setEmail(emailTemp);
          setUsername(usernameTemp);
          setIsLoggedIn(true);
          navigate('/');
        } catch (error) {
          console.error('Error creating user:', error);
          navigate('/signup')
        }
      }
    } else {
      setShowReminder(true);
    }
  };

  const handleLoginClick = () => {
    navigate('/login')
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' value={usernameTemp} onChange={(e) => setTempUsername(e.target.value)} />
          <input type="email" placeholder='Email Address' value={emailTemp} onChange={(e) => setTempEmail(e.target.value)} />
          <input type="password" placeholder='Password' value={passwordTemp} onChange={(e) => setTempPassword(e.target.value)} />
        </div>
        <button onClick={handleContinueClick}>Continue</button>
        {showReminder && <p className="reminder-message">Please fill out all fields and accept the terms and conditions</p>}
        <p className="loginsignup-login">Already have an account? <span onClick={handleLoginClick}>Login here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='agree' id='agree' checked={isChecked} onChange={handleCheckboxChange} />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;