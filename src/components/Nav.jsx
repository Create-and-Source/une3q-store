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
    <>
      <header className="sticky top-0 z-50 bg-navy-deep/95 backdrop-blur-xl border-b border-gold/20">
        <div className="gold-line" />
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="UNE3Q" className="h-14 w-auto group-hover:scale-105 transition-transform" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-semibold uppercase text-sm tracking-wider text-white/70">
            {[
              { to: '/shop', label: 'Shop' },
              { to: '/custom', label: 'Custom Orders' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-lime transition relative py-1 ${location.pathname === link.to ? 'text-lime' : ''}`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-lime rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative hidden md:flex items-center gap-2 bg-gradient-to-r from-purple to-purple-deep text-white px-5 py-3 rounded-full font-bold shadow-lg hover:shadow-purple/40 hover:scale-105 transition-all border border-purple-light/30">
              <ShoppingBag size={18} />
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-lime text-navy text-xs w-6 h-6 rounded-full flex items-center justify-center font-black">
                  {itemCount}
                </span>
              )}
            </Link>

            <button className="md:hidden relative text-white" onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
              {itemCount > 0 && !open && (
                <span className="absolute -top-2 -right-2 bg-lime text-navy text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed inset-0 top-[73px] z-40 bg-navy-deep/98 backdrop-blur-xl">
          <div className="px-6 py-8 flex flex-col gap-6 font-bold uppercase tracking-wider text-white">
            {[
              { to: '/shop', label: 'Shop' },
              { to: '/custom', label: 'Custom Orders' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-2xl hover:text-lime transition border-b border-white/10 pb-4"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-3 text-2xl text-lime">
              <ShoppingBag size={24} /> Cart ({itemCount})
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
