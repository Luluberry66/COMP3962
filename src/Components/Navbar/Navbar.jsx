import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/nuvola_logo_v1.png'
import cart_icon from '../Assets/cart_icon.png'
import nav_dropdown from '../Assets/nav_dropdown.png'
import account_icon from '../Assets/account_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { UserInfoContext } from '../../Context/LoggedIn'


const Navbar = () => {

    const [menu,setMenu] = useState("home");
    const {getTotalCartItems}= useContext(ShopContext);
    const userInfoContext = useContext(UserInfoContext);
    const { isLoggedIn , setIsLoggedIn, username} = userInfoContext;
    const menuRef = useRef();
    

    const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }

    const logoutBtn=()=>{
      setIsLoggedIn(false)
    }

  return (
    <div className='navbar'>
      <Link to='/' onClick={()=>{setMenu("home")}} className="nav-logo">
        <img src={logo} alt="" />
        <p className='company-name'>NUVOLA</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        
      <li onClick={()=>{setMenu("home")}}><Link to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("shop")}}><Link to='/shop'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("about")}}><Link to='/about'>About Us</Link>{menu==="about"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("contact")}}><Link to="contact">Contact Us</Link>{menu==="contact"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {!isLoggedIn &&  <Link to='/signup'><button>Login</button></Link> }
        {isLoggedIn &&   <>
        <div className='hero-columns' >
          {isLoggedIn && <Link to='/account'><img src={account_icon}  style={{ width: '24px', height: '24px' }} alt="" /></Link>}
        </div>
        <button style={{ width:'100px'}} onClick={logoutBtn}>Logout</button>
        </>}
       
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar