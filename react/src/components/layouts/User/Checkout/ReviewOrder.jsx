import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCreditCard,
  faFileInvoice,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { CartSummary } from "../Cart/CartSummary";
import { ORDER_URL, VNPAY_URL, BACKEND_URL } from "../../../../api/api";
import { toast } from "react-toastify";
import { clearCart } from "../../../../redux/cartSlice";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";

export const ReviewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    shipping = {},
    paymentMethod = "",
    subtotal = 0,
    shippingFee = 0,
    discount = 0,
    grandTotal = 0,
  } = location.state || {};

  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);

  const { getUser } = useAuth();
  const email = getUser()?.email || "";

  const isValidOrder = () =>
    cartItems.length > 0 &&
    shipping?.name &&
    shipping?.address &&
    shipping?.phone &&
    email &&
    paymentMethod &&
    typeof subtotal === "number" &&
    typeof grandTotal === "number";

  // Đặt hàng COD
  const handlePlaceOrder = async () => {
    if (!isValidOrder()) {
      toast.error("Vui lòng điền đầy đủ thông tin đơn hàng!");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Bạn chưa đăng nhập.");
        setLoading(false);
        return;
      }
      const payload = {
        cart: cartItems.map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          images: item.product.images,
        })),
        shippingAddress: shipping,
        email,
        paymentMethod,
        subtotal,
        status: "pending",
      };

      await axios.post(`${ORDER_URL}/cod`, payload, {
        headers: { Authorization: "Bearer " + token },
      });

      dispatch(clearCart());
      toast.success("Đặt hàng thành công!");
      setTimeout(() => {
        navigate("/ordersuccess", {
          state: { shipping, paymentMethod, grandTotal },
        });
      }, 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Có lỗi khi đặt hàng!"
      );
    } finally {
      setLoading(false);
    }
  };

  // Đặt hàng VNPay
  const handleVNPayOrder = async () => {
    if (!isValidOrder()) {
      toast.error("Vui lòng điền đầy đủ thông tin đơn hàng!");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Bạn chưa đăng nhập.");
        setLoading(false);
        return;
      }
      const payload = {
        cart: cartItems.map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          images: item.product.images,
        })),
        shippingAddress: shipping,
        email,
        paymentMethod,
        subtotal,
        status: "waiting_payment",
        orderDesc: "Thanh toán đơn hàng GreenNest",
        amount: grandTotal,
      };

      const orderRes = await axios.post(`${ORDER_URL}/vnpay`, payload, {
        headers: { Authorization: "Bearer " + token },
      });

      const orderId = orderRes?.data?.order?._id;
      if (!orderId) {
        toast.error("Không lấy được orderId từ backend.");
        setLoading(false);
        return;
      }

      // 2. Tạo QR và redirect
      const { data } = await axios.post(
        `${VNPAY_URL}/create-qr`,
        {
          orderId,
          amount: grandTotal,
          orderDesc: "Thanh toán đơn hàng GreenNest",
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      if (!data.paymentUrl) {
        toast.error(data.error || "Có lỗi khi khởi tạo thanh toán VNPay!");
        setLoading(false);
        return;
      }

      dispatch(clearCart());
      window.location.href = data.paymentUrl;
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          err.message ||
          "Có lỗi khi khởi tạo thanh toán VNPay!"
      );
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-white z-50"
        style={{ minHeight: "100vh" }}
      >
        <ClipLoader color="#36d7b7" size={72} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold mb-8">Xem lại đơn hàng</h1>
          <div className="flex items-center justify-between max-w-2xl mb-8">
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 shadow-md text-green-400 mb-2">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <span className="font-medium text-green-400 ">Địa chỉ</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-green-400 mx-2"></div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 shadow-md text-green-400 mb-2">
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
              <span className="font-medium text-green-400">Thanh toán</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-green-400 mx-2"></div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 shadow-md text-green-400 mb-2">
                <FontAwesomeIcon icon={faFileInvoice} />
              </div>
              <span className="font-medium text-green-400">Xem lại</span>
            </div>
          </div>

          <div className="font-bold text-lg mb-4">
            Dự kiến giao:{" "}
            <span className="font-semibold text-xl">
              {new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("vi-VN")}
            </span>
          </div>

          <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Ảnh</th>
                <th className="px-4 py-3 font-semibold">Sản phẩm</th>
                <th className="px-4 py-3 font-semibold">Đơn giá</th>
                <th className="px-4 py-3 font-semibold">Số lượng</th>
                <th className="px-4 py-3 font-semibold">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-3 text-center">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={
                        item.product.images[0]?.startsWith("http")
                          ? item.product.images[0]
                          : `${BACKEND_URL}${item.product.images[0]}`
                      }
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                  </td>
                  <td className="px-4 py-3">{item.product.name}</td>
                  <td className="px-4 py-3">
                    {item.product.price.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="px-4 py-3 text-center">{item.quantity}</td>
                  <td className="px-4 py-3 font-semibold">
                    {(item.product.price * item.quantity).toLocaleString(
                      "vi-VN"
                    )}
                    ₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-bold text-lg mb-1">Địa chỉ giao hàng</div>
              <div className="font-semibold">{shipping?.name}</div>
              <div className="text-gray-700">{shipping?.address}</div>
              <div className="text-gray-700">SĐT: {shipping?.phone}</div>
            </div>
            <button
              className="bg-gray-100 p-2 rounded-lg"
              onClick={() => navigate("/shippingaddress")}
              title="Chỉnh sửa"
              disabled={loading}
            >
              <FontAwesomeIcon icon={faEdit} className="text-gray-700" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-bold text-lg mb-1">
                Phương thức thanh toán
              </div>
              <div className="font-semibold">
                {paymentMethod === "cod"
                  ? "Thanh toán khi nhận hàng"
                  : paymentMethod === "vnpay"
                  ? "VNPay"
                  : "Không rõ"}
              </div>
            </div>
            <button
              className="bg-gray-100 p-2 rounded-lg"
              onClick={() =>
                navigate("/paymentmethod", {
                  state: { shipping, subtotal, shippingFee, grandTotal },
                })
              }
              title="Chỉnh sửa"
              disabled={loading}
            >
              <FontAwesomeIcon icon={faEdit} className="text-gray-700" />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[400px]">
          <CartSummary
            subtotal={subtotal}
            grandTotal={grandTotal}
            cartItems={cartItems}
            shippingFee={shippingFee}
            disableCheckout={cartItems.length === 0 || loading}
            checkoutButtonLabel={
              loading ? (
                <span className="flex items-center gap-2">
                  <ClipLoader color="#fff" size={20} />
                  Đang đặt hàng...
                </span>
              ) : (
                "Đặt hàng"
              )
            }
            onCheckout={
              paymentMethod === "cod" ? handlePlaceOrder : handleVNPayOrder
            }
          />
        </div>
      </div>
    </div>
  );
};
