import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AUTH_URL } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { setCart, resetCart } from "../redux/cartSlice";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const login = async (form) => {
    if (!form.email || !form.password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return false;
    }
    try {
      const res = await axios.post(`${AUTH_URL}/login`, form, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);


      const cartKey = `cart_${res.data.user._id}`;
      const userCart = localStorage.getItem(cartKey);
      dispatch(setCart(userCart ? JSON.parse(userCart) : []));

      toast.success("Đăng nhập thành công!");
      if (res.data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Đăng nhập thất bại!";
      toast.error(message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    dispatch(resetCart());
    toast.success("Đăng xuất thành công!");
    navigate("/login", { replace: true });
  };

  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  return { login, logout, getUser };
};