import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../../redux/searchSlice";

export const Search = ({ isOpen, setIsOpen }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search.keyword);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/shop?q=${encodeURIComponent(e.target.value)}`);
      dispatch(setKeyword(""));
    }
  };

  const handleIconClick = () => {
    setIsOpen((prev) => {
      if (!prev)
        setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
      return !prev;
    });
  };

  return (
    <li className="relative list-none">
      <Input
        ref={inputRef}
        value={searchValue}
        onChange={(e) => dispatch(setKeyword(e.target.value))}
        onKeyDown={handleKeyDown}
        isOpen={isOpen}
      />
      <span
        onClick={handleIconClick}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer text-primary"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-6 h-6" />
      </span>
    </li>
  );
};
