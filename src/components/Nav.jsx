import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../lib/cart'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()
  if (location.pathname.startsWith('/admin')) return null

  return (
    <>
      <header className="sticky top-0 z-50 nav-canvas">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="group">
            <img src="/logo.png" alt="UNE3Q" className="h-14 w-auto group-hover:scale-105 transition-transform" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-bold uppercase text-sm tracking-wider text-navy">
            {[
              { to: '/shop', label: 'Shop' },
              { to: '/custom', label: 'Custom Orders' },
              { to: '/about', label: 'Our Vision' },
              { to: '/contact', label: 'Contact' },
            ].map(link => (
              <Link key={link.to} to={link.to}
                className={`relative py-1 transition hover:text-purple ${location.pathname === link.to ? 'text-purple' : ''}`}>
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full" style={{ background: 'linear-gradient(90deg, #7a1fad, #a7c900, #063c86)' }} />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative hidden md:flex items-center gap-2 btn-painted-purple px-5 py-3 rounded-full font-bold transition-all">
              <ShoppingBag size={18} /> Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 btn-painted-lime text-navy text-xs w-6 h-6 rounded-full flex items-center justify-center font-black border-0 p-0">
                  {itemCount}
                </span>
              )}
            </Link>
            <button className="md:hidden relative text-navy" onClick={() => setOpen(!open)}>
              {open ? <X size={28} /> : <Menu size={28} />}
              {itemCount > 0 && !open && (
                <span className="absolute -top-2 -right-2 btn-painted-lime text-navy text-xs w-5 h-5 rounded-full flex items-center justify-center font-black border-0 p-0">{itemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="md:hidden fixed inset-0 top-[69px] z-40 bg-canvas/95 backdrop-blur-xl">
          <div className="px-6 py-8 flex flex-col gap-5">
            {[
              { to: '/shop', label: 'Shop' },
              { to: '/custom', label: 'Custom Orders' },
              { to: '/about', label: 'Our Vision' },
              { to: '/contact', label: 'Contact' },
            ].map(link => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
                className="text-2xl font-black text-navy hover:text-purple transition border-b border-gold/20 pb-4">
                {link.label}
              </Link>
            ))}
            <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-3 text-2xl font-black text-purple">
              <ShoppingBag size={24} /> Cart ({itemCount})
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
