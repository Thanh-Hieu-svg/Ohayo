import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BLOG_URL } from "../../../../api/api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";

export const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BLOG_URL}/${id}`);
        setBlog(res.data);
      } catch (err) {
        toast.error("Không tìm thấy bài viết!");
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center text-lg">
        Đang tải bài viết...
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        {blog.title}
      </h1>

      <div className="flex items-center text-sm text-gray-500 mb-8 gap-4">
        <span>
          <FontAwesomeIcon icon={faUser} className="mr-1" />
          {blog.author}
        </span>
        <span>
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
          {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
        </span>
      </div>

      <img
        src={blog.thumbnailUrl || "https://source.unsplash.com/1000x500/?blog"}
        alt="Blog banner"
        className="rounded-lg mb-8 w-full object-cover"
      />

      <div className="prose prose-lg max-w-none text-gray-700">
        {blog.content.split("\n").map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </div>
  );
};
