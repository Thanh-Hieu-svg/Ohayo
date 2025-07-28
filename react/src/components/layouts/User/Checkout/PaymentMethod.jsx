import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCreditCard,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { CartSummary } from "../Cart/CartSummary";
import { useSelector } from "react-redux";

export const PaymentMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const shipping = location.state?.shipping || {};
  const subtotal = location.state?.subtotal || 0;
  const shippingFee = location.state?.shippingFee || 0;
  const grandTotal = location.state?.grandTotal || 0;

  const cartItems = useSelector((state) => state.cart.items);

  // Chỉ cho phép chọn COD hoặc VNPay
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleApplyDiscount = () => {
    if (discountCode === "SALE10") {
      setAppliedDiscount(10000);
    } else {
      setAppliedDiscount(0);
    }
  };

  const handleContinue = () => {
    navigate("/revieworder", {
      state: {
        shipping,
        paymentMethod,
        subtotal,
        shippingFee,
        discount: appliedDiscount,
        grandTotal: grandTotal - appliedDiscount,
      },
    });
  };

  return (
    <div className="bg-white min-h-screen mt-10">
      <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold mb-8">
            Phương thức thanh toán
          </h1>
          <div className="flex items-center justify-between max-w-2xl mb-8">
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 shadow-md text-green-400 mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <span className="font-medium text-green-400">Địa chỉ</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-green-300 mx-2"></div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 shadow-md text-green-400 mb-2">
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
              <span className="font-medium text-green-400">Phương thức</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-2">
                <FontAwesomeIcon icon={faReceipt} />
              </div>
              <span className="font-medium text-gray-400">Xem lại</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-2 font-semibold">Thông tin giao hàng:</div>
            <div className="mb-1">Họ tên: {shipping?.name}</div>
            <div className="mb-1">SĐT: {shipping?.phone}</div>
            <div className="mb-1">Địa chỉ: {shipping?.address}</div>
          </div>

          <form className="space-y-6">
            <div className="border-t pt-6 space-y-4">
              <label className="flex items-center gap-2 font-semibold text-lg">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  className="accent-black w-5 h-5"
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentChange}
                />
                Thanh toán khi nhận hàng (COD)
              </label>
              <label className="flex items-center gap-2 font-semibold text-lg">
                <input
                  type="radio"
                  name="payment"
                  value="vnpay"
                  className="accent-black w-5 h-5"
                  checked={paymentMethod === "vnpay"}
                  onChange={handlePaymentChange}
                />
                Thanh toán VNPay
              </label>
            </div>
          </form>
        </div>

        <CartSummary
          subtotal={subtotal}
          grandTotal={grandTotal - appliedDiscount}
          cartItems={cartItems}
          shippingFee={shippingFee}
          disableCheckout={cartItems.length === 0}
          checkoutButtonLabel="Tiếp tục"
          onCheckout={handleContinue}
          discountCode={discountCode}
          onDiscountChange={(e) => setDiscountCode(e.target.value)}
          onApplyDiscount={handleApplyDiscount}
        />
      </div>
    </div>
  );
};
