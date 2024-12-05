import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping , onRemoveFromCart }) => {
  const cart = useSelector(state => state.cart.items);
  console.log(cart);  // Verify the state of the cart
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    //console.log(cart);
    return cart.reduce((total, item) => {
      //console.log( total + (item.quantity * item.cost.replace('$', '')));
      return total + (item.quantity * item.cost.replace('$', ''));
    }, 0);
   };

  const handleContinueShopping = (e) => {
   
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    console.log("Incrementng item:", item);
    dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
    else if (item.quantity === 1) {
      dispatch(removeItem(item.name));
      onRemoveFromCart(item);
    }
   };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    onRemoveFromCart(item);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => Number(item.cost.replace('$', '')) * item.quantity;
  {
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost} per plant</div>
               <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


