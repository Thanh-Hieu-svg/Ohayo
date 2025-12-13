import React from "react";
import Article_bg from "../../../assets/images1059758_1_trang_3.gif";

export const Article = () => {
  return (
    <div className="bg-white py-20">
      <div className="container flex items-center justify-center px-6 md:px-20 py-12">
        {/* Hình ảnh */}
        <div className="md:w-[550px] w-full">
          <img
            src={Article_bg}
            alt="Siêu Thị Xanh"
            className="w-[500px] h-[500px] object-cover"
          />
        </div>

        {/* Nội dung bài viết */}
        <div className="w-[582px]">
          <p className="text-[#88b44e] font-semibold italic mb-4 text-xl">
            Bài Viết Nổi Bật
          </p>
          <h2 className="font-playfair text-[#252c30] text-3xl md:text-[40px] font-bold mb-4 leading-snug">
            Hành trình phát triển của Siêu Thị Xanh
          </h2>
          <div className="flex items-center gap-2 mb-6 justify-start">
            <div className="w-30 h-[2px] bg-lime-600"></div>
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <div className="w-30 h-[2px] bg-lime-600"></div>
          </div>

          <p className="text-gray-600 mb-4">
            Siêu Thị Xanh được thành lập với sứ mệnh mang đến thực phẩm sạch, an
            toàn và thân thiện với môi trường. Chúng tôi luôn nỗ lực để trở
            thành người bạn đồng hành đáng tin cậy của mọi gia đình, góp phần
            xây dựng một lối sống xanh và bền vững.
          </p>

          <p className="text-gray-600 mb-6">
            Trải qua nhiều thế kỷ, lá trà không chỉ là thức uống thanh mát mà
            còn mang nhiều giá trị sức khỏe, giúp con người thư giãn và gắn kết
            trong những khoảnh khắc sum vầy.
          </p>

          <p className="text-gray-600 mb-6">
            Trải qua nhiều năm phát triển, Siêu Thị Xanh không chỉ mang đến thực
            phẩm sạch, an toàn mà còn lan tỏa thông điệp sống xanh, bảo vệ sức
            khỏe và môi trường, góp phần xây dựng một cộng đồng bền vững.
          </p>

          <button className="bg-lime-500 hover:text-[#88b44e] text-white px-6 py-2 rounded-full transition">
            Đọc Thêm
          </button>
        </div>
      </div>
    </div>
  );
};
