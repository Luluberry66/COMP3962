import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout";
import Thankyou from "./Pages/Thankyou";
import MyAccount from "./Pages/MyAccount";
import History from "./Pages/History";
import shop_banner from "./Components/Assets/cloud1.png";
import home_bg_image from "./Components/Assets/hero_image.png";
import shop_bg_image from "./Components/Assets/shop_bg.webp";
import purple_bg_image from "./Components/Assets/purple_bg.webp";
import contact_bg_image from "./Components/Assets/contact_bg.webp";
import KommunicateChat from "./Components/KommunicateChat/KommunicateChat";

function App() {
  const location = useLocation();
  let backgroundImage = home_bg_image;

  switch (location.pathname) {
    case "/":
      backgroundImage = home_bg_image;
      break;
    case "/shop":
      backgroundImage = shop_bg_image;
      break;
    case "/about":
      backgroundImage = purple_bg_image;
      break;
    case "/contact":
      backgroundImage = contact_bg_image;
      break;
    case "/account":
      backgroundImage = contact_bg_image;
      break;
    case "/history":
      backgroundImage = contact_bg_image;
      break;
    case "/signup":
      backgroundImage = home_bg_image;
      break;
    case "/login":
      backgroundImage = home_bg_image;
      break;
    default:
      backgroundImage = "none";
  }

  document.body.style.backgroundImage = `url(${backgroundImage})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed";

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop banner={shop_banner} />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <KommunicateChat />
    </div>
  );
}

export default App;
