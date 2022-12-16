import Footer from "./sharedComponent/footer/Footer";
import Header from "./sharedComponent/header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AddCategory from "./pages/adminPages/addCategory/AddCategory";
import Shop from "./pages/shop/Shop";
import LoginRegister from "./pages/loginRegister/LoginRegister";
import Deshboard from "./pages/adminPages/Deshboard";
import NotFound from "./pages/NotFound";
import MyAccount from "./pages/userpage/MyAccount";
import AddProduct from "./pages/adminPages/addProduct/AddProduct";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import ManageProduct from "./pages/adminPages/manageProduct/ManageProduct";
import ManageOrder from "./pages/adminPages/manageOrder/ManageOrder";
import MyOrder from "./pages/userpage/myOrder/MyOrder";
import PrivateRoute from "./services/userChecker/PrivateRoute";
import AdminRoute from "./services/adminChacker/AdminRoute";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/login' element={<LoginRegister />} />
        <Route path='/place-order/:id' element={<PlaceOrder />} />

        {/* user pages */}
        <Route
          path='/myaccount'
          element={<PrivateRoute element={<MyAccount />} />}
        >
          <Route path='myorder' element={<MyOrder />} />
        </Route>

        {/* admin page */}
        <Route path='/admin' element={<AdminRoute element={<Deshboard />} />}>
          <Route path='add-category' element={<AddCategory />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='manage-product' element={<ManageProduct />} />
          <Route path='manage-order' element={<ManageOrder />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
