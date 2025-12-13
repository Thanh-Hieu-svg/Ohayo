import React from "react";
import img1 from "../../assets/bi-quyet-chon-thuc-pham-sach_1.jpg";
import img2 from "../../assets/cua-hang-thuc-pham-sach_e28346a694eb4e91adf852a08af96693.jpg";
import img3 from "../../assets/images1059758_1_trang_3.gif";
import img4 from "../../assets/lam-cach-nao-de-giam-can-hieu-qua.jpg";
import img5 from "../../assets/thuc_pham_1.png";
import img6 from "../../assets/thuc_pham_sach_va_nhung_dieu_can_phai_biet_2a841ed292.webp";

export const AboutUs = () => {
  return (
    <section className="container">
      <div className="grid lg:grid-cols-2 gap-8 py-20">
        {/* Hình ảnh */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <img
              src={img1}
              alt="Rau tươi"
              className="object-cover shadow-lg w-full h-full"
            />
            <img
              src={img2}
              alt="Khách hàng mua sắm"
              className="object-cover shadow-lg max-w-[150px] max-h-[186px] self-end"
            />
          </div>
          <div className="flex flex-col gap-4">
            <img
              src={img4}
              alt="Sản phẩm hữu cơ"
              className="object-cover shadow-lg max-w-[150px] max-h-[186px]"
            />
            <img
              src={img3}
              alt="Nông sản sạch"
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
            Hành trình phát triển Siêu Thị Xanh trong 25 năm
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
                Sản phẩm của chúng tôi luôn tươi ngon và an toàn
              </h4>
              <p className="text-base text-gray-600">
                Siêu Thị Xanh cam kết mang đến những sản phẩm hữu cơ, được chọn
                lọc kỹ càng từ các nông trại đạt chuẩn, đảm bảo sức khỏe cho
                người tiêu dùng.
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="flex items-start gap-5 border-t pt-6">
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-2">
                Sống xanh mỗi ngày cùng Siêu Thị Xanh
              </h4>
              <p className="text-base text-gray-600">
                Chúng tôi khuyến khích lối sống xanh, sử dụng các sản phẩm thân
                thiện với môi trường, góp phần bảo vệ hành tinh và sức khỏe của
                bạn.
              </p>
            </div>
            <img
              src={img6}
              alt="Mua sắm xanh"
              className="w-28 h-28 rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
