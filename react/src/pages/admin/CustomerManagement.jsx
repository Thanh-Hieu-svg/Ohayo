import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { USER_URL } from "../../api/api";
import { EditUserForm } from "../../components/layouts/Admin/User/EditUserForm";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <ul className="flex gap-2 justify-center mt-6">
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-md border ${
            currentPage === 1
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-700 bg-white hover:bg-gray-200 border-gray-300"
          }`}
        >
          ←
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, i) => (
        <li key={i + 1}>
          <button
            onClick={() => onPageChange(i + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all duration-200 ${
              currentPage === i + 1
                ? "bg-green-500 text-white border-green-500 hover:bg-green-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-md border ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-700 bg-white hover:bg-gray-200 border-gray-300"
          }`}
        >
          →
        </button>
      </li>
    </ul>
  );
};

export const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(USER_URL);
        setCustomers(res.data);
      } catch (e) {
        setCustomers([]);
      }
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const totalPages = Math.ceil(customers.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [customers, currentPage, itemsPerPage]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa khách hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${USER_URL}/${id}`);
        toast.success("Đã xóa khách hàng!");
        setCustomers(customers.filter((cus) => cus._id !== id));
      } catch (e) {
        toast.error("Xóa thất bại!");
      }
    }
  };

  const handleSaveEdit = async () => {
    if (editForm.password && editForm.password !== editForm.confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }
    const updatePayload = {
      username: editForm.username,
      email: editForm.email,
    };
    if (editForm.password) updatePayload.password = editForm.password;

    try {
      await axios.put(`${USER_URL}/${editingCustomer._id}`, updatePayload);
      toast.success("Đã cập nhật thông tin!");
      setCustomers(
        customers.map((c) =>
          c._id === editingCustomer._id ? { ...c, ...updatePayload } : c
        )
      );
      setEditingCustomer(null);
    } catch (e) {
      toast.error("Cập nhật thất bại!");
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="items-center mb-4">
        <h1 className="text-xl font-semibold">Quản lý khách hàng</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow table-auto">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">#</th>
              <th className="p-4">Họ tên</th>
              <th className="p-4">Email</th>
              <th className="p-4">Ngày tạo</th>
              <th className="p-4">Thời gian</th>
              <th className="p-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex justify-center items-center min-h-[120px]">
                    <ClipLoader color="#36d7b7" size={48} />
                  </div>
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Chưa có khách hàng nào
                </td>
              </tr>
            ) : (
              currentCustomers.map((cus, idx) => (
                <tr key={cus._id} className="border-t align-top">
                  <td className="p-4">{indexOfFirstItem + idx + 1}</td>
                  <td className="p-4">{cus.username || cus.name}</td>
                  <td className="p-4">{cus.email}</td>
                  <td className="p-4 whitespace-nowrap">
                    {new Date(cus.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {new Date(cus.createdAt).toLocaleTimeString("vi-VN")}
                  </td>
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => {
                        setEditingCustomer(cus);
                        setEditForm({
                          username: cus.username,
                          email: cus.email,
                          password: "",
                          confirmPassword: "",
                        });
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(cus._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={customers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {editingCustomer && (
        <EditUserForm
          editForm={editForm}
          setEditForm={setEditForm}
          onSave={handleSaveEdit}
          onCancel={() => setEditingCustomer(null)}
        />
      )}
    </div>
  );
};
