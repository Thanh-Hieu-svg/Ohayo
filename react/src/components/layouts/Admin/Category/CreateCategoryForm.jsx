import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CATEGORY_URL } from "../../../../api/api";

export const CreateCategories = ({ onAdd, onClose }) => {
  const [modalTitle] = useState("Thêm Danh mục mới");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id === "categoryModal") {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const closeModal = () => {
    setFormData({ name: "", description: "" });
    if (onClose) onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(CATEGORY_URL, formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Thêm danh mục thành công!");
      if (onAdd) onAdd(res.data);
      closeModal();
    } catch (err) {
      let msg = err.response?.data?.message || "Lỗi khi thêm danh mục!";
      toast.error(msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      id="categoryModal"
      className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-40"
    >
      <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{modalTitle}</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <form id="categoryForm" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Tên danh mục</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-lg"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
