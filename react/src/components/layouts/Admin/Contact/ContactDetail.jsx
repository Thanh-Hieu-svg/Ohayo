import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const ContactDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState(location.state?.contact || null);
  const [loading, setLoading] = useState(!location.state?.contact);

  useEffect(() => {
    if (!contact && id) {
      setLoading(true);
      axios
        .get(`${BACKEND_URL}/api/contacts/${id}`)
        .then((res) => {
          setContact(res.data);
        })
        .catch(() => {
          navigate("/contact-management", { replace: true });
        })
        .finally(() => setLoading(false));
    }
  }, [contact, id, navigate]);

  if (loading)
    return (
      <div className="text-center py-10">Đang tải thông tin liên hệ...</div>
    );
  if (!contact) return null;

  return (
    <div className="bg-white py-16 px-4 md:px-10 min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Thông Tin Liên Hệ Chi Tiết
        </h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold">Người liên hệ:</h4>
              <p>{contact.name}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold">Email:</h4>
              <p>{contact.email}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faPhone} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold">Số điện thoại:</h4>
              <p>{contact.phone}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-green-600"
              />
            </div>
            <div>
              <h4 className="font-semibold">Chủ đề:</h4>
              <p>{contact.subject || "—"}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold">Nội dung:</h4>
              <p>{contact.message}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold">Ngày gửi:</h4>
              <p>{new Date(contact.sentAt).toLocaleString("vi-VN")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
