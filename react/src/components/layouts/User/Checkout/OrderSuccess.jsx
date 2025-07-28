import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const OrderSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white ">
      <div className=" p-10  text-center max-w-md w-full">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-green-500 text-6xl mb-6"
        />
        <h1 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h1>
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã mua hàng. Chúng tôi sẽ sớm liên hệ để xác nhận đơn hàng.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Quay về trang chủ
          </Link>
          <Link
            to="/order-history"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold"
          >
            Xem đơn hàng
          </Link>
        </div>
      </div>
    </div>
  );
};
