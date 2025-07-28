import React, { useEffect, useState } from "react";

export const ProfileInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) return <div>Đang tải...</div>;

  const avatar = user.avatar || null;
  const firstChar = user.name ? user.name.charAt(0).toUpperCase() : "";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-6 mb-6">
        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border-2 border-[#88b44e] object-cover"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-[#88b44e] bg-gray-200 text-3xl font-bold">
            {firstChar}
          </div>
        )}
        <div>
          <h3 className="text-2xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <p className="font-medium">Số điện thoại:</p>
          <p>
            {user.phone || <span className="text-gray-400">Chưa cập nhật</span>}
          </p>
        </div>
        <div>
          <p className="font-medium">Địa chỉ:</p>
          <p>
            {user.address || (
              <span className="text-gray-400">Chưa cập nhật</span>
            )}
          </p>
        </div>
        <div>
          <p className="font-medium">Tên đăng nhập:</p>
          <p>
            {user.username || (
              <span className="text-gray-400">Chưa cập nhật</span>
            )}
          </p>
        </div>
        <div>
          <p className="font-medium">Giới tính:</p>
          <p>
            {user.gender || (
              <span className="text-gray-400">Chưa cập nhật</span>
            )}
          </p>
        </div>
        <div>
          <p className="font-medium">Ngày sinh:</p>
          <p>
            {user.birthday || (
              <span className="text-gray-400">Chưa cập nhật</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
