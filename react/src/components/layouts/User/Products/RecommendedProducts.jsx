import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShopData } from "../../../../redux/shopSlice";
import { Products } from "../Products/Products";

function getCategoryId(category) {
  if (!category) return "";
  if (typeof category === "object" && category !== null) {
    return category._id || category.id || category;
  }
  return category;
}

export const RecommendedProducts = ({ product }) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.shop);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchShopData());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (!product || !products.length) {
      setRelated([]);
      return;
    }
    const currentCateId = getCategoryId(product.category);
    const relatedProducts = products.filter((p) => {
      if (p._id === product._id) return false;
      const cateId = getCategoryId(p.category);
      return cateId === currentCateId;
    });
    setRelated(relatedProducts);
  }, [products, product]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!related.length) return null;

  return (
    <div className=" container">
      <h3 className="text-xl font-bold mb-4 text-[#212121]">
        Sản phẩm đề xuất
      </h3>
      <Products
        products={related}
        gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      />
    </div>
  );
};
