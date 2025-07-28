import React, { useEffect, useState } from "react";
import axios from "axios";
import { ORDER_URL } from "../../../../api/api";
import { useAuth } from "../../../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUser } = useAuth();
  const email = getUser()?.email || "";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(ORDER_URL, {
          headers: token ? { Authorization: "Bearer " + token } : {},
        });
        setOrders(res.data.filter((o) => o.email === email));
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    if (email) fetchOrders();
    // eslint-disable-next-line
  }, [email]);

  const paymentLabel = (method) => {
    if (!method) return "";
    if (method.toLowerCase() === "cod") return "COD";
    if (method.toLowerCase() === "vnpay") return "VNPAY";
    return method.toUpperCase();
  };

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
        return "text-purple-600";
      case "da_nhan_hang":
        return "text-green-600";
      case "da_huy":
        return "text-red-500";
      default:
        return "text-gray-600";
    }
  };

  const handleMarkAsReceived = async (orderId) => {
    if (!token) {
      toast.error("Bạn cần đăng nhập để xác nhận.");
      return;
    }
    try {
      await axios.patch(
        `${ORDER_URL}/${orderId}/status`,
        { status: "da_nhan_hang" },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      toast.success("Đã xác nhận nhận hàng!");
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "da_nhan_hang" } : o
        )
      );
    } catch {
      toast.error("Xác nhận nhận hàng thất bại!");
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="font-semibold mb-4">Đơn hàng của bạn</h2>
      <table className="min-w-full table-auto border rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Khách hàng</th>
            <th className="px-4 py-2">Sản phẩm</th>
            <th className="px-4 py-2">Thanh toán</th>
            <th className="px-4 py-2">Ngày tạo</th>
            <th className="px-4 py-2">Tổng tiền</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-500">
                Đang tải...
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-500">
                Bạn chưa có đơn hàng nào.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="px-4 py-2">
                  {order.shippingAddress?.name || "Ẩn danh"}
                </td>
                <td className="px-4 py-2">
                  {order.cart && order.cart.length > 0
                    ? order.cart.map((item, idx) => (
                        <div key={idx}>
                          {item.name} x{item.quantity}
                        </div>
                      ))
                    : ""}
                </td>
                <td className="px-4 py-2">
                  {paymentLabel(order.paymentMethod)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                    : ""}
                </td>
                <td className="px-4 py-2">
                  {(order.subtotal || 0).toLocaleString("vi-VN")}₫
                </td>
                <td
                  className={
                    "px-4 py-2 font-semibold " + statusColor(order.status)
                  }
                >
                  {statusLabel(order.status)}
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => {
                        Swal.fire({
                          title: "Chi tiết đơn hàng",
                          html: `
                                <div style="text-align:left;">
                                <b>Mã đơn:</b> ${order._id}<br/>
                                <b>Sản phẩm:</b><br/>
                                ${order.cart
                                  .map(
                                    (item) =>
                                      `- ${item.name} x${item.quantity || 1}`
                                  )
                                  .join("<br/>")}
                                <br/>
                                <b>Ngày tạo:</b> ${
                                  order.createdAt
                                    ? new Date(
                                        order.createdAt
                                      ).toLocaleDateString("vi-VN")
                                    : ""
                                }<br/>
                                <b>Trạng thái:</b> ${statusLabel(
                                  order.status
                                )}<br/>
                                <b>Tổng tiền:</b> ${(
                                  order.subtotal || 0
                                ).toLocaleString("vi-VN")}₫
                                </div>
                            `,
                          confirmButtonText: "Đóng",
                        });
                      }}
                    >
                      Xem
                    </button>
                    {order.status === "dang_giao_hang" && (
                      <button
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => handleMarkAsReceived(order._id)}
                      >
                        Nhận hàng
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
