import logo from "./logo.svg";
import "./App.css";
import {
  Link,
  BrowserRouter,
  Route,
  Routes,
  useRoutes,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Search from "./Components/Pages/Search/Search";
import Shoes from "./Components/Pages/Shoes/Shoes";
import Cart from "./Components/Pages/Cart/Cart";
import Login from "./Components/Pages/Auth/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Profiles from "./Components/Pages/Auth/Profiles";
import ShoeDetail from "./Components/Pages/ShoeDetail/ShoeDetail";
import Dashboard from "./Components/Pages/Admin/Dashboard";
import { useSelector } from "react-redux";
import CheckOut from "./Components/Pages/CheckOut/CheckOut";
import History from "./Components/Pages/UserProfile/History";

import Default from "./Components/Pages/UserProfile/Default";
import Developing from "./Components/Pages/developing/Developing";
import Register from "./Components/Pages/Auth/Register";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Developing />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Developing />} />
        <Route path="/product/shoes" element={<Shoes />} />
        {/* <Route path='/cart' element={<Cart/>}/> */}
        <Route path="/product/shoes/:id" element={<ShoeDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="auth/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="auth/register"
          element={user ? <Navigate to="/auth/profiles" /> : <Register />}
        />
        <Route
          path="/auth/profiles"
          element={user ? <Profiles /> : <Navigate to="/auth/register" />}
        >
          <Route path="" element={<Default />} />
          <Route path="history" element={<History />} />
          <Route path="developing" element={<Developing />} />
        </Route>
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/CheckOut"
          element={user ? <CheckOut /> : <Navigate to="/auth/login" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
