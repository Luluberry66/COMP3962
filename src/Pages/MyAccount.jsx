import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from '../../Context/LoggedIn'


const MyAccount = () => {

  const userInfoContext = useContext(UserInfoContext);
  const [emailTemp, setEmailTemp] = useState('');
  const [passwordTemp, setPasswordTemp] = useState('');
  const [userNameTemp, setUserNameTemp] = useState('');
  const {  username, setEmail, email, setUserName } = userInfoContext;

  const handleSaveChanges = () => {
    setEmail( emailTemp)
    setUserName(userNameTemp)
    //TODO: need to check that user can put in their old password before changing the password to a new one
    setPassword(passwordTemp)
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
            <div>
                current email: {email}
            </div>
          <input type="email" placeholder='new Email' value={emailTemp} onChange={(e) => setEmailTemp(e.target.value)} />
          <div>
                current username: {username}
            </div>
          <input type="email" placeholder='new Username' value={userNameTemp} onChange={(e) => setUserNameTemp(e.target.value)} />
          <input type="password" placeholder='new Password' value={passwordTemp} onChange={(e) => setPasswordTemp(e.target.value)} />
        </div>
        <button onClick={handleSaveChanges}>Save Changes</button>
        <button onClick={handleSaveChanges}>Log Out</button>
      </div>
    </div>
  );
};

export default MyAccount;