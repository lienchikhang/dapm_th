import logo from './logo.svg';
import './App.css';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Search from './Components/Pages/Search/Search';
import Shoes from './Components/Pages/Shoes/Shoes';
import Cart from './Components/Pages/Cart/Cart';
import Login from './Components/Pages/Auth/Login';
import Register from './Components/Pages/Auth/Register';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Profiles from './Components/Pages/Auth/Profiles';
import ShoeDetail from './Components/Pages/ShoeDetail/ShoeDetail';
function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product/shoes' element={<Shoes/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/auth/login' element={<Login/>}/>
          <Route path='/auth/register' element={<Register/>}/>
          <Route path='/user/profiles' element={<Profiles/>}/>
          <Route path='/product/shoes/detail/:id' element={<ShoeDetail/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
