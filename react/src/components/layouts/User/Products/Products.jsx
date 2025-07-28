import React from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../../api/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/cartSlice";

export const Products = ({ products = [], gridClass, variant }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isChatbot = variant === "chatbot";
  const defaultGrid = isChatbot
    ? "grid-cols-2 gap-2"
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
  const itemClass = isChatbot
    ? "bg-white rounded-xl p-2 flex flex-col items-center border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer w-full min-w-[110px] max-w-[120px]"
    : "bg-white rounded-xl p-6 flex flex-col items-center border border-gray-200 transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-[1.02] cursor-pointer max-w-[270px] max-h-[382px] ";
  const imgClass = isChatbot
    ? "w-12 h-12 object-contain mb-1"
    : "w-full h-48 object-contain mb-4";
  const nameClass = isChatbot
    ? "font-semibold text-xs mb-1 text-center line-clamp-2"
    : "font-semibold text-base mb-1 text-center";
  const priceClass = isChatbot
    ? "font-bold text-[13px] text-[#212121]"
    : "font-bold text-lg text-[#212121]";
  const btnClass = isChatbot
    ? "mt-auto h-7 w-full text-white text-xs rounded font-semibold"
    : "mt-auto h-10 min-w-[120px] text-white text-sm rounded-md font-semibold";

  return (
    <div className={`grid ${gridClass || defaultGrid}`}>
      {products.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 py-3">
          Không có sản phẩm nào.
        </div>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className={itemClass}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
              src={`${BACKEND_URL}${product.images[0]}`}
              alt={product.name}
              className={imgClass}
            />
            <div className={nameClass}>{product.name}</div>
            <div className="text-gray-600 text-[11px] mb-1 text-center">
              Số lượng: {product.stock}
            </div>
            <div className="flex gap-1 items-center justify-center mb-1">
              <span className={priceClass}>
                {Number(product.price).toLocaleString("vi-VN")} VND
              </span>
              {product.oldPrice && (
                <span className="line-through text-gray-400 text-xs">
                  {Number(product.oldPrice).toLocaleString("vi-VN")} VND
                </span>
              )}
            </div>
            <button
              disabled={product.status === "outofstock"}
              className={`${btnClass} ${
                product.status === "outofstock"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-400 cursor-pointer hover:scale-95 active:scale-90"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (product.status === "outofstock") return;
                dispatch(addToCart({ product, quantity: 1 }));
              }}
            >
              {product.status === "outofstock" ? "HẾT HÀNG" : "MUA NGAY"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};
