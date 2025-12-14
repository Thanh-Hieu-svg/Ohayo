import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import FlashDealImage from "../../../assets/images/Banner/carousel-3.jpg";
import { useNavigate } from "react-router-dom";

export const FlashDeal = () => {
  const features = [
    "Thực phẩm sạch và an toàn",
    "Sản phẩm hữu cơ đạt chuẩn",
    "Đa dạng mặt hàng thân thiện môi trường",
    "Góp phần bảo vệ sức khỏe và hành tinh",
  ];

  const Navigate = useNavigate();

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden text-white font-sans mb-20">
      <img
        src={FlashDealImage}
        alt="Siêu Thị Xanh"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: "rgba(136, 180, 78, 0.85)" }}
      />

      <div className="container absolute inset-0 z-20 flex items-center px-6 md:px-20">
        <div className="w-[700px] space-y-6">
          <h2 className="text-3xl md:text-[42px] font-playfair font-bold leading-snug text-white">
            <span className="text-[#252c30]">Siêu Thị Xanh – </span>
            <span className="text-white">
              Thực phẩm sạch <span className="text-[#252c30]">và</span> bền vững
            </span>
          </h2>

          <p className="font-playfair italic text-xl font-medium text-white leading-relaxed">
            Siêu Thị Xanh cam kết mang đến thực phẩm sạch, an toàn và thân thiện
            với môi trường. Chúng tôi đồng hành cùng bạn trong hành trình xây
            dựng lối sống xanh và bền vững.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-white text-[#88b44e] rounded-full p-4">
                  <FaCheck />
                </div>
                <span className="text-[#252c30] text-base px-2">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => Navigate("/blog")}
            className="bg-white text-[#252c30] px-8 py-4 rounded-full font-semibold w-fit hover:bg-gray-200 transition"
          >
            Khám Phá Thêm
          </button>
        </div>

        {/* Nút Play */}
        <div className="mx-auto hidden md:flex items-center justify-center">
          <div className="relative w-[100px] h-[100px] flex items-center justify-center">
            <span className="radar-wave"></span>
            <span className="radar-wave delay-1"></span>
            <span className="radar-wave delay-2"></span>
            <div className="bg-white w-[100px] h-[100px] rounded-full flex items-center justify-center shadow-lg z-10 relative animate-heartbeat">
              <FaPlay className="text-[#88b44e] text-3xl ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
