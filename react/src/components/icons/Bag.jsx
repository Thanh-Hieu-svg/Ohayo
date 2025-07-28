import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Bag = ({ className }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItem = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link to="/cart" className="relative inline-block">
      <FontAwesomeIcon icon={faBagShopping} className={className} />
      {totalItem > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-400 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold shadow">
          {totalItem}
        </span>
      )}
    </Link>
  );
};
