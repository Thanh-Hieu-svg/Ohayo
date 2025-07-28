import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import { BACKEND_URL } from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { CartSummary } from "../../components/layouts/User/Cart/CartSummary";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const [discountCode, setDiscountCode] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const grandTotal = subtotal;

  const handleQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId: id, quantity: newQuantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const handleApplyDiscount = () => {};

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/shippingaddress");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-8 text-center">Giỏ hàng</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-700 border-b border-gray-400">
                <th className="py-3 px-6">Sản phẩm</th>
                <th className="py-3 px-6">Giá</th>
                <th className="py-3 px-6">Số lượng</th>
                <th className="py-3 px-6">Tổng</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    Chưa có sản phẩm trong giỏ hàng.
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr
                    key={item.product._id}
                    className="border-b border-gray-400"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.product.images[0]?.startsWith("http")
                              ? item.product.images[0]
                              : `${BACKEND_URL}${item.product.images[0]}`
                          }
                          alt={item.product.name}
                          className="w-16 h-16 object-contain"
                        />
                        <div>
                          <p className="font-semibold">{item.product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      {Number(item.product.price).toLocaleString("vi-VN")}₫
                    </td>
                    <td className="p-6">
                      <div className="flex items-center border rounded-md w-fit px-2 py-1">
                        <button
                          className="px-2 text-lg"
                          onClick={() =>
                            handleQuantity(item.product._id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="px-2 text-lg"
                          onClick={() =>
                            handleQuantity(item.product._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-6">
                      {(item.product.price * item.quantity).toLocaleString(
                        "vi-VN"
                      )}
                      ₫
                    </td>
                    <td className="p-6">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemove(item.product._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <CartSummary
          subtotal={subtotal}
          grandTotal={grandTotal}
          cartItems={cartItems}
          onCheckout={handleCheckout}
          discountCode={discountCode}
          onDiscountChange={handleDiscountChange}
          onApplyDiscount={handleApplyDiscount}
        />
      </div>
    </div>
  );
};
