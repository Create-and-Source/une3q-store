import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mail } from 'lucide-react'
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
    <footer className="bg-[#071f47] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#063c86] flex items-center justify-center">
                <span className="text-[#a7c900] font-black text-lg">U3</span>
              </div>
              <span className="font-black text-xl">UNE3Q LLC</span>
            </div>
            <p className="text-[#a7c900] font-bold tracking-widest uppercase mb-3">Be you, Be UNE3Q</p>
            <p className="text-white/70">Unique Arts &bull; Handmade Jewelry &bull; Home Decor</p>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-wider mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-white/70">
              <Link to="/shop" className="hover:text-white transition">Shop</Link>
              <Link to="/custom" className="hover:text-white transition">Custom Orders</Link>
              <Link to="/about" className="hover:text-white transition">About</Link>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-wider mb-4">Stay Connected</h3>
            {subscribed ? (
              <p className="text-[#a7c900] font-bold">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="rounded-full px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40"
                  required
                />
                <button type="submit" className="bg-[#063c86] text-white rounded-full px-5 py-3 font-bold flex items-center justify-center gap-2 hover:bg-[#074db0] transition">
                  <Mail size={18} /> Join the List
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} UNE3Q LLC. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
