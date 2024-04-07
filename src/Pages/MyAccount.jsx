import React, { useContext, useState } from 'react'
import './CSS/MyAccount.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { UserInfoContext } from '../Context/LoggedIn'




const MyAccount = () => {

  const userInfoContext = useContext(UserInfoContext);
  const [emailTemp, setEmailTemp] = useState('');
  const [passwordTemp, setPasswordTemp] = useState('');
  const [userNameTemp, setUserNameTemp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const {  username, setEmail, email, setUserName, setIsLoggedIn } = userInfoContext;
    

  const logoutBtn=()=>{
    setIsLoggedIn(false)
    fetch('/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    navigate('/')
  }

  const handleSaveUserName = async () => {
    if (userNameTemp !== username) { // Check if the username has been changed.
      try {
        const response = await fetch('/update-username', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: userNameTemp }),
        });
  
        if (response.ok) {
          setUserName(userNameTemp);
        } else {
          // Handle any errors returned from the server
          console.error('Failed to update username');
        }
      } catch (error) {
        console.error('Error when attempting to update username:', error);
      }
    }
  };
  
  const handleSaveEmail = async () => {
    if (emailTemp !== email) { // Check if the email has been changed.
      try {
        const response = await fetch('/update-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailTemp }),
        });
  
        if (response.ok) {
          setEmail(emailTemp);
        } else {
          // Handle any errors returned from the server
          console.error('Failed to update email');
        }
      } catch (error) {
        console.error('Error when attempting to update email:', error);
      }
    }
  };

  const handleSavePassword = async () => {
    // Check if the new password is different from the old one
    if (newPassword && newPassword !== passwordTemp) {
      try {
        // Send a request to the backend to update the password
        const response = await fetch('/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // if you're using sessions
          body: JSON.stringify({
            oldPassword: passwordTemp, // the current password the user has entered
            newPassword: newPassword, // the new password the user wants to set
          }),
        });
  
        const data = await response.json(); // or handle the response format you expect
  
        if (response.ok) {
          // Handle success response
          console.log('Password updated successfully.');
          // Clear password inputs after successful change
          setPasswordTemp('');
          setNewPassword('');
        } else {
          // Handle errors, such as old password not matching
          console.error('Failed to update password:', data.message);
        }
      } catch (error) {
        console.error('Error when attempting to update password:', error);
      }
    } else {
      // If the new password is the same as the old password or empty
      console.error('New password is the same as the old password or has not been provided.');
    }
  };
  
  


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
      <div className="navigation-tabs">
      <NavLink to="/account" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
        Account Settings
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
        Transaction History
      </NavLink>
    </div>

        <h1>Account Settings</h1>
        <form className="loginsignup-fields">
          <div className="input-group">
            <label htmlFor="email">Current Email</label>
            <input type="email" value={email} disabled />
            <label htmlFor="new-email">New Email</label>
            <input id="new-email" type="email" placeholder='Enter new email' value={emailTemp} onChange={(e) => setEmailTemp(e.target.value)} />
            <button type="button" onClick={handleSaveEmail}>Save Email</button>
          </div>
          
          <div className="input-group">
            <label htmlFor="username">Current Username</label>
            <input type="text" value={username} disabled />
            <label htmlFor="new-username">New Username</label>
            <input id="new-username" type="text" placeholder='Enter new username' value={userNameTemp} onChange={(e) => setUserNameTemp(e.target.value)} />
            <button type="button" onClick={handleSaveUserName}>Save Username</button>
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password Change</label>
            <input id="password" type="password" placeholder='Old Password' value={passwordTemp} onChange={(e) => setPasswordTemp(e.target.value)} />
            <input type="password" placeholder='New Password' />
            <button type="button" onClick={handleSavePassword}>Save Password</button>
          </div>
        </form>
        
        <button className="logout-button" onClick={logoutBtn}>Log Out</button>
      </div>
    </div>
  );
};

export default MyAccount;