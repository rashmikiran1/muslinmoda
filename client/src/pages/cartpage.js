import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/cart/user`);
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Cart Items:</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <p>Product: {item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default CartPage;
