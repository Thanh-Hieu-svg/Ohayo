import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCreditCard,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import { CartSummary } from "../Cart/CartSummary";

export const ShippingAddress = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingFee = 0;
  const grandTotal = subtotal + shippingFee;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setError("");
    navigate("/paymentmethod", {
      state: {
        shipping: { name, phone, address },
        subtotal,
        shippingFee,
        grandTotal,
      },
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold mb-8">Địa chỉ giao hàng</h1>
          <div className="flex items-center justify-between max-w-2xl mb-8">
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 shadow-md text-green-400 mb-2">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <span className="font-medium text-green-400">Địa chỉ</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-2">
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
              <span className="font-medium text-gray-400">Thanh toán</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-2">
                <FontAwesomeIcon icon={faFileInvoice} />
              </div>
              <span className="font-medium text-gray-400">Xác nhận</span>
            </div>
          </div>
          <div className="mt-10">
            <div className="font-semibold text-lg mb-4">Thêm địa chỉ mới</div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-1">Họ tên</label>
                <input
                  type="text"
                  placeholder="Nhập họ tên"
                  className="w-full border border-gray-400 rounded-lg px-4 py-3 text-base focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="number"
                  placeholder="Nhập số điện thoại"
                  className="w-full border border-gray-400 rounded-lg px-4 py-3 text-base focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Địa chỉ nhận hàng
                </label>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ"
                  className="w-full border border-gray-400 rounded-lg px-4 py-3 text-base focus:outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </form>
          </div>
        </div>

        <CartSummary
          subtotal={subtotal}
          grandTotal={grandTotal}
          cartItems={cartItems}
          shippingFee={shippingFee}
          disableCheckout={cartItems.length === 0}
          checkoutButtonLabel="Tiếp tục"
          onCheckout={handleSubmit}
        />
      </div>
    </div>
  );
};
