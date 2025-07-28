import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { BLOG_URL } from "../../api/api";
import { CreateBlogForm } from "../../components/layouts/Admin/Blog/CreateBlogForm";
import { EditBlogForm } from "../../components/layouts/Admin/Blog/EditBlogForm";
import { Pagination } from "../../components/common/Pagination";

export const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BLOG_URL);
      setBlogs(res.data);
    } catch (error) {
      setBlogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEditBlog = (blog) => {
    setEditBlog(blog);
    setShowEditModal(true);
  };

  const handleDeleteBlog = async (id) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BLOG_URL}/${id}`);
        toast.success("Xóa bài viết thành công!");
        fetchBlogs();
      } catch (err) {
        toast.error("Lỗi khi xóa bài viết!");
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [blogs, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Quản lý Blog</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer flex items-center gap-2"
          aria-label="Thêm bài viết mới"
          onClick={() => setShowCreateModal(true)}
        >
          Thêm bài viết
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow table-auto">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">Tiêu đề</th>
              <th className="p-4">Ảnh </th>
              <th className="p-4">Tác giả</th>
              <th className="p-4">Mô tả</th>
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
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Chưa có bài viết nào
                </td>
              </tr>
            ) : (
              currentBlogs.map((blog) => (
                <tr key={blog._id} className="border-t align-top">
                  <td className="p-4 font-semibold max-w-xs">{blog.title}</td>
                  <td className="p-4">
                    <img
                      src={blog.thumbnailUrl}
                      alt={blog.title}
                      className="w-24 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="p-4">{blog.author}</td>
                  <td
                    className="p-4 max-w-[280px] truncate"
                    title={blog.content}
                  >
                    {blog.content}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {new Date(blog.createdAt).toLocaleString("vi-VN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleEditBlog(blog)}
                    >
                      Sửa
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDeleteBlog(blog._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={blogs.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {showCreateModal && (
        <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center ">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <CreateBlogForm
              onSuccess={() => {
                fetchBlogs();
                setShowCreateModal(false);
              }}
              onClose={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}

      {showEditModal && editBlog && (
        <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <EditBlogForm
              blog={editBlog}
              onSuccess={() => {
                fetchBlogs();
                setShowEditModal(false);
                setEditBlog(null);
              }}
              onClose={() => {
                setShowEditModal(false);
                setEditBlog(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
