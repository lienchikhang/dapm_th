import logo from "./logo.svg";
import "./App.css";
import {
  Link,
  BrowserRouter,
  Route,
  Routes,
  useRoutes,
  useNavigate,
  redirect,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import Test from "./components/Test";
import Test2 from "./components/Test2";
import Test3 from "./components/Test3";
import ManageShoes from "./components/ManageShoes";
import { ConfigProvider } from "antd";
import Create from "./components/Create";
import Stat from "./components/Stat";
import Default from "./pages/Default/Default";
import CreatePage from "./pages/Create/CreatePage";
import UserList from "./pages/Users/UserList/UserList";
import UserListWrapper from "./pages/Users/UserList/UserListWrapper";
import UserStat from "./pages/Users/Stat/UserStat";
import OrderList from "./pages/Order/OrderList/OrderList";
import OrderWrapper from "./pages/Order/OrderList/OrderWrapper";
import OrderDetail from "./pages/Order/OrderDetail";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const admin = user?.payload?.isAdmin;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/login"
          element={admin ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={admin ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route path="" element={<Default />} />
          <Route path="products" element={<ManageShoes />}>
            <Route path="" element={<Navigate to="list" />} />
            <Route path="list" element={<Create />} />
            <Route path="create" element={<CreatePage />} />
            <Route path="stat" element={<Stat />} />
          </Route>
          <Route path="users" element={<UserListWrapper />}>
            <Route path="" element={<Navigate to="list" />} />
            <Route path="list" element={<UserList />} />
            <Route path="stat" element={<UserStat />} />
          </Route>
          <Route path="orders" element={<OrderWrapper />}>
            <Route path="" element={<Navigate to="list" />} />
            <Route path="list" element={<OrderList />} />
            <Route path="stat" element={<UserStat />} />
            <Route path="list/detail/:id" element={<OrderDetail />} />
          </Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
