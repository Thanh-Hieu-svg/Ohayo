import React from "react";

export const Category = ({ categories = [], selected = [], onChange }) => {
  const handleCheckboxChange = (cateId) => {
    if (!onChange) return;

    const cateIdStr = cateId.toString();
    const selectedStr = selected.map(String);
    let newSelected;

    if (selectedStr.includes(cateIdStr)) {
      newSelected = selectedStr.filter((id) => id !== cateIdStr);
    } else {
      newSelected = [...selectedStr, cateIdStr];
    }

    console.log("Checkbox changed:", cateIdStr, "New selected:", newSelected);
    onChange(newSelected);
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-6 text-3xl">Danh mục sản phẩm</h2>
      <div className="flex gap-4 flex-col">
        {categories.map((cate) => (
          <label
            key={cate._id}
            className="flex text-xl items-center gap-2 bg-gray-100 py-2 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.map(String).includes(String(cate._id))}
              onChange={() => handleCheckboxChange(cate._id)}
              className="accent-blue-500 w-6 h-6 cursor-pointer"
            />
            <span>{cate.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
