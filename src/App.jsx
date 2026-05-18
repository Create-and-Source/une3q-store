import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { CartProvider } from './lib/cart'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import CustomOrders from './pages/CustomOrders'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLayout from './admin/AdminLayout'
import AdminLogin from './admin/Login'
import Dashboard from './admin/Dashboard'
import Products from './admin/Products'
import Orders from './admin/Orders'
import Customers from './admin/Customers'
import Requests from './admin/Requests'
import Subscribers from './admin/Subscribers'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function RequireAuth({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-[#f5f5f3] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#7a1fad] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) return <Navigate to="/admin/login" replace />
  return children
}

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Nav />
      <Routes>
        {/* Storefront */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/custom" element={<CustomOrders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="requests" element={<Requests />} />
          <Route path="subscribers" element={<Subscribers />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen bg-[#f3eadb] flex items-center justify-center text-center px-6">
            <div>
              <h1 className="text-6xl font-black text-[#071f47] mb-4">404</h1>
              <p className="text-xl text-[#12345f] mb-6">Page not found</p>
              <a href="/" className="text-[#7a1fad] font-bold hover:underline">Go Home</a>
            </div>
          </div>
        } />
      </Routes>
      <Footer />
    </CartProvider>
  )
}
