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
import shop_banner from "./Components/Assets/cloud1.png";
import home_bg_image from "./Components/Assets/hero_image.png";
import KommunicateChat from "./Components/KommunicateChat/KommunicateChat";

function App() {
  const location = useLocation();
  let backgroundImage = home_bg_image;

  switch (location.pathname) {
    case "/":
      backgroundImage = home_bg_image;
      break;
    case "/shop":
      backgroundImage = "none";
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
      </Routes>
      <KommunicateChat/>
    </div>
  );
}

export default App;
