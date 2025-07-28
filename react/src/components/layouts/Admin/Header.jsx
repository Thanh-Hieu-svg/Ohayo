import React, { useState } from "react";
import Logo from "../../../assets/images/Logo.png";
import { Search } from "../../icons/Search";
import { User } from "../../icons/User";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto px-4 py-2 md:py-2">
        <div className="flex-shrink-0">
          <Link to="/admin">
            <img
              src={Logo}
              alt="logo web"
              className="h-18 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Search
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            className="w-6 h-6 text-lg text-gray-700 hover:text-green-500 transition-colors"
          />

          <User className="w-6 h-6 text-lg text-gray-700 hover:text-green-500 transition-colors" />
        </div>
      </div>
    </header>
  );
};
