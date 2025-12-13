import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BACKEND_URL } from "../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/contacts`, form);
      toast.success("Gửi liên hệ thành công!");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Gửi liên hệ thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="container py-16 px-4 md:px-10">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <p className="font-semibold italic text-[#7CCF00] text-[20px]">
            Liên hệ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-6">
            Nếu bạn có bất kỳ thắc mắc nào, <br /> hãy liên hệ với chúng tôi
          </h2>
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="w-28 h-1 bg-lime-500"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-28 h-1 bg-lime-500"></div>
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
          <div className="flex flex-col items-center">
            <div className="bg-green-100 rounded-full p-5 mb-4">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="2x"
                className="text-green-600"
              />
            </div>
            <p className="text-gray-700">info@example.com</p>
            <p className="text-gray-700">hotro@example.com</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-100 rounded-full p-5 mb-4">
              <FontAwesomeIcon
                icon={faPhone}
                size="2x"
                className="text-green-600"
              />
            </div>
            <p className="text-gray-700">+012 345 67890</p>
            <p className="text-gray-700">+012 345 67891</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-100 rounded-full p-5 mb-4">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size="2x"
                className="text-green-600"
              />
            </div>
            <p className="text-gray-700">123 Đường ABC</p>
            <p className="text-gray-700">Thành phố Hồ Chí Minh, Việt Nam</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Gửi thông tin liên hệ
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                name="phone"
                type="text"
                placeholder="Số điện thoại"
                className="w-full border border-gray-300 px-4 py-2 rounded"
                value={form.phone}
                onChange={handleChange}
              />
              <input
                name="subject"
                type="text"
                placeholder="Chủ đề"
                className="w-full border border-gray-300 px-4 py-2 rounded"
                value={form.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Nội dung"
                className="w-full border border-gray-300 px-4 py-2 rounded"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                {loading ? "Đang gửi..." : "Gửi liên hệ"}
              </button>
            </form>
          </div>

          {/* Google Maps */}
          <div className="h-[400px] w-full">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.3651338658146!2d106.69204877512936!3d10.859808157650047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529c17978287d%3A0xec48f5a17b7d5741!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ3V54buFbiBU4bqldCBUaMOgbmggLSBDxqEgc-G7nyBxdeG6rW4gMTI!5e0!3m2!1svi!2s!4v1765606510283!5m2!1svi!2s"
              className="w-full h-full border rounded"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
