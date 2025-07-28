import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { BLOG_URL } from "../../api/api";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(BLOG_URL);
        setBlogs(res.data);
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-semibold italic text-[#7CCF00] text-[20px]">
            Tin tức
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-6">
            Những cập nhật mới nhất về sản phẩm <br /> và xu hướng nội thất hiện
            đại
          </h2>

          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="w-28 h-1 bg-lime-500"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-28 h-1 bg-lime-500"></div>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-lg">Đang tải bài viết...</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                Chưa có bài viết nào.
              </div>
            ) : (
              blogs.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={
                      post.thumbnailUrl ||
                      "https://source.unsplash.com/800x600/?interior,design"
                    }
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <div className="text-sm text-gray-500 flex items-center gap-4 mb-4">
                      <span>
                        <FontAwesomeIcon icon={faUser} className="mr-1" />
                        {post.author}
                      </span>
                      <span>
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="mr-1"
                        />
                        {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {post.content.length > 120
                        ? post.content.slice(0, 120) + "..."
                        : post.content}
                    </p>
                    <button
                      className="text-green-600 hover:underline font-medium"
                      onClick={() => navigate(`/blog/${post._id}`)}
                    >
                      Đọc thêm →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
