import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import person from "../../../assets/images/person.jpg";

const testimonials = [
  {
    image: person,
    name: "Nguyễn Văn A",
    title: "Chuyên viên Phân tích Hệ thống",
    feedback:
      "Tôi rất ấn tượng với chất lượng sản phẩm và dịch vụ tại đây. Rau củ luôn tươi mới, giao hàng nhanh chóng và đội ngũ hỗ trợ cực kỳ nhiệt tình!",
  },
  {
    image: person,
    name: "Trần Thị B",
    title: "Trưởng phòng Marketing",
    feedback:
      "Mỗi lần đặt hàng là một lần hài lòng! Giao diện dễ sử dụng, sản phẩm chất lượng và luôn đúng hẹn. Tôi sẽ tiếp tục ủng hộ dài lâu.",
  },
  {
    image: person,
    name: "Phạm Văn C",
    title: "Thiết kế Giao diện",
    feedback:
      "Trang web cực kỳ dễ dùng, sản phẩm rõ ràng minh bạch. Điều tôi thích nhất là có những đợt khuyến mãi cực kỳ hấp dẫn và thật sự tiết kiệm!",
  },
  {
    image: person,
    name: "Lê Thị D",
    title: "Kế toán trưởng",
    feedback:
      "Rất tuyệt vời! Sản phẩm tươi sạch, đóng gói cẩn thận. Dịch vụ chăm sóc khách hàng cũng rất chuyên nghiệp và nhanh chóng.",
  },
  {
    image: person,
    name: "Đỗ Minh E",
    title: "Chuyên viên Logistics",
    feedback:
      "Tôi thường xuyên đặt hàng cho cả gia đình. Trang web dễ thao tác, sản phẩm đúng như mô tả và luôn được giao đúng hẹn.",
  },
];

export const Testimonial = () => {
  return (
    <div className="bg-[#F3F4F6] py-20">
      <div className="text-center container mx-auto px-4">
        <p className="text-[#88b44e] font-playfair mb-2 text-lg font-semibold uppercase tracking-wide">
          Khách hàng nói gì?
        </p>
        <h2 className="text-[32px] md:text-[40px] font-bold mb-4 font-playfair text-[#252c30]">
          Sự hài lòng từ khách hàng của chúng tôi
        </h2>
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto font-playfair">
          Hàng ngàn khách hàng đã tin tưởng và lựa chọn. Cùng xem họ chia sẻ gì
          sau khi trải nghiệm dịch vụ của chúng tôi!
        </p>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl  p-6 h-[260px] flex flex-col justify-between hover:shadow-2xl transition duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#88b44e]"
                  />
                  <div>
                    <h4 className="text-md font-semibold text-[#1f2937]">
                      {t.name}
                    </h4>
                    <p className="text-sm text-gray-500">{t.title}</p>
                  </div>
                </div>
                <div className="text-gray-600 italic text-[15px] leading-relaxed relative pl-5 flex-1 overflow-hidden">
                  <span className="absolute left-0 top-0 text-2xl text-[#88b44e] font-serif">
                    “
                  </span>
                  {t.feedback}
                  <span className="text-[#88b44e] text-2xl font-serif align-bottom">
                    ”
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
