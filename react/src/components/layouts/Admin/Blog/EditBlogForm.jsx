import React, { useState } from "react";
import axios from "axios";
import { BLOG_URL } from "../../../../api/api";
import { toast } from "react-toastify";

export const EditBlogForm = ({ blog, onSuccess, onClose }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [author, setAuthor] = useState(blog.author);
  const [thumbnailUrl, setThumbnailUrl] = useState(blog.thumbnailUrl);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BLOG_URL}/${blog._id}`, {
        title,
        content,
        author,
        thumbnailUrl,
      });
      toast.success("Cập nhật bài viết thành công!");
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      toast.error(
        "Lỗi khi cập nhật: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block font-medium mb-1">Tiêu đề</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Nội dung</label>
        <textarea
          rows={6}
          className="border rounded px-3 py-2 w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Tác giả</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">URL ảnh đại diện</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Cập nhật
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};
