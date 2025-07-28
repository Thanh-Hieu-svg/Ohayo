import React from "react";
import { Banner } from "../../components/common/Banner";
import { AboutUs } from "./AboutUs";
import { OurProduct } from "../../components/layouts/User/Products/OurProduct";
import { Article } from "../../components/layouts/User/Article";
import { FlashDeal } from "../../components/layouts/User/FlashDeal";
import { Testimonial } from "../../components/layouts/User/testimonials";

export const Home = () => {
  return (
    <>
      <Banner />
      <AboutUs />
      <OurProduct />
      <Article />
      <FlashDeal />
      <Testimonial />
    </>
  );
};
