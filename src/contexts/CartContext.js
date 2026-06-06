// import React, { createContext, useState, useEffect, useContext } from "react";

// export const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   // cart state
//   const [cart, setCart] = useState([]);
//   // item amount state
//   const [itemAmount, setItemAmount] = useState(0);
//   // total price state
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const total = cart.reduce((accumulator, currentItem) => {
//       return accumulator + currentItem.price * currentItem.amount;
//     }, 0);
//     setTotal(total);
//   });

//   // update item amount
//   useEffect(() => {
//     if (cart) {
//       const amount = cart.reduce((accumulator, currentItem) => {
//         return accumulator + currentItem.amount;
//       }, 0);
//       setItemAmount(amount);
//     }
//   }, [cart]);

//   // add to cart
//   const addToCart = (product, id) => {
//     const newItem = { ...product, amount: 1 };
//     // check if the item is already in the cart
//     const cartItem = cart.find((item) => {
//       return item.id === id;
//     });
//     if (cartItem) {
//       const newCart = [...cart].map((item) => {
//         if (item.id === id) {
//           return { ...item, amount: cartItem.amount + 1 };
//         } else return item;
//       });
//       setCart(newCart);
//     } else {
//       setCart([...cart, newItem]);
//     }
//   };

//   // remove from cart
//   const removeFromCart = (id) => {
//     const newCart = cart.filter((item) => {
//       return item.id !== id;
//     });
//     setCart(newCart);
//   };

//   // cleart cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   // increase amount
//   const increaseAmount = (id) => {
//     const cartItem = cart.find((item) => item.id === id);
//     addToCart(cartItem, id);
//   };

//   // decrease amount
//   const decreaseAmount = (id) => {
//     const cartItem = cart.find((item) => item.id === id);
//     if (cartItem) {
//       const newCart = cart.map((item) => {
//         if (item.id === id) {
//           return { ...item, amount: cartItem.amount - 1 };
//         } else {
//           return item;
//         }
//       });
//       setCart(newCart);
//     }
//     if (cartItem.amount < 2) {
//       removeFromCart(id);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         increaseAmount,
//         decreaseAmount,
//         itemAmount,
//         total,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // total price
  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => {
      return acc + item.price * item.amount;
    }, 0);

    setTotal(newTotal);
  }, [cart]);

  // total items
  useEffect(() => {
    const amount = cart.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);

    setItemAmount(amount);
  }, [cart]);

  const addToCart = (product, id) => {
    const cartItem = cart.find((item) => item.id === id);

    if (cartItem) {
      setCart(
        cart.map((item) =>
          item.id === id
            ? { ...item, amount: item.amount + 1 }
            : item
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
          item.id === id
            ? { ...item, amount: item.amount - 1 }
            : item
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