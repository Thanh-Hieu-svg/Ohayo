import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CATEGORY_URL, PRODUCT_URL } from "../../../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const CreateProductForm = ({ onSuccess, onCancel }) => {
  const [images, setImages] = useState([{ file: null, preview: null }]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    sku: generateSKU(),
    category: "",
    price: "",
    stock: "",
    status: "instock",
    description: "",
  });

  function generateSKU() {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  useEffect(() => {
    axios
      .get(CATEGORY_URL)
      .then((res) => {
        setCategories(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setCategories([]));
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, idx) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[idx] = { file: files[0], preview: reader.result };
        setImages(newImages);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleAddImage = () => {
    setImages([...images, { file: null, preview: null }]);
  };

  const handleRemoveImage = (idx) => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages(newImages.length ? newImages : [{ file: null, preview: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("sku", form.sku);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("status", form.status);
      formData.append("description", form.description);
      images.forEach((img) => {
        if (img && img.file) formData.append("images", img.file);
      });

      await axios.post(PRODUCT_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Thêm sản phẩm thành công!");
      setForm({
        name: "",
        sku: generateSKU(),
        category: "",
        price: "",
        stock: "",
        status: "instock",
        description: "",
      });
      setImages([{ file: null, preview: null }]);
      if (typeof onSuccess === "function") onSuccess();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Thêm sản phẩm thất bại!");
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 max-w-2xl w-full shadow-2xl">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên Sản Phẩm
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleFormChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
              placeholder="Mã SKU"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh Mục
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleFormChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
              required
            >
              <option value="">Chọn danh mục</option>
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleFormChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
              placeholder="Nhập giá sản phẩm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số Lượng Tồn Kho
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleFormChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
              placeholder="Nhập số lượng"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng Thái
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleFormChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
            >
              <option value="instock">Còn Hàng</option>
              <option value="outofstock">Hết Hàng</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô Tả
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
            rows="4"
            placeholder="Nhập mô tả sản phẩm"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ảnh sản phẩm
          </label>
          {images.map((img, idx) => (
            <div key={idx} className="flex items-center mb-2 gap-3">
              <div className="w-16 h-16 flex justify-center items-center border rounded bg-gray-50 overflow-hidden mr-2">
                {img && img.preview ? (
                  <img
                    src={img.preview}
                    alt={`preview_${idx}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">Chưa chọn</span>
                )}
              </div>
              <input
                type="file"
                className="border rounded px-2 py-1 flex-1"
                onChange={(e) => handleImageChange(e, idx)}
                accept="image/*"
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="ml-2 text-red-600 hover:text-red-800"
                  title="Xóa ảnh này"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
          >
            +<span className="ml-1">Thêm ảnh</span>
          </button>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Thêm Sản Phẩm
          </button>
        </div>
      </form>
    </div>
  );
};
