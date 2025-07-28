import React, { useState } from "react";
import Logo from "../../../assets/images/Logo.png";
import { Navbar } from "./Navbar";
import { Search } from "../../icons/Search";
import { Bag } from "../../icons/Bag";
import { User } from "../../icons/User";
import { Menu } from "../../icons/Menu";
import { Close } from "../../icons/Close";

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
          <img
            src={Logo}
            alt="logo web"
            className="h-18 w-auto object-contain"
          />
        </div>

        <nav className="hidden md:block list-none">
          <Navbar />
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-green-500 transition-colors">
            <Search
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              className="w-6 h-6 text-lg"
            />
          </button>
          <button className="text-gray-700 hover:text-green-500 transition-colors">
            <Bag className="w-6 h-6 text-lg" />
          </button>
          <button className="text-gray-700 hover:text-green-500 transition-colors">
            <User className="w-6 h-6 text-lg" />
          </button>
          <button
            className="md:hidden text-gr  ay-700 hover:text-green-500 transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <Close className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden list-none bg-white border-t border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-[80px] right-0 w-full max-w-[300px] h-[calc(100vh-80px)] z-40 overflow-y-auto`}
      >
        <Navbar isMobile />
      </div>
    </header>
  );
};
