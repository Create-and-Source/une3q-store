import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mail, Sparkles, Heart, Sun } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const location = useLocation()

  if (location.pathname.startsWith('/admin')) return null

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    await supabase.from('subscribers').upsert({ email }, { onConflict: 'email' })
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-navy-deep text-white relative">
      <div className="gold-line" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="UNE3Q" className="h-16 w-auto" />
            </div>
            <p className="text-gold tracking-[0.25em] uppercase text-xs font-bold mb-3">Be you, Be UNE3Q</p>
            <p className="text-white/40 text-sm">Unique Arts &bull; Handmade Jewelry &bull; Home Decor</p>

            <div className="flex items-center gap-4 mt-6 text-white/20 text-xs font-bold uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1"><Sparkles size={12} className="text-gold/60" /> Handmade</span>
              <span className="flex items-center gap-1"><Heart size={12} className="text-gold/60" /> Heartfelt</span>
              <span className="flex items-center gap-1"><Sun size={12} className="text-gold/60" /> One-of-a-Kind</span>
            </div>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-wider mb-4 text-sm">Quick Links</h3>
            <div className="flex flex-col gap-2 text-white/40 text-sm">
              <Link to="/shop" className="hover:text-lime transition">Shop</Link>
              <Link to="/custom" className="hover:text-lime transition">Custom Orders</Link>
              <Link to="/about" className="hover:text-lime transition">About</Link>
              <Link to="/contact" className="hover:text-lime transition">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-wider mb-4 text-sm">Stay Connected</h3>
            {subscribed ? (
              <p className="text-lime font-bold">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="rounded-full px-5 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple/50 focus:outline-none transition text-sm"
                  required
                />
                <button type="submit" className="bg-gradient-to-r from-purple to-purple-deep text-white rounded-full px-5 py-3 font-bold flex items-center justify-center gap-2 hover:shadow-purple/30 hover:scale-[1.02] transition-all text-sm border border-purple-light/20">
                  <Mail size={16} /> Join the List
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center text-white/20 text-xs">
          &copy; {new Date().getFullYear()} UNE3Q LLC. All rights reserved. Handmade with passion. Designed to stand out.
        </div>
      </div>
    </footer>
  )
}
