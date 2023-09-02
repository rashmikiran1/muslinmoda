import express from "express";
import cartModel from "../models/cartModel.js";

// Add item to cart
export const addcartControllers = async (req, res) => {
  const { user, product } = req.body;
  try {
    
    const cartItem = await cartModel.create({ user, product });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Get cart items for a user
export const getcartControllers =  async (req, res) => {
  const {user} = req.params;
  try {
    const cartItems = await cartModel.find({ user }).populate('product');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get cart items' });
  }
};

// Update cart item quantity
export const updatecartControllers = async (req, res) => {
  const cartItemId = req.params.cartItemId;
  const { quantity } = req.body;
  try {
    const cartItem = await cartModel.findByIdAndUpdate(
      cartItemId,
      { quantity },
      { new: true }
    );
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

// Remove item from cart
export const deletecartControllers = async (req, res) => {
  const cartItemId = req.params.cartItemId;
  try {
    await cartModel.findByIdAndRemove(cartItemId);
    res.json({ message: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
};


