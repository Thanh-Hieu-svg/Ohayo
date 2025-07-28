import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShopData,
  setSelectedCategories,
  setSort,
} from "../../redux/shopSlice";
import { Products } from "../../components/layouts/User/Products/Products";
import { Category } from "../../components/layouts/User/Category/Category";
import Banner from "../../assets/images/Banner/carousel-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../../components/common/Pagination";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export const Shop = () => {
  const dispatch = useDispatch();
  const { products, categories, selectedCategories, sort, loading } =
    useSelector((state) => state.shop);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("q")?.toLowerCase() || "";

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    document.title = "Shop | E-commerce";
    dispatch(fetchShopData());
  }, [dispatch]);

  const filteredProducts = products.filter((prod) => {
    let matchCategory = true;
    if (selectedCategories.length > 0) {
      if (!prod.category) return false;
      if (Array.isArray(prod.category)) {
        matchCategory = prod.category.some((cate) =>
          selectedCategories.includes(
            typeof cate === "object" && cate !== null ? cate._id : String(cate)
          )
        );
      } else if (typeof prod.category === "object" && prod.category !== null) {
        matchCategory = selectedCategories.includes(prod.category._id);
      } else {
        matchCategory = selectedCategories.includes(String(prod.category));
      }
    }

    if (keyword) {
      const name = prod.name?.toLowerCase() || "";
      let cateName = "";
      if (prod.category) {
        if (typeof prod.category === "object" && prod.category.name)
          cateName = prod.category.name.toLowerCase();
        if (typeof prod.category === "string")
          cateName = prod.category.toLowerCase();
      }
      return (
        matchCategory && (name.includes(keyword) || cateName.includes(keyword))
      );
    }

    return matchCategory;
  });

  const sortedProducts = (() => {
    if (sort === "price-asc")
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    return [...filteredProducts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  })();

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const productsToShow = sortedProducts.slice(startIdx, endIdx);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories, sort, keyword]);

  return (
    <div>
      <div className="relative w-full h-64 md:h-80 overflow-hidden mb-6 ">
        <img
          src={Banner}
          alt="Shop Banner"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(136, 180, 78, 0.7)" }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white text-center">
          <h1 className="font-playfair text-[#252c30] text-3xl  md:text-5xl font-bold drop-shadow-lg mb-2">
            Shop
          </h1>
          <p className="text-sm md:text-base opacity-90">Home / Shop</p>
        </div>
      </div>
      <div className="container flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-90">
          <Category
            categories={categories}
            selected={selectedCategories}
            onChange={(list) => dispatch(setSelectedCategories(list))}
          />
        </aside>
        <main className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
              <span className={keyword ? "text-green-500" : "text-gray-700"}>
                {keyword
                  ? `Kết quả tìm kiếm sản phẩm cho "${keyword}"`
                  : `Hiện có tổng ${sortedProducts.length} sản phẩm`}
              </span>
            </div>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sort}
              onChange={(e) => dispatch(setSort(e.target.value))}
            >
              <option value="latest">Mới nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
            </select>
          </div>
          {loading ? (
            <div
              className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50"
              style={{ minHeight: "100vh" }}
            >
              <ClipLoader color="#36d7b7" size={72} />
            </div>
          ) : (
            <Products products={productsToShow} />
          )}

          <Pagination
            currentPage={page}
            totalItems={sortedProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
};
