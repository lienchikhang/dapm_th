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
import Register from "./Components/Pages/Auth/Register";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Profiles from "./Components/Pages/Auth/Profiles";
import ShoeDetail from "./Components/Pages/ShoeDetail/ShoeDetail";
import Detail from "./Components/Pages/Detail/Detail";
import Auth from "./Components/Pages/Auth/Auth";
import AuthContextProvider from "./context/authContext";
import Dashboard from "./Components/Pages/Admin/Dashboard";
import { useSelector } from "react-redux";
import CheckOut from "./Components/Pages/CheckOut/CheckOut";
import History from "./Components/Pages/UserProfile/History";
import ChangeInfo from "./Components/Pages/UserProfile/ChangeInfo";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/shoes" element={<Shoes />} />
        {/* <Route path='/cart' element={<Cart/>}/> */}
        <Route path="/product/shoes/:id" element={<ShoeDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="auth/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/auth/profiles"
          element={user ? <Profiles /> : <Navigate to="/auth/login" />}
        >
          <Route path="history" element={<History />} />
          <Route path="change" element={<ChangeInfo />} />
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
