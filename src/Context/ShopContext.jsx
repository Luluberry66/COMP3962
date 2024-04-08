import React, { createContext, useEffect, useState, useContext } from "react";
import backup_product from "../Components/Assets/all_product";
import { UserInfoContext } from "./LoggedIn";

export const ShopContext =  createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < backup_product.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const {isLoggedIn} = useContext(UserInfoContext);

    // State to hold all products
    const [all_product, setAllProduct] = useState([]);

    useEffect(() => {
        // Fetch products when the component mounts
        const fetchProducts = async () => {
            try {
                const response = await fetch('/getItems');
                const data = await response.json();
                setAllProduct(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []); 


    // shopping cart state
    const [cartItems,setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('/getShoppingCart', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.shoppingCart) {
                setCartItems(data.shoppingCart);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [isLoggedIn]); 

    useEffect(() => {
        fetch('/updateShoppingCart', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shoppingCart: cartItems }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [cartItems]);

    const clearCart = () =>{
        setCartItems(getDefaultCart());
    }
    
    
    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = all_product.find((product) => product.id === Number(item));
            totalAmount += cartItems[item] * itemInfo.new_price;
          }
        }
        return totalAmount;
      }

      const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
      }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart, clearCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;