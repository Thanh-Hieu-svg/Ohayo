import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../api/api";
import { toast } from "react-toastify";

// Simple Pagination component
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

export const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/contacts`);
      setContacts(res.data);
    } catch (err) {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(contacts.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [contacts, currentPage, itemsPerPage]);

  const handleMarkRead = async (id) => {
    try {
      await axios.patch(`${BACKEND_URL}/api/contacts/${id}`, { isRead: true });
      toast.success("Đã đánh dấu là đã đọc!");
      fetchContacts();
    } catch (err) {
      toast.error("Lỗi khi cập nhật trạng thái!");
    }
  };

  const handleView = (contact) => {
    navigate(`/admin/contact-detail/${contact._id}`, { state: { contact } });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Quản lý liên hệ</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow table-auto">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">Họ tên</th>
              <th className="p-4">Email</th>
              <th className="p-4">SĐT</th>
              <th className="p-4">Chủ đề</th>
              <th className="p-4">Ngày gửi</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : currentContacts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Không có liên hệ nào.
                </td>
              </tr>
            ) : (
              currentContacts.map(
                (
                  { _id, name, email, phone, subject, message, sentAt, isRead },
                  idx
                ) => (
                  <tr key={_id} className="border-t align-top">
                    <td className="p-4">{name}</td>
                    <td className="p-4">{email}</td>
                    <td className="p-4">{phone}</td>
                    <td className="p-4">{subject}</td>
                    <td className="p-4">
                      {new Date(sentAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td
                      className={`p-4 font-semibold ${
                        isRead ? "text-green-600" : "text-yellow-500"
                      }`}
                    >
                      {isRead ? "Đã đọc" : "Chưa đọc"}
                    </td>
                    <td className="p-4 flex flex-col gap-2">
                      <button
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 w-[85px]"
                        onClick={() =>
                          handleView({
                            _id,
                            name,
                            email,
                            phone,
                            subject,
                            message,
                            sentAt,
                            isRead,
                          })
                        }
                      >
                        Xem
                      </button>
                      {!isRead && (
                        <button
                          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 w-[85px]"
                          onClick={() => handleMarkRead(_id)}
                        >
                          Đánh dấu
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={contacts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
