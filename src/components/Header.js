import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

const Header = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to={"/"}>
          <h1 className="text-xl font-bold text-primary">ShopEase</h1>
        </Link>

        {/* Cart icon */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs absolute -right-2 -bottom-2">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
