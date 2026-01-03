import "./App.css"
import { Home } from './pages/home/Home'
import CategoryPage from './pages/cathegory/Cathegory'
import { Header } from './components/header/Header'
import Shop from './pages/shop/Shop'
import {Routes,Route} from "react-router-dom"
import ProductDetails from './pages/pagedetails/ProductDetails'
import CartPage from './pages/cartPage/CartPage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Checkout from './pages/checkout/Checkout'
import Payement from './pages/payement/Payement'
import NotFound from './pages/notefound/NotFound'
import Offers from './pages/offers/Offers'
// import Test from "./admin/admin"

import MainLayout from "./layout/MainLatout"
import AuthLayout from "./layout/AuthLayout"
import AdminLogin from "./admin/pages/AdminLogin"
import AdminRoutes from "./admin/AdminRoutes"
import Inscription from "./pages/inscription/Inscription"
import ScrollToTop from "./components/ScrollToTop"



export default function App() {
  return (
    <>
    <ScrollToTop />
    <ToastContainer position="top-right" autoClose={2500} />
      <Routes>

        {/* ROUTES AVEC HEADER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPage />}/>
          <Route path="/shop" element={<Shop />}/>
          <Route path="/product/:id" element={<ProductDetails />}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/payement" element={<Payement/>}/>
          <Route path="/offers" element={<Offers/>}/>
        </Route>
        
        {/* ROUTES SANS HEADER */}
        <Route element={<AuthLayout />}>
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/login" element={<AdminLogin />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        <Route path="*" element={<NotFound/>}/>
    </Routes>
     
   </>
  )
}
