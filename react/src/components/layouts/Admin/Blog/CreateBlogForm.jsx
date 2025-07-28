import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BLOG_URL } from "../../../../api/api";

export const CreateBlogForm = ({ onSuccess, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BLOG_URL, { title, content, author, thumbnailUrl });
      toast.success("Thêm bài viết mới thành công!");
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      toast.error(
        "Lỗi khi thêm blog: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-2">Thêm bài viết mới</h2>
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
          placeholder="https://..."
        />
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Lưu
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
