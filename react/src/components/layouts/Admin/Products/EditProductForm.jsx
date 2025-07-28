import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CATEGORY_URL, PRODUCT_URL } from "../../../../api/api";

const API_URL = "http://localhost:5000";

export const EditProductForm = ({ productId, onSuccess, onCancel }) => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    status: "instock",
    description: "",
  });

  useEffect(() => {
    axios
      .get(CATEGORY_URL)
      .then((res) => setCategories(Array.isArray(res.data) ? res.data : []))
      .catch(() => setCategories([]));
    axios
      .get(`${PRODUCT_URL}/${productId}`)
      .then((res) => {
        const prod = res.data;
        setForm({
          name: prod.name || "",
          sku: prod.sku || "",
          category: prod.category?._id || prod.category || "",
          price: prod.price || "",
          stock: prod.stock || "",
          status: prod.status || "instock",
          description: prod.description || "",
        });

        setImages(
          prod.images && prod.images.length
            ? prod.images.map((url) => ({
                file: null,
                url,
                preview: url
                  ? url.startsWith("http")
                    ? url
                    : `${API_URL}${url.startsWith("/") ? url : "/" + url}`
                  : null,
              }))
            : [{ file: null, url: null, preview: null }]
        );
      })
      .catch(() => toast.error("Không lấy được dữ liệu sản phẩm!"));
  }, [productId]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, idx) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => {
          const newImages = [...prev];
          newImages[idx] = {
            file: files[0],
            url: null,
            preview: reader.result,
          };
          return newImages;
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleAddImage = () => {
    setImages([...images, { file: null, url: null, preview: null }]);
  };

  const handleRemoveImage = (idx) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== idx);
      return newImages.length
        ? newImages
        : [{ file: null, url: null, preview: null }];
    });
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
        if (img.file) {
          formData.append("images", img.file);
        } else if (img.url) {
          formData.append("oldImages", img.url);
        }
      });

      await axios.patch(`${PRODUCT_URL}/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Cập nhật sản phẩm thành công!");
      if (typeof onSuccess === "function") onSuccess();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Cập nhật sản phẩm thất bại!"
      );
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
              className="w-full border rounded-lg px-3 py-2"
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
              className="w-full border rounded-lg px-3 py-2"
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
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
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
              className="w-full border rounded-lg px-3 py-2"
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
              className="w-full border rounded-lg px-3 py-2"
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
              className="w-full border rounded-lg px-3 py-2"
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
            className="w-full border rounded-lg px-3 py-2"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ảnh sản phẩm
          </label>
          {images.map((img, idx) => (
            <div key={idx} className="flex items-center mb-2 gap-3">
              <div className="w-16 h-16 flex justify-center items-center border rounded bg-gray-50 overflow-hidden mr-2">
                {img.preview || img.url ? (
                  <img
                    src={
                      img.preview ||
                      (img.url?.startsWith("http")
                        ? img.url
                        : img.url
                        ? `${API_URL}${
                            img.url.startsWith("/") ? img.url : "/" + img.url
                          }`
                        : "")
                    }
                    alt={`preview_${idx}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-product.png";
                    }}
                  />
                ) : (
                  <span className="text-gray-400 text-xs">Chưa chọn ảnh</span>
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
                  X
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
            Lưu Thay Đổi
          </button>
        </div>
      </form>
    </div>
  );
};
