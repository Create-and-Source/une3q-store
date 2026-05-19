import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles, Heart, Sun, Gem, Palette, Home as HomeIcon, ArrowRight, Fingerprint } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useCart } from '../lib/cart'

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
    <div className="min-h-screen bg-canvas overflow-hidden">

      {/* ===== HERO ===== */}
      <section className="hero-paint relative overflow-hidden">
        {/* Big paint splashes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-royal/15 blur-[80px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple/15 blur-[60px] translate-y-1/4 -translate-x-1/4" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-lime/12 blur-[50px]" />

        {/* Decorative brushstrokes */}
        <div className="absolute top-20 left-10 w-32 h-3 bg-purple/20 rounded-full rotate-[-20deg]" />
        <div className="absolute top-40 right-16 w-20 h-3 bg-royal/20 rounded-full rotate-[15deg]" />
        <div className="absolute bottom-32 left-1/3 w-24 h-3 bg-lime/25 rounded-full rotate-[-8deg]" />
        <div className="absolute bottom-20 right-10 w-16 h-2 bg-purple/15 rounded-full rotate-[25deg]" />

        {/* Gold accents */}
        <div className="absolute top-28 right-32 w-48 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute bottom-40 left-20 w-32 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Badge */}
            <div className="blob-purple text-sm mb-8 tracking-[0.3em] uppercase">
              Art. Soul. Style.
            </div>

            <h2 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.95] mb-8 text-navy">
              <span className="block">Creativity</span>
              <span className="block">is your</span>
              <span className="block brush-underline text-purple">superpower.</span>
            </h2>

            <p className="font-script text-2xl md:text-3xl text-royal/70 mb-4 rotate-[-1deg]">
              We just help you express it.
            </p>

            <p className="text-lg text-navy/60 mb-10 leading-relaxed max-w-lg">
              Unique arts, handmade jewelry, and home decor — made different, made by heart.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="group bg-royal text-white px-8 py-4 rounded-full font-black text-center shadow-lg color-shadow hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg">
                Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/custom" className="bg-lime text-navy px-8 py-4 rounded-full font-black text-center shadow-lg hover:scale-105 transition-all text-lg" style={{ boxShadow: '6px 6px 0 #7a1fad' }}>
                Custom Piece
              </Link>
            </div>
          </motion.div>

          {/* Hero card */}
          <motion.div initial={{ opacity: 0, scale: 0.95, rotate: 1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
            <div className="relative bg-white rounded-[2.5rem] p-10 border-3 border-navy/10" style={{ boxShadow: '10px 10px 0 #a7c900, 20px 20px 0 #7a1fad' }}>
              {/* Paint splash corners */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-purple/20 blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-lime/25 blur-sm" />
              <div className="absolute top-1/2 -right-8 w-12 h-12 rounded-full bg-royal/15 blur-sm" />

              <p className="text-purple tracking-[0.4em] uppercase text-sm font-black mb-4">UNE3Q LLC</p>

              <h3 className="font-display text-5xl md:text-6xl font-black text-navy leading-none mb-6">
                Be you,<br />
                Be <span className="text-purple">UNE</span><span className="text-lime">3</span><span className="text-royal">Q.</span>
                <span className="text-purple ml-1">&hearts;</span>
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Unique', icon: Fingerprint, bg: 'bg-purple', text: 'text-white' },
                  { label: 'Authentic', icon: Heart, bg: 'bg-royal', text: 'text-white' },
                  { label: 'Limitless', icon: Sun, bg: 'bg-lime', text: 'text-navy' },
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className={`${item.bg} ${item.text} rounded-2xl p-4 text-center`}>
                      <Icon className="mx-auto mb-2" size={22} />
                      <p className="font-black uppercase text-[10px] tracking-[0.25em]">{item.label}</p>
                    </div>
                  )
                })}
              </div>

              <div className="bg-cream rounded-2xl p-5 border-2 border-cream-dark rotate-[0.5deg]">
                <p className="font-script text-2xl text-navy/70 text-center leading-snug">
                  "Every piece tells a story. Yours. Uniquely <span className="text-purple font-bold">YOU</span>."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="paint-divider" />

      {/* ===== CATEGORIES ===== */}
      <section className="canvas-bg relative py-24 overflow-hidden">
        <div className="absolute top-10 right-20 w-28 h-3 bg-lime/20 rounded-full rotate-[-12deg]" />
        <div className="absolute bottom-16 left-10 w-20 h-3 bg-purple/15 rounded-full rotate-[8deg]" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="blob-blue text-xs tracking-[0.35em] uppercase mb-4 inline-block">Shop the Collection</span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-navy mt-6">Browse by Category</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Handmade Jewelry', icon: Gem, desc: 'Bracelets, earrings, pendants crafted with soul and style.', shadow: '#7a1fad', bg: 'bg-purple/5' },
              { name: 'Unique Arts', icon: Palette, desc: 'Colorful wall art and modern pieces made different, made by heart.', shadow: '#063c86', bg: 'bg-royal/5' },
              { name: 'Home Decor', icon: HomeIcon, desc: 'Artful pieces that bring color and individuality to your space.', shadow: '#a7c900', bg: 'bg-lime/5' },
            ].map((cat, i) => {
              const Icon = cat.icon
              const matchingCat = categories.find(c => c.name === cat.name || c.name === cat.name.replace('Unique Arts', 'Art').replace('Handmade Jewelry', 'Jewelry'))
              return (
                <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <Link
                    to={matchingCat ? `/shop?category=${matchingCat.slug}` : '/shop'}
                    className={`block ${cat.bg} bg-white rounded-[2rem] p-8 text-center group transition-all duration-300 border-2 border-cream-dark hover:border-purple`}
                    style={{ boxShadow: `6px 6px 0 ${cat.shadow}` }}
                  >
                    <div className={`w-20 h-20 rounded-full ${i === 0 ? 'bg-purple' : i === 1 ? 'bg-royal' : 'bg-lime'} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                      <Icon size={34} className={i === 2 ? 'text-navy' : 'text-white'} />
                    </div>
                    <h3 className="text-2xl font-black text-navy mb-3 group-hover:text-purple transition">{cat.name}</h3>
                    <p className="text-navy/50 leading-relaxed">{cat.desc}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-purple text-sm font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition">
                      Explore <ArrowRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== QUOTE BANNER ===== */}
      <section className="bg-navy relative py-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-purple/20 blur-[60px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] rounded-full bg-lime/15 blur-[50px] translate-x-1/3 translate-y-1/3" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <p className="font-script text-4xl md:text-6xl text-white leading-snug">
            "Creativity is your <span className="text-lime">superpower.</span><br />
            We just help you <span className="text-purple-light">express it.</span>"
          </p>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      {products.length > 0 && (
        <section className="canvas-bg relative py-24">
          <div className="absolute top-16 left-16 w-24 h-3 bg-purple/15 rounded-full rotate-[-15deg]" />
          <div className="absolute bottom-20 right-20 w-16 h-3 bg-royal/15 rounded-full rotate-[10deg]" />

          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="blob-lime text-xs tracking-[0.35em] uppercase mb-4 inline-block">Featured</span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-navy mt-6">Made with Heart</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product, i) => {
                const img = product.product_images?.[0]?.url
                const shadows = ['#7a1fad', '#063c86', '#a7c900']
                return (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Link to={`/product/${product.slug}`} className="block bg-white rounded-[2rem] overflow-hidden group transition-all duration-300 border-2 border-cream-dark hover:border-purple" style={{ boxShadow: `6px 6px 0 ${shadows[i % 3]}` }}>
                      {img ? (
                        <div className="aspect-square overflow-hidden">
                          <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        </div>
                      ) : (
                        <div className="aspect-square bg-cream flex items-center justify-center">
                          <Gem size={48} className="text-cream-dark" />
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-xs font-black tracking-[0.25em] uppercase text-purple mb-1">{product.categories?.name}</p>
                        <h3 className="text-xl font-black text-navy mb-2">{product.name}</h3>
                        <p className="text-royal text-lg font-bold">${Number(product.price).toFixed(2)}</p>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <div className="text-center mt-14">
              <Link to="/shop" className="inline-flex items-center gap-2 bg-purple text-white px-8 py-4 rounded-full font-black shadow-lg color-shadow hover:scale-105 transition-all text-lg">
                <ShoppingBag size={20} /> View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* If no products, show placeholders */}
      {products.length === 0 && (
        <section className="canvas-bg relative py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="blob-lime text-xs tracking-[0.35em] uppercase mb-4 inline-block">Coming Soon</span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-navy mt-6">Shop Opening Soon</h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto text-navy/50">Handmade jewelry, unique arts, and home decor — all made different, made by heart.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Handmade Jewelry', desc: 'Unique bracelets, earrings, pendants, and made-to-order pieces.', icon: Gem, color: '#7a1fad' },
                { title: 'Unique Arts', desc: 'Colorful wall art, modern art pieces, and custom designs.', icon: Palette, color: '#063c86' },
                { title: 'Home Decor', desc: 'Artful decor that brings color, soul, and individuality.', icon: HomeIcon, color: '#a7c900' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="bg-white rounded-[2rem] p-8 border-2 border-cream-dark" style={{ boxShadow: `6px 6px 0 ${item.color}` }}>
                    <div className={`w-16 h-16 rounded-full ${i === 0 ? 'bg-purple' : i === 1 ? 'bg-royal' : 'bg-lime'} flex items-center justify-center mb-6`}>
                      <Icon className={i === 2 ? 'text-navy' : 'text-white'} size={30} />
                    </div>
                    <h3 className="text-2xl font-black text-navy mb-3">{item.title}</h3>
                    <p className="text-navy/50 leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== CUSTOM CTA ===== */}
      <section className="relative py-28 overflow-hidden hero-paint">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple/25 blur-[40px]" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-royal/20 blur-[40px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-lime/10 blur-[60px]" />

        {/* Decorative brushstrokes */}
        <div className="absolute top-20 left-16 w-28 h-3 bg-purple/20 rounded-full rotate-[-20deg]" />
        <div className="absolute bottom-16 right-20 w-20 h-3 bg-royal/15 rounded-full rotate-[12deg]" />

        <div className="max-w-5xl mx-auto relative text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="blob-purple text-xs tracking-[0.35em] uppercase mb-6 inline-block">Custom Made</span>
            <h2 className="font-display text-4xl md:text-7xl font-black text-navy mb-6 leading-tight mt-6">
              Handmade with <span className="text-purple">passion.</span><br />
              Designed to <span className="text-lime brush-underline">stand out.</span>
            </h2>
            <p className="font-script text-2xl text-royal/60 mb-10 rotate-[-1deg]">
              One-on-one custom work — jewelry, wall art, gifts, and decor
            </p>
            <Link to="/custom" className="inline-flex items-center gap-2 bg-lime text-navy px-10 py-5 rounded-full font-black text-lg shadow-lg hover:scale-105 transition-all" style={{ boxShadow: '8px 8px 0 #7a1fad' }}>
              Request a Custom Piece <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="paint-divider" />

      {/* ===== SERVICES ===== */}
      <section className="canvas-bg relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-1">
              <span className="blob-blue text-xs tracking-[0.35em] uppercase mb-4 inline-block">Services</span>
              <h2 className="font-display text-4xl font-black text-navy mt-4 mb-4">More than a shop</h2>
              <p className="text-navy/50 leading-relaxed">Full creative services to bring your vision to life.</p>
            </motion.div>
            {[
              'Personalized design consultations',
              'Custom gift bundles',
              'Art and decor commissions',
              'Jewelry repair or redesign',
              'Seasonal handmade collections',
              'Local pickup or shipping',
            ].map((service, i) => {
              const colors = ['border-l-purple', 'border-l-royal', 'border-l-lime', 'border-l-purple', 'border-l-royal', 'border-l-lime']
              return (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`bg-white rounded-2xl p-6 border-2 border-cream-dark border-l-4 ${colors[i]} font-bold flex items-center gap-4 text-navy group hover:scale-[1.02] transition-all`}
                >
                  <Sparkles className="text-lime shrink-0" size={20} />
                  <span>{service}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM TAGLINE ===== */}
      <section className="bg-navy relative py-16 overflow-hidden">
        <div className="absolute -left-20 top-0 w-64 h-64 rounded-full bg-purple/20 blur-[60px]" />
        <div className="absolute -right-20 bottom-0 w-48 h-48 rounded-full bg-lime/15 blur-[50px]" />
        <div className="max-w-4xl mx-auto text-center px-6 relative">
          <p className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            Handmade with <span className="text-purple-light">passion.</span><br />
            Designed to <span className="text-lime">stand out.</span>
          </p>
          <div className="flex items-center justify-center gap-6 md:gap-8 text-white/50 text-sm font-bold uppercase tracking-[0.25em]">
            <span className="flex items-center gap-2"><Fingerprint size={16} className="text-purple-light" /> Handmade</span>
            <span className="text-lime text-lg">&bull;</span>
            <span className="flex items-center gap-2"><Heart size={16} className="text-purple-light" /> Heartfelt</span>
            <span className="text-lime text-lg">&bull;</span>
            <span className="flex items-center gap-2"><Sun size={16} className="text-purple-light" /> One-of-a-Kind</span>
          </div>
        </div>
      </section>
    </div>
  )
}
