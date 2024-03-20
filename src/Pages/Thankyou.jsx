import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate('/')
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Thank you!</h1>
        <p>We hope you are as 'in the clouds' as us with your purchase!</p>
        <button onClick={handleBtnClick}>Continue shopping</button>
      </div>
    </div>
  );
};

export default Thankyou;