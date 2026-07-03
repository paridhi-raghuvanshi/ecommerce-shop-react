import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // ✅ Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // total price
  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
    setTotal(newTotal);
  }, [cart]);

  // total items
  useEffect(() => {
    const amount = cart.reduce((acc, item) => acc + item.amount, 0);
    setItemAmount(amount);
  }, [cart]);

  const addToCart = (product, id) => {
    const cartItem = cart.find((item) => item.id === id);

    if (cartItem) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, amount: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // ✅ also clear from localStorage
  };

  const increaseAmount = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) addToCart(item, id);
  };

  const decreaseAmount = (id) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    if (item.amount > 1) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
      );
    } else {
      removeFromCart(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
