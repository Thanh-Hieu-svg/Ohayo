import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../api/api";
import { RecommendedProducts } from "../../components/layouts/User/Products/RecommendedProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { ClipLoader } from "react-spinners";

export const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const images = product?.images || [];
  const intervalRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Không thể tải chi tiết sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product || !images.length) return;
    intervalRef.current = setInterval(() => {
      const newIdx = (currentIndex + 1) % images.length;
      setNextIndex(newIdx);
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(newIdx);
        setIsFading(false);
        setNextIndex(null);
      }, 600);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [product, currentIndex, images.length]);

  const handleThumb = (idx) => {
    clearInterval(intervalRef.current);
    if (currentIndex === idx) return;
    setNextIndex(idx);
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsFading(false);
      setNextIndex(null);
    }, 600);
  };

  const getImgSrc = (img) =>
    img?.startsWith("http") ? img : `${BACKEND_URL}${img}`;

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
  if (error)
    return (
      <p className="text-red-500 text-center my-8 min-h-screen flex items-center justify-center">
        {error}
      </p>
    );
  if (!product || !images.length)
    return (
      <p className="text-center my-8 min-h-screen flex items-center justify-center">
        Sản phẩm không tồn tại.
      </p>
    );

  return (
    <div className="w-full min-h-screen bg-white py-16">
      <div className="container pt-16 flex flex-col md:flex-row gap-8 justify-center items-start px-4">
        <div className="flex flex-col items-center w-full max-w-[600px]">
          <div className="relative border border-gray-300 bg-white w-[500px] h-[500px] flex items-center justify-center mb-8 overflow-hidden">
            <img
              src={getImgSrc(images[currentIndex])}
              alt={product.name}
              className={`object-contain w-full h-full absolute left-0 top-0 transition-all duration-600 ease-in-out transform ${
                isFading ? "opacity-0 z-10" : "opacity-100 z-20"
              } hover:scale-95`}
              draggable={false}
            />
            {nextIndex !== null && (
              <img
                src={getImgSrc(images[nextIndex])}
                alt={product.name}
                className={`object-contain w-full h-full absolute left-0 top-0 transition-all duration-600 ease-in-out transform ${
                  isFading ? "opacity-100 z-20" : "opacity-0 z-10"
                } hover:scale-95`}
                draggable={false}
              />
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-5">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`w-[110px] h-[110px] border-2 rounded-lg bg-white cursor-pointer transition-all duration-300 overflow-hidden flex items-center justify-center ${
                  currentIndex === idx
                    ? "border-orange-500"
                    : "border-gray-200 hover:border-orange-300"
                }`}
                onClick={() => handleThumb(idx)}
              >
                <img
                  src={getImgSrc(img)}
                  alt={`Thumbnail ${idx + 1}`}
                  className="object-contain w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-95"
                  style={{
                    transform:
                      currentIndex === idx ? "scale(0.96)" : "scale(1)",
                  }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 max-w-[700px]">
          <h1 className="text-[2rem] font-bold mb-4 text-[#171717] leading-tight">
            {product.name}
          </h1>
          <div className="mb-4 flex items-center gap-6">
            <span className="text-lg text-gray-500">SKU: {product.sku}</span>
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                product.status === "outofstock"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {product.status === "outofstock" ? "Hết hàng" : "Còn hàng"}
            </span>
          </div>
          <div className="flex items-center mb-4 gap-2">
            <div className="text-xl text-yellow-400">★★★★★</div>
            <span className="text-base text-gray-500">(121 Reviews)</span>
          </div>
          <div className="mb-4">
            <span className="text-3xl font-bold text-[#C50017]">
              {Number(product.price).toLocaleString("vi-VN")} VND
            </span>
          </div>
          <div className="mb-8 text-gray-700 text-base leading-relaxed">
            {product.description}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center h-12 border rounded-lg overflow-hidden">
              <button
                className="w-10 h-full text-lg font-bold hover:bg-gray-100 cursor-pointer transform transition-transform duration-300 hover:scale-95 active:scale-90"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="w-12 text-center text-base">{quantity}</span>
              <button
                className="w-10 h-full text-lg font-bold hover:bg-gray-100 cursor-pointer transform transition-transform duration-300 hover:scale-95 active:scale-90"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              disabled={product.status === "outofstock"}
              className={`h-12 px-16 text-white rounded font-semibold text-base transform transition-transform duration-300 ease-in-out ${
                product.status === "outofstock"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#ff6a00] hover:bg-[#e95e00] cursor-pointer hover:scale-95 active:scale-90"
              }`}
              onClick={() => {
                if (product.status === "outofstock") return;
                dispatch(addToCart({ product, quantity }));
              }}
            >
              {product.status === "outofstock" ? "HẾT HÀNG" : "THÊM VÀO GIỎ"}
            </button>
          </div>
        </div>
      </div>
      <RecommendedProducts product={product} />
    </div>
  );
};
