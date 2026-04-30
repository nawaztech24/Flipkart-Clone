import WebFont from 'webfontloader';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Layout
import Header from './components/Layouts/Header/Header';
import Footer from './components/Layouts/Footer/Footer';

// User
import Login from './components/User/Login';
import Register from './components/User/Register';
import Account from './components/User/Account';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';

// Address
import Address from './components/User/Address';
import AddAddress from './components/User/AddAddress';
import EditAddress from './components/User/EditAddress';

// Core
import ProtectedRoute from './Routes/ProtectedRoute';
import { loadUser } from './actions/userAction';

// Pages
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConfirm from './components/Cart/OrderConfirm';
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import OrderStatus from './components/Cart/OrderStatus';
import OrderDetails from './components/Order/OrderDetails';

// Extra
import Minutes from './components/Minutes/Minutes';
import Travel from './components/Travel/Travel';

// ADMIN
import Dashboard from './components/Admin/Dashboard';
import MainData from './components/Admin/MainData';
import ProductTable from './components/Admin/ProductTable';
import OrderTable from './components/Admin/OrderTable';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import UpdateOrder from './components/Admin/UpdateOrder'; // ✅ ADDED
import UserTable from './components/Admin/UserTable';
import ReviewsTable from './components/Admin/ReviewsTable';

// Others
import NotFound from './components/NotFound';

function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    WebFont.load({
      google: { families: ["Roboto:300,400,500,600,700"] }
    });
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">

      <Header />

      <div className="flex-grow">

        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PRODUCTS */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />

          {/* CART */}
          <Route path="/cart" element={<Cart />} />

          <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
          <Route path="/order/confirm" element={<ProtectedRoute><OrderConfirm /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />

          <Route path="/orders/success" element={<OrderSuccess success={true} />} />

          <Route path="/order/:id" element={<ProtectedRoute><OrderStatus /></ProtectedRoute>} />
          <Route path="/order_details/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

          {/* USER */}
          <Route path="/account/*" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/account/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />

          {/* ADDRESS */}
          <Route path="/account/address" element={<ProtectedRoute><Address /></ProtectedRoute>} />
          <Route path="/account/address/new" element={<ProtectedRoute><AddAddress /></ProtectedRoute>} />
          <Route path="/account/address/edit/:id" element={<ProtectedRoute><EditAddress /></ProtectedRoute>} />

          <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* ADMIN */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={0}>
                  <MainData />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={2}>
                  <ProductTable />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={1}>
                  <OrderTable />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          {/* ✅ FINAL FIX (ORDER EDIT ROUTE) */}
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={1}>
                  <UpdateOrder />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/new_product"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={3}>
                  <NewProduct />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={2}>
                  <UpdateProduct />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={4}>
                  <UserTable />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={5}>
                  <ReviewsTable />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          {/* EXTRA */}
          <Route path="/minutes" element={<Minutes />} />
          <Route path="/travel" element={<Travel />} />

          {/* MISC */}
          <Route path="/seller" element={<div className="p-10 text-xl">Become a Seller Page</div>} />
          <Route path="/notifications" element={<div className="p-10 text-xl">Notification Settings</div>} />
          <Route path="/support" element={<div className="p-10 text-xl">24x7 Customer Care</div>} />
          <Route path="/advertise" element={<div className="p-10 text-xl">Advertise Page</div>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>

      <Footer />

    </div>
  );
}

export default App;