import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../lib/cart'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) return null

  return (
    <header className="sticky top-0 z-50 bg-[#f3eadb]/90 backdrop-blur border-b border-[#d9c8a6]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#063c86] flex items-center justify-center shadow-lg">
            <span className="text-[#a7c900] font-black text-xl">U3</span>
          </div>
          <div>
            <h1 className="font-black tracking-tight text-2xl text-[#071f47]">UNE3Q LLC</h1>
            <p className="text-xs tracking-[0.28em] uppercase text-[#6b4a99]">Be you, Be UNE3Q</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-semibold uppercase text-sm tracking-wider text-[#071f47]">
          <Link to="/shop" className="hover:text-[#7a1fad] transition">Shop</Link>
          <Link to="/custom" className="hover:text-[#7a1fad] transition">Custom Orders</Link>
          <Link to="/about" className="hover:text-[#7a1fad] transition">About</Link>
          <Link to="/contact" className="hover:text-[#7a1fad] transition">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative hidden md:flex items-center gap-2 bg-[#a7c900] text-[#071f47] px-5 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition">
            <ShoppingBag size={18} />
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#7a1fad] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          <button className="md:hidden relative" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
            {itemCount > 0 && !open && (
              <span className="absolute -top-2 -right-2 bg-[#7a1fad] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4 font-bold uppercase bg-[#f3eadb] text-[#071f47]">
          <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
          <Link to="/custom" onClick={() => setOpen(false)}>Custom Orders</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <ShoppingBag size={18} /> Cart ({itemCount})
          </Link>
        </div>
      )}
    </header>
  )
}
