import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { CreateProductForm } from "../../components/layouts/Admin/Products/CreateProductForm";
import { BACKEND_URL, PRODUCT_URL } from "../../api/api";
import { EditProductForm } from "../../components/layouts/Admin/Products/EditProductForm";
import ClipLoader from "react-spinners/ClipLoader";
import { Pagination } from "../../components/common/Pagination";

function getProductImage(product) {
  if (product.image && typeof product.image === "string") {
    return product.image.startsWith("http")
      ? product.image
      : `${BACKEND_URL}${
          product.image.startsWith("/") ? product.image : "/" + product.image
        }`;
  }
  if (
    Array.isArray(product.images) &&
    typeof product.images[0] === "string" &&
    product.images[0]
  ) {
    return product.images[0].startsWith("http")
      ? product.images[0]
      : `${BACKEND_URL}${
          product.images[0].startsWith("/")
            ? product.images[0]
            : "/" + product.images[0]
        }`;
  }
  return "/default-product.png";
}

export const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(PRODUCT_URL);
      setProducts(res.data);
    } catch (err) {
      toast.error("Lỗi khi tải sản phẩm!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const handleAdd = () => {
    setShowForm(true);
    setEditId(null);
  };

  const handleEdit = (productId) => {
    setEditId(productId);
    setShowForm(false);
  };

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn xoá sản phẩm?",
      text: "Thao tác này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${PRODUCT_URL}/${productId}`);
        toast.success("Đã xoá sản phẩm!");
        fetchProducts();
      } catch (err) {
        toast.error("Lỗi khi xoá sản phẩm!");
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditId(null);
    fetchProducts();
  };

  // QUAN TRỌNG: Cắt mảng theo page
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const productsToShow = products.slice(startIdx, endIdx);

  return (
    <div className="space-y-6 p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Quản lý sản phẩm</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={handleAdd}
        >
          Thêm sản phẩm
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <CreateProductForm
            onSuccess={handleFormSuccess}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editId && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <EditProductForm
            productId={editId}
            onSuccess={handleFormSuccess}
            onCancel={() => setEditId(null)}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center min-h-[120px]">
            <ClipLoader color="#36d7b7" size={48} />
          </div>
        ) : (
          <table className="min-w-full bg-white rounded-xl shadow table-auto">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2">Tên</th>
                <th className="p-2">Hình ảnh</th>
                <th className="p-2">Danh mục</th>
                <th className="p-2">Kho</th>
                <th className="p-2">Giá</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {productsToShow.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-2 text-center text-gray-500">
                    Chưa có sản phẩm nào
                  </td>
                </tr>
              ) : (
                productsToShow.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-2 max-w-[350px]">{item.name}</td>
                    <td className="p-2">
                      <img
                        src={getProductImage(item)}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded "
                        onError={(e) => {
                          if (!e.target.src.endsWith("/default-product.png")) {
                            e.target.src = "/default-product.png";
                          }
                        }}
                      />
                    </td>
                    <td className="p-2">
                      {item.category?.name ?? item.category}
                    </td>
                    <td className="p-2">{item.stock}</td>
                    <td className="p-2">
                      {item.price?.toLocaleString("vi-VN")}₫
                    </td>
                    <td className="p-2">
                      <span
                        className={`font-semibold ${
                          item.status === "instock"
                            ? "text-green-600"
                            : item.status === "outofstock"
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}
                      >
                        {item.status === "instock"
                          ? "Còn hàng"
                          : item.status === "outofstock"
                          ? "Hết hàng"
                          : "Ngừng kinh doanh"}
                      </span>
                    </td>
                    <td className="p-2 space-x-2 whitespace-nowrap">
                      <button
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleEdit(item._id)}
                        title="Sửa"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(item._id)}
                        title="Xóa"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalItems={products.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setPage}
      />
    </div>
  );
};
