import React from "react";
import img1 from "../../assets/images/AboutUs/about-1.jpg";
import img2 from "../../assets/images/AboutUs/about-2.jpg";
import img3 from "../../assets/images/AboutUs/about-3.jpg";
import img4 from "../../assets/images/AboutUs/about-4.jpg";
import img5 from "../../assets/images/AboutUs/about-5.jpg";
import img6 from "../../assets/images/AboutUs/about-6.jpg";

export const AboutUs = () => {
  return (
    <section className="container">
      <div className="grid lg:grid-cols-2 gap-8 py-20">
        {/* Hình ảnh */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <img
              src={img1}
              alt="Trà tươi"
              className="object-cover shadow-lg w-full h-full"
            />
            <img
              src={img2}
              alt="Người thưởng trà"
              className="object-cover shadow-lg max-w-[150px] max-h-[186px] self-end"
            />
          </div>
          <div className="flex flex-col gap-4">
            <img
              src={img4}
              alt="Lá trà"
              className="object-cover shadow-lg max-w-[150px] max-h-[186px]"
            />
            <img
              src={img3}
              alt="Nguyên liệu trà"
              className="object-cover shadow-lg w-full h-full"
            />
          </div>
        </div>

        {/* Nội dung */}
        <div className="text-gray-800">
          <p className="font-semibold italic text-[#7CCF00] text-[20px]">
            Về Chúng Tôi
          </p>
          <h3 className="text-3xl md:text-4xl font-bold leading-snug mb-6">
            Hành trình thành công của Ohayo trong 25 năm
          </h3>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-28 h-1 bg-lime-500"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-28 h-1 bg-lime-500"></div>
          </div>

          {/* Box 1 */}
          <div className="flex items-start gap-5 mb-8">
            <img
              src={img5}
              alt="Sản phẩm sạch"
              className="w-28 h-28 rounded-lg object-cover shadow-md"
            />
            <div>
              <h4 className="text-xl font-semibold mb-2">
                Trà của chúng tôi là một trong những thức uống phổ biến nhất thế
                giới
              </h4>
              <p className="text-base text-gray-600">
                Trải qua nhiều năm phát triển, chúng tôi mang đến những sản phẩm
                trà tinh khiết, được chọn lọc kỹ càng từ những lá trà chất lượng
                cao.
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="flex items-start gap-5 border-t pt-6">
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-2">
                Uống một tách trà mỗi ngày giúp cơ thể khỏe mạnh
              </h4>
              <p className="text-base text-gray-600">
                Trà xanh chứa nhiều chất chống oxy hóa, giúp tăng cường sức
                khỏe, giảm căng thẳng và mang lại sự thư giãn cho tinh thần.
              </p>
            </div>
            <img
              src={img6}
              alt="Thưởng trà"
              className="w-28 h-28 rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
