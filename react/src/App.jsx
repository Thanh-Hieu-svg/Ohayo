import "./app.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutUser } from "./layouts/LayoutUser";
import { LayoutAdmin } from "./layouts/LayoutAdmin";
import { Home } from "./pages/Users/Home";
import { Shop } from "./pages/Users/Shop";
import { AboutUs } from "./pages/Users/AboutUs";
import { Blog } from "./pages/Users/Blog";
import { Contact } from "./pages/Users/Contact";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { Profile } from "./pages/Users/Profile";
import { Admin } from "./pages/admin/Admin";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { ResetPassword } from "./pages/Auth/ResetPassword";
import { BlogManagement } from "./pages/admin/BlogManagement";
import { ProductManagement } from "./pages/admin/ProductManagement";
import { CustomerManagement } from "./pages/admin/CustomerManagement";
import { OrderManagement } from "./pages/admin/OrderManagement";
import { ContactManagement } from "./pages/admin/ContactManagement";
import { AdminRoute } from "./routers/AdminRoute";
import { ProtectedRootRedirect } from "./routers/ProtectedRootRedirect";
import { CategoryManagement } from "./pages/admin/CategoryManegement";
import { ProductDetail } from "./pages/Users/ProductDetail";
import { Cart } from "./pages/Users/Cart";
import { CartRoute } from "./routers/CartRoute";
import { ShippingAddress } from "./components/layouts/User/Checkout/ShippingAddress";
import { PaymentMethod } from "./components/layouts/User/Checkout/PaymentMethod";
import { ReviewOrder } from "./components/layouts/User/Checkout/ReviewOrder";
import { OrderSuccess } from "./components/layouts/User/Checkout/OrderSuccess";
import { BlogDetail } from "./components/layouts/User/Blog/BlogDetail";
import { ContactDetail } from "./components/layouts/Admin/Contact/ContactDetail";
import { ProfileInfo } from "./components/layouts/User/Profile/ProfileInfo";
import { OrderList } from "./components/layouts/User/Profile/OrderList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ProtectedRootRedirect />
              <LayoutUser />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route
            path="cart"
            element={
              <CartRoute>
                <Cart />
              </CartRoute>
            }
          />
          <Route path="shippingaddress" element={<ShippingAddress />} />
          <Route path="paymentmethod" element={<PaymentMethod />} />
          <Route path="revieworder" element={<ReviewOrder />} />
          <Route path="ordersuccess" element={<OrderSuccess />} />
          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileInfo />} />
            <Route path="info" element={<ProfileInfo />} />
            <Route path="orders" element={<OrderList />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Admin />} />
            <Route path="categorymanegement" element={<CategoryManagement />} />
            <Route path="productmanagement" element={<ProductManagement />} />
            <Route path="blogmanegement" element={<BlogManagement />} />
            <Route path="customermanagement" element={<CustomerManagement />} />
            <Route path="ordermanagement" element={<OrderManagement />} />
            <Route path="contactmanagement" element={<ContactManagement />} />
            <Route path="contact-detail/:id" element={<ContactDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
