import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles, Heart, Sun, Gem, Palette, Home as HomeIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useCart } from '../lib/cart'

const VALUES = [
  { label: 'Unique', icon: Sparkles },
  { label: 'Authentic', icon: Heart },
  { label: 'Limitless', icon: Sun },
]

const CATEGORY_ICONS = { Jewelry: Gem, Art: Palette, 'Home Decor': HomeIcon }

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const { addItem } = useCart()

  useEffect(() => {
    supabase.from('products').select('*, product_images(url), categories(name)').eq('status', 'active').eq('featured', true).limit(6)
      .then(({ data }) => setProducts(data || []))
    supabase.from('categories').select('*').order('sort_order')
      .then(({ data }) => setCategories(data || []))
  }, [])

  return (
    <div className="min-h-screen bg-[#f3eadb] text-[#071f47] overflow-hidden">
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="absolute -top-20 -right-24 w-96 h-96 rounded-full bg-[#063c86] opacity-20" />
        <div className="absolute top-24 right-32 w-52 h-52 rounded-full bg-[#8a18b5] opacity-20" />
        <div className="absolute bottom-8 left-8 w-64 h-64 rounded-full bg-[#a7c900] opacity-20" />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/60 border border-[#d9c8a6] rounded-full px-4 py-2 mb-6 shadow-sm">
            <Sparkles size={18} className="text-[#7a1fad]" />
            <span className="font-bold uppercase tracking-widest text-xs">Art. Soul. Style.</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
            Creativity is your <span className="text-[#7a1fad]">superpower.</span>
          </h2>

          <p className="text-xl md:text-2xl text-[#12345f] mb-8 leading-relaxed">
            We help you express it with unique arts, handmade jewelry, and home decor made different, made by heart.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="bg-[#063c86] text-white px-8 py-4 rounded-full font-bold text-center shadow-xl hover:scale-105 transition">
              Shop Now
            </Link>
            <Link to="/custom" className="bg-[#a7c900] text-[#071f47] px-8 py-4 rounded-full font-bold text-center shadow-xl hover:scale-105 transition">
              Request a Custom Piece
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative z-10">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-[#071f47] min-h-[520px] p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#a7c900,transparent_28%),radial-gradient(circle_at_bottom_right,#7a1fad,transparent_35%)] opacity-80" />
            <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-[#f3eadb]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#8a18b5] opacity-80" />
            <div className="absolute top-24 left-10 h-72 w-24 bg-[#a7c900] opacity-80 rotate-6" />
            <div className="absolute inset-0 opacity-25 bg-[linear-gradient(115deg,transparent_0_35%,#fff_35%_36%,transparent_36%_100%)]" />

            <div className="relative h-full flex flex-col justify-between gap-12 text-white">
              <div className="bg-white/15 backdrop-blur rounded-3xl p-6 border border-white/20">
                <p className="uppercase tracking-[0.35em] text-sm text-[#a7c900] mb-3">UNE3Q LLC</p>
                <h3 className="text-5xl font-black">Be you,<br />Be UNE3Q.</h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {VALUES.map(item => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="bg-[#f3eadb] text-[#071f47] rounded-2xl p-4 text-center shadow-lg">
                      <Icon className="mx-auto mb-2 text-[#7a1fad]" />
                      <p className="font-black uppercase text-xs tracking-widest">{item.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-[#7a1fad] font-black uppercase tracking-[0.35em] mb-3">Featured</p>
            <h2 className="text-4xl md:text-5xl font-black">Made with Heart</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map(product => {
              const img = product.product_images?.[0]?.url
              return (
                <Link key={product.id} to={`/product/${product.slug}`} className="bg-white/70 rounded-[2rem] overflow-hidden shadow-xl border border-[#d9c8a6] hover:-translate-y-2 transition group">
                  {img ? (
                    <div className="aspect-square overflow-hidden">
                      <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                  ) : (
                    <div className="aspect-square bg-[#f3eadb] flex items-center justify-center">
                      <Gem size={48} className="text-[#d9c8a6]" />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-[#7a1fad] mb-1">{product.categories?.name}</p>
                    <h3 className="text-xl font-black mb-2">{product.name}</h3>
                    <p className="text-[#12345f] text-lg font-bold">${Number(product.price).toFixed(2)}</p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-[#063c86] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition">
              <ShoppingBag size={18} /> View All Products
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-[#7a1fad] font-black uppercase tracking-[0.35em] mb-3">Shop the Collection</p>
            <h2 className="text-4xl md:text-5xl font-black">Browse by Category</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map(cat => {
              const Icon = CATEGORY_ICONS[cat.name] || Gem
              return (
                <Link key={cat.id} to={`/shop?category=${cat.slug}`} className="bg-white/70 rounded-[2rem] p-8 shadow-xl border border-[#d9c8a6] hover:-translate-y-2 transition text-center">
                  <div className="w-16 h-16 rounded-full bg-[#063c86] flex items-center justify-center mb-6 mx-auto">
                    <Icon className="text-[#a7c900]" size={30} />
                  </div>
                  <h3 className="text-2xl font-black mb-2">{cat.name}</h3>
                  <p className="text-[#12345f] leading-relaxed">{cat.description}</p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* If no products yet, show placeholder */}
      {products.length === 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-[#7a1fad] font-black uppercase tracking-[0.35em] mb-3">Coming Soon</p>
            <h2 className="text-4xl md:text-5xl font-black">Shop Opening Soon</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-[#12345f]">Handmade jewelry, unique arts, and home decor — all made different, made by heart. Check back soon.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Handmade Jewelry', desc: 'Unique bracelets, earrings, pendants, and made-to-order pieces designed around your personal style.', icon: Gem, cat: 'Jewelry' },
              { title: 'Unique Arts', desc: 'Colorful wall art, modern art pieces, and custom designs made different and made by heart.', icon: Palette, cat: 'Art' },
              { title: 'Home Decor', desc: 'Artful decor pieces that bring color, soul, and individuality into your space.', icon: HomeIcon, cat: 'Decor' },
            ].map(product => {
              const Icon = product.icon
              return (
                <div key={product.title} className="bg-white/70 rounded-[2rem] p-8 shadow-xl border border-[#d9c8a6] hover:-translate-y-2 transition">
                  <div className="w-16 h-16 rounded-full bg-[#063c86] flex items-center justify-center mb-6">
                    <Icon className="text-[#a7c900]" size={30} />
                  </div>
                  <p className="text-xs font-black tracking-[0.25em] uppercase text-[#7a1fad] mb-2">{product.cat}</p>
                  <h3 className="text-2xl font-black mb-3">{product.title}</h3>
                  <p className="text-[#12345f] leading-relaxed">{product.desc}</p>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Custom CTA */}
      <section className="bg-[#071f47] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#7a1fad] opacity-40" />
        <div className="absolute -right-20 bottom-0 w-96 h-96 rounded-full bg-[#a7c900] opacity-30" />
        <div className="max-w-6xl mx-auto relative text-center">
          <p className="text-[#a7c900] font-black uppercase tracking-[0.35em] mb-3">Custom Made</p>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Made with passion.<br />Designed to stand out.</h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">Request one-on-one custom work for jewelry, wall art, handmade gifts, and home decor that shows your individuality.</p>
          <Link to="/custom" className="inline-block bg-[#a7c900] text-[#071f47] px-8 py-4 rounded-full font-black shadow-xl hover:scale-105 transition">
            Request a Custom Piece
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <p className="text-[#7a1fad] font-black uppercase tracking-[0.35em] mb-3">Services</p>
            <h2 className="text-4xl font-black">More than a shop</h2>
          </div>
          {[
            'Personalized design consultations',
            'Custom gift bundles',
            'Art and decor commissions',
            'Jewelry repair or redesign',
            'Seasonal handmade collections',
            'Local pickup or shipping',
          ].map(service => (
            <div key={service} className="bg-white/70 rounded-2xl p-6 border border-[#d9c8a6] shadow-md font-bold flex items-center gap-3 text-[#071f47]">
              <Sparkles className="text-[#a7c900] shrink-0" /> {service}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
