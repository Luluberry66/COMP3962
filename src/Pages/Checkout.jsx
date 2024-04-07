import React, { useState, useContext } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext'

const Checkout = () => {
  const [isChecked, setIsChecked] = useState(false); 
  const [showReminder, setShowReminder] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [securityNum, setSecurityNum] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const {clearCart, cartItems, getTotalCartAmount} = useContext(ShopContext);



  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setShowReminder(false);
  };

  const handlePurchaseClick = () => {
      if (!lastName.trim() || !firstName.trim() || !expiryDate.trim()) {
        setShowReminder(true); // Show reminder message if any field is empty
      } else {
        fetch('/placeOrder', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderItems: cartItems,
            totalAmount: getTotalCartAmount(),
          }),
        });
        clearCart();
        navigate('/thankyou');
      }
  };


  return (
    <div className='checkout-container'>
      <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>Check Out</h1>
          <div className="loginsignup-fields">
          <h2>Billing</h2>
          <div className="subgroup-fields">

              <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />

              <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />


          </div>

          <input type="text" placeholder='Credit Card Number' value={cardNum} onChange={(e) => setCardNum(e.target.value)} />

          <div  className="subgroup-fields">
          <input style={{width:'50%'}} type="text" placeholder='Expiry Date' value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          <input style={{width:'50%'}}  type="text" placeholder='Security Number' value={securityNum} onChange={(e) => setSecurityNum(e.target.value)} />
          </div>
            <input type="text" placeholder='Billing Address' value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
            <input type="text" placeholder='Phone Number' value={billingPhone} onChange={(e) => setBillingPhone(e.target.value)} />
          </div>
          <div className="loginsignup-fields">
          <h2>Shipping</h2>
            <input type="text" placeholder='Billing Address' value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
            <input type="text" placeholder='Phone Number' value={shippingPhone} onChange={(e) => setShippingPhone(e.target.value)} />
          </div>
        
          <button onClick={handlePurchaseClick}>Proceed With Purchase</button>
          {showReminder && <p className="reminder-message">Please fill out all fields</p>}
          </div>
      </div>
    </div>
  );
};

export default Checkout;