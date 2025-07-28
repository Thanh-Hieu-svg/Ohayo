import React from "react";

export const CartSummary = ({
  subtotal,
  grandTotal,
  cartItems = [],
  onCheckout,
  discountCode,
  onDiscountChange,
  onApplyDiscount,
  shippingFee = 0,
  applyButtonLabel = "Apply",
  checkoutButtonLabel = "Thanh toán",
  disableCheckout = false,
}) => {
  return (
    <div className="w-full lg:w-[350px] lg:h-[350px] border border-gray-200 p-6 rounded-lg shadow-md bg-white">
      {/* Tổng số tiền */}
      <div className="flex justify-between mb-4 text-lg font-semibold text-gray-800">
        <span>Số tiền</span>
        <span>{subtotal.toLocaleString("vi-VN")}₫</span>
      </div>

      {/* Mã giảm giá */}
      <div className="mb-4">
        <label className="block text-sm mb-1 text-gray-600">Mã giảm giá</label>
        <div className="flex">
          <input
            type="text"
            className="flex-1 border border-green-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Mã giảm giá"
            value={discountCode}
            onChange={onDiscountChange}
          />
          <button
            className="bg-green-500 text-white px-5 py-2 rounded-r-lg hover:bg-green-600 transition duration-300"
            onClick={onApplyDiscount}
            type="button"
          >
            {applyButtonLabel}
          </button>
        </div>
      </div>

      {/* Phí giao hàng */}
      <div className="flex justify-between mb-2 text-gray-700">
        <span>Phí giao hàng</span>
        <span>{shippingFee.toLocaleString("vi-VN")}₫</span>
      </div>

      {/* Tổng tiền */}
      <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-4 text-gray-900">
        <span>Tổng tiền</span>
        <span>{grandTotal.toLocaleString("vi-VN")}₫</span>
      </div>

      {/* Nút thanh toán */}
      <button
        className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 hover:shadow-lg hover:scale-105"
        onClick={onCheckout}
        disabled={disableCheckout || cartItems.length === 0}
        style={
          disableCheckout || cartItems.length === 0
            ? { opacity: 0.5, cursor: "not-allowed" }
            : {}
        }
      >
        {checkoutButtonLabel}
      </button>
    </div>
  );
};
