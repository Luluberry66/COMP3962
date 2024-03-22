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

  const handleContinueClick = () => {
    if (isChecked) {
      if (!usernameTemp.trim() || !emailTemp.trim() || !passwordTemp.trim()) {
        setShowReminder(true); // Show reminder message if any field is empty
       
      } else {
        // TODO: send user data to backend to store for future login:
        // sendUserData()=>{
          // data: {
          //   username: username
          //   email: email
          //   password: password
          // }
        // }
        setEmail(emailTemp)
        setUsername(usernameTemp)
        setIsLoggedIn(true)
        navigate('/');
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