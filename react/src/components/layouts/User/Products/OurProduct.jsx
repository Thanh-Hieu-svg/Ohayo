import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Products } from "./Products";
import { fetchShopData } from "../../../../redux/shopSlice";
import Productbg from "../../../../assets/images/product_bg.png";

export const OurProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products) || [];

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchShopData());
    }
  }, [dispatch, products.length]);

  const latestProducts = products[0]?.createdAt
    ? [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4)
    : products.slice(0, 4);

  return (
    <div className="relative w-full min-h-[700px]">
      <img
        src={Productbg}
        alt="Productbg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-[rgba(136, 180, 78, .1)] z-10"></div>
      <div className="container relative z-20 py-8 flex flex-col items-center">
        <h2 className="text-[#88b44e] text-center italic text-xl">
          Sản phẩm mới nhất
        </h2>
        <p className="font-semibold text-center text-4xl font-playfair text-[#252c30] py-4">
          Thực phẩm sạch và an toàn
          <br />
          cho sức khỏe của bạn
        </p>
        <p className="text-center text-lg font-medium text-[#252c30] py-2">
          Siêu Thị Xanh - Đồng hành cùng bạn trong hành trình sống xanh và bền
          vững.
        </p>
        <div className="flex items-center gap-4 mb-8 justify-center py-4">
          <div className="w-28 h-1 bg-lime-500"></div>
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <div className="w-28 h-1 bg-lime-500"></div>
        </div>
        <Products
          products={latestProducts}
          gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        />
      </div>
    </div>
  );
};
