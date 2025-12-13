import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export const User = ({ className }) => {
  const { logout, getUser } = useAuth();
  const user = getUser();
  const firstChar = user?.username
    ? user.username.trim().charAt(0).toUpperCase()
    : null;
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (user && firstChar) {
    return (
      <div className="relative" ref={menuRef}>
        <div
          title="Tài khoản"
          onClick={() => setOpen((o) => !o)}
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-lg border-none ${className}`}
          style={{ cursor: "pointer" }}
        >
          {firstChar}
        </div>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md z-50">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
              onClick={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </Link>
            <div
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
              onClick={logout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link to="/login">
      <FontAwesomeIcon icon={faUser} className={className} />
    </Link>
  );
};
