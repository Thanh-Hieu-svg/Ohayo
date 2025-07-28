import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CATEGORY_URL } from "../../api/api";
import { CreateCategories } from "../../components/layouts/Admin/Category/CreateCategoryForm";
import { EditCategoryForm } from "../../components/layouts/Admin/Category/EditCategoryForm";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Pagination } from "../../components/common/Pagination";

export const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  // Phân trang
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(CATEGORY_URL);
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error("Lỗi khi tải danh mục: " + error.message);
      setCategories([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    fetchCategories();
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setEditCategory(null);
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xoá?",
      text: "Thao tác này sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xoá",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${CATEGORY_URL}/${id}`);
        toast.success("Xoá danh mục thành công!");
        fetchCategories();
      } catch (err) {
        let msg = err.response?.data?.error || "Lỗi khi xoá danh mục!";
        toast.error(msg);
      }
    }
  };

  // Lấy danh sách theo trang
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const categoriesToShow = categories.slice(startIdx, endIdx);

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Quản lý danh mục</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={() => setShowModal(true)}
        >
          Thêm danh mục
        </button>
      </div>

      {showModal && (
        <CreateCategories
          onAdd={handleAddCategory}
          onClose={() => setShowModal(false)}
        />
      )}

      {showEditModal && editCategory && (
        <EditCategoryForm
          category={editCategory}
          onSuccess={handleEditSuccess}
          onClose={() => {
            setShowEditModal(false);
            setEditCategory(null);
          }}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[120px]">
          <ClipLoader color="#36d7b7" size={48} />
        </div>
      ) : (
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">#</th>
              <th className="p-4">Tên danh mục</th>
              <th className="p-4">Mô tả</th>
              <th className="p-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categoriesToShow && categoriesToShow.length > 0 ? (
              categoriesToShow.map((item, idx) => (
                <tr key={item._id || idx} className="border-t">
                  <td className="p-4">{startIdx + idx + 1}</td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.description}</td>
                  <td className="p-4 space-x-2">
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleEditCategory(item)}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(item._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Không có danh mục nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={page}
        totalItems={categories.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setPage}
      />
    </div>
  );
};
