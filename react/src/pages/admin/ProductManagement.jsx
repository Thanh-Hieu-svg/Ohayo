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
    <div className="space-y-6 p-4">
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
                <th className="p-4">Tên</th>
                <th className="p-4">Hình ảnh</th>
                <th className="p-4">Danh mục</th>
                <th className="p-4">Kho</th>
                <th className="p-4">Giá</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {productsToShow.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    Chưa có sản phẩm nào
                  </td>
                </tr>
              ) : (
                productsToShow.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">
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
                    <td className="p-4">
                      {item.category?.name ?? item.category}
                    </td>
                    <td className="p-4">{item.stock}</td>
                    <td className="p-4">
                      {item.price?.toLocaleString("vi-VN")}₫
                    </td>
                    <td className="p-4">
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
                    <td className="p-4 space-x-2 whitespace-nowrap">
                      <button
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleEdit(item._id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(item._id)}
                      >
                        Xoá
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
