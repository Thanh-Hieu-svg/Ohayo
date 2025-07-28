import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner1 from "../../assets/images/Banner/carousel-1.jpg";
import Banner2 from "../../assets/images/Banner/carousel-2.jpg";
import { ChevronLeft } from "../icons/ChevronLeft";
import { ChevronRight } from "../icons/ChevronRight";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute right-30 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center focus:outline-none"
      onClick={onClick}
      type="button"
      aria-label="Next"
    >
      <ChevronRight />
    </button>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute left-30 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center focus:outline-none"
      onClick={onClick}
      type="button"
      aria-label="Previous"
    >
      <ChevronLeft />
    </button>
  );
};

const slides = [
  {
    image: Banner1,
    title: (
      <>
        Trà Hữu Cơ <br /> Tươi Ngon Từ Thiên Nhiên
      </>
    ),
    subtitle: (
      <>
        Khám phá hương vị{" "}
        <span className="text-[#252c30] font-semibold">
          trà xanh nguyên chất
        </span>
      </>
    ),
    buttonText: "Mua Ngay",
  },
  {
    image: Banner2,
    title: (
      <>
        Nghệ Thuật <br /> Pha Trà Tinh Tế
      </>
    ),
    subtitle: (
      <>
        Trải nghiệm cùng{" "}
        <span className="text-[#252c30] font-semibold">Trà Thảo Mộc</span>
      </>
    ),
    buttonText: "Tìm Hiểu Thêm",
  },
];

export const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    fade: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (oldIndex, newIndex) => setActiveSlide(newIndex),
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx}>
            <div className="relative w-full h-screen">
              <img
                src={slide.image}
                alt={`Banner ${idx + 1}`}
                className="w-full h-screen object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "rgba(136,180,78,0.7)", zIndex: 10 }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
                <p
                  className={`text-white text-lg md:text-xl font-light mb-2 transition-all duration-700 ${
                    activeSlide === idx ? "bloom-effect" : "opacity-0"
                  }`}
                >
                  {slide.subtitle}
                </p>
                <h2
                  className={`font-playfair text-[#252c30] text-4xl md:text-6xl font-bold mb-8 drop-shadow-md transition-all duration-700 ${
                    activeSlide === idx ? "bloom-effect" : "opacity-0"
                  }`}
                >
                  {slide.title}
                </h2>
                <button
                  className={`bg-white text-[#88b44e] px-8 py-2 rounded-full text-lg font-semibold hover:bg-gray-200 transition ${
                    activeSlide === idx ? "bloom-effect" : "opacity-0"
                  }`}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <style>
        {`
        @keyframes bloom {
          0% { opacity: 0; transform: scale(0.7);}
          60% { opacity: 1; }
          100% { opacity: 1; transform: scale(1);}
        }
        .bloom-effect {
          animation: bloom 2s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}
      </style>
    </div>
  );
};
