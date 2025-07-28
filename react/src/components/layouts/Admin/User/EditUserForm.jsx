import React, { useState } from "react";

export const EditUserForm = ({ editForm, setEditForm, onSave, onCancel }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg min-w-[320px]">
        <h2 className="font-semibold text-lg mb-4">Sửa khách hàng</h2>
        <div className="mb-2">
          <label className="block font-medium mb-1">Họ tên</label>
          <input
            className="border rounded w-full p-2"
            value={editForm.username}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, username: e.target.value }))
            }
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Email</label>
          <input
            className="border rounded w-full p-2"
            value={editForm.email}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, email: e.target.value }))
            }
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Mật khẩu mới</label>
          <input
            className="border rounded w-full p-2"
            type={showPass ? "text" : "password"}
            value={editForm.password || ""}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, password: e.target.value }))
            }
            autoComplete="new-password"
            placeholder="Nhập mật khẩu mới"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Nhập lại mật khẩu</label>
          <input
            className="border rounded w-full p-2"
            type={showPass ? "text" : "password"}
            value={editForm.confirmPassword || ""}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, confirmPassword: e.target.value }))
            }
            autoComplete="new-password"
            placeholder="Nhập lại mật khẩu mới"
          />
        </div>
        <div className="mb-3">
          <input
            type="checkbox"
            checked={showPass}
            onChange={(e) => setShowPass(e.target.checked)}
          />
          <span className="ml-2 text-sm">Hiện mật khẩu</span>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={onSave}
          >
            Lưu
          </button>
          <button className="bg-gray-300 px-4 py-1 rounded" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};
