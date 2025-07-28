import React from "react";

const Input = React.forwardRef(
  ({ value, onChange, onKeyDown, isOpen }, ref) => (
    <input
      ref={ref}
      type="text"
      placeholder="Tìm kiếm ..."
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`p-2 rounded-full bg-white border border-[#ffb524] text-gray-600 placeholder-gray-500 transition-all duration-500 ease-in-out focus:outline-none text-[16px]
      ${isOpen ? "w-64 opacity-100" : "w-0 opacity-0"}
    `}
      style={{ paddingRight: 36 }}
    />
  )
);

export default Input;
