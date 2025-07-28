import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ORDER_URL } from "../../api/api";

const statusLabel = (status) => {
  switch (status) {
    case "cho_xac_nhan":
      return "Chờ xác nhận";
    case "da_xac_nhan":
      return "Đã xác nhận";
    case "dang_giao_hang":
      return "Đang giao hàng";
    case "da_nhan_hang":
      return "Đã nhận hàng";
    case "da_huy":
      return "Đã huỷ";
    default:
      return status;
  }
};

const statusColor = (status) => {
  switch (status) {
    case "cho_xac_nhan":
      return "text-yellow-500";
    case "da_xac_nhan":
      return "text-blue-500";
    case "dang_giao_hang":
      return "text-purple-500";
    case "da_nhan_hang":
      return "text-green-600";
    case "da_huy":
      return "text-red-500";
    default:
      return "text-gray-600";
  }
};

const paymentLabel = (method) => {
  if (!method) return "";
  if (method.toLowerCase() === "cod") return "COD";
  if (method.toLowerCase() === "vnpay") return "VNPAY";
  return method.toUpperCase();
};

export const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(ORDER_URL);
      setOrders(res.data);
    } catch (err) {
      setOrders([]);
      toast.error("Không thể lấy danh sách đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleView = (order) => {
    Swal.fire({
      title: "Chi tiết đơn hàng",
      html: `
        <div style="text-align:left;">
          <b>Mã đơn:</b> ${order._id}<br/>
          <b>Sản phẩm:</b><br/>
          ${order.cart
            ?.map((p) => `- ${p.name} x${p.quantity || 1}`)
            .join("<br/>")}
          <br/>
          <b>Ngày tạo:</b> ${
            order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("vi-VN")
              : ""
          }<br/>
          <b>Trạng thái:</b> ${statusLabel(order.status)}<br/>
          <b>Tổng tiền:</b> ${(order.subtotal || 0).toLocaleString("vi-VN")}₫
        </div>
      `,
      confirmButtonText: "Đóng",
      showDenyButton: true,
      denyButtonText: "Download",
    }).then((result) => {
      if (result.isDenied) {
        const content = [
          `Mã đơn: ${order._id}`,
          "Sản phẩm:",
          ...(order.cart || []).map(
            (item) => `- ${item.name} x${item.quantity || 1}`
          ),
          `Ngày tạo: ${
            order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("vi-VN")
              : ""
          }`,
          `Trạng thái: ${statusLabel(order.status)}`,
          `Tổng tiền: ${(order.subtotal || 0).toLocaleString("vi-VN")}₫`,
        ].join("\n");

        // Tạo file và tải về
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `order_${order._id}.txt`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 0);
      }
    });
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }
    try {
      await axios.patch(
        `${ORDER_URL}/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
      fetchOrders();
    } catch {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  const handleCancel = async (orderId) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn hủy đơn hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hủy đơn",
      cancelButtonText: "Không",
      confirmButtonColor: "#d33",
    });
    if (result.isConfirmed) {
      await handleUpdateStatus(orderId, "da_huy");
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Quản lý đơn hàng</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow table-auto">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">Khách hàng</th>
              <th className="p-4">Sản phẩm</th>
              <th className="p-4">Thanh toán</th>
              <th className="p-4">Ngày tạo</th>
              <th className="p-4">Tổng tiền</th>
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
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Không có đơn hàng nào.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-4">
                    {order.shippingAddress?.name ||
                      order.shippingAddress?.email ||
                      ""}
                  </td>
                  <td className="p-4">
                    <div>
                      {order.cart && order.cart.length > 0
                        ? order.cart.map((item, idx) => (
                            <div key={idx}>
                              {item.name} x{item.quantity || 1}
                            </div>
                          ))
                        : ""}
                    </div>
                  </td>
                  <td className="p-4">{paymentLabel(order.paymentMethod)}</td>
                  <td className="p-4 whitespace-nowrap">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                      : ""}
                  </td>
                  <td className="p-4">
                    {(order.subtotal || 0).toLocaleString("vi-VN")}₫
                  </td>
                  <td
                    className={`p-4 font-semibold ${statusColor(order.status)}`}
                  >
                    {statusLabel(order.status)}
                  </td>
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleView(order)}
                    >
                      Xem
                    </button>

                    {order.status === "cho_xac_nhan" && (
                      <button
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() =>
                          handleUpdateStatus(order._id, "dang_giao_hang")
                        }
                      >
                        Xác nhận
                      </button>
                    )}

                    {(order.status === "cho_xac_nhan" ||
                      order.status === "dang_giao_hang") && (
                      <button
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleCancel(order._id)}
                      >
                        Hủy
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
