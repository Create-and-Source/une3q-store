import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles, Heart, Sun, Gem, Palette, Home as HomeIcon, ArrowRight, Fingerprint } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useCart } from '../lib/cart'

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
    <div className="min-h-screen overflow-hidden">

      {/* ===== HERO ===== */}
      <section className="hero-painted relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Painted splashes */}
        <div className="absolute top-10 left-[5%] w-[300px] h-[200px] rounded-[60%_40%_50%_50%] rotate-[-15deg] opacity-40"
          style={{ background: 'radial-gradient(ellipse, rgba(167,201,0,0.5) 0%, rgba(201,168,76,0.2) 40%, transparent 70%)' }} />
        <div className="absolute bottom-20 right-[10%] w-[250px] h-[180px] rounded-[45%_55%_50%_50%] rotate-[10deg] opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(122,31,173,0.5) 0%, rgba(6,60,134,0.3) 40%, transparent 70%)' }} />
        <div className="absolute top-[40%] right-[30%] w-[200px] h-[150px] rounded-[55%_45%_40%_60%] rotate-[-5deg] opacity-25"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.5) 0%, transparent 60%)' }} />

        {/* Gold speckle dots */}
        <div className="absolute top-[15%] right-[20%] w-2 h-2 rounded-full bg-gold/50" />
        <div className="absolute top-[25%] right-[35%] w-1.5 h-1.5 rounded-full bg-gold/40" />
        <div className="absolute bottom-[30%] left-[15%] w-2.5 h-2.5 rounded-full bg-gold/45" />
        <div className="absolute top-[60%] left-[40%] w-1 h-1 rounded-full bg-gold/50" />
        <div className="absolute bottom-[20%] right-[45%] w-2 h-2 rounded-full bg-gold-light/30" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="badge-painted mb-8">Art. Soul. Style.</div>

            <h2 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.95] mb-8 text-white drop-shadow-lg">
              <span className="block">Creativity</span>
              <span className="block">is your</span>
              <span className="block brush-underline text-painted">superpower.</span>
            </h2>

            <p className="font-script text-2xl md:text-3xl text-white/60 mb-4 rotate-[-1deg]">
              We just help you express it.
            </p>
            <p className="text-lg text-white/50 mb-10 leading-relaxed max-w-lg">
              Unique arts, handmade jewelry, and home decor — made different, made by heart.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="group btn-painted-blue px-8 py-4 rounded-full font-black text-center text-lg flex items-center justify-center gap-2 transition-all">
                Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/custom" className="btn-painted-lime px-8 py-4 rounded-full font-black text-center text-lg transition-all">
                Custom Piece
              </Link>
            </div>
          </motion.div>

          {/* Hero card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
            <div className="card-painted-round rounded-[2.5rem] p-10 overflow-hidden">
              <p className="text-purple tracking-[0.4em] uppercase text-sm font-black mb-4">UNE3Q LLC</p>
              <h3 className="font-display text-5xl md:text-6xl font-black text-navy leading-none mb-6">
                Be you,<br />Be <span className="text-painted">UNE3Q.</span>
                <span className="text-purple ml-1">&hearts;</span>
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Unique', icon: Fingerprint, cls: 'icon-painted-purple text-white' },
                  { label: 'Authentic', icon: Heart, cls: 'icon-painted-blue text-white' },
                  { label: 'Limitless', icon: Sun, cls: 'icon-painted-lime text-navy' },
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className={`${item.cls} rounded-2xl p-4 text-center`}>
                      <Icon className="mx-auto mb-2" size={22} />
                      <p className="font-black uppercase text-[10px] tracking-[0.25em]">{item.label}</p>
                    </div>
                  )
                })}
              </div>

              <div className="rounded-2xl p-5" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(243,234,219,0.8), rgba(245,239,228,0.6))', border: '1px solid rgba(201,168,76,0.3)' }}>
                <p className="font-script text-2xl text-navy/70 text-center leading-snug">
                  "Every piece tells a story. Yours. Uniquely <span className="text-painted font-bold">YOU</span>."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gold-line" />
      </section>

      <div className="paint-divider" />

      {/* ===== CATEGORIES ===== */}
      <section className="canvas-bg relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-painted mb-4">Shop the Collection</span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-navy mt-6">Browse by Category</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Handmade Jewelry', icon: Gem, desc: 'Bracelets, earrings, pendants crafted with soul and style.', iconCls: 'icon-painted-purple' },
              { name: 'Unique Arts', icon: Palette, desc: 'Colorful wall art and modern pieces made different, made by heart.', iconCls: 'icon-painted-blue' },
              { name: 'Home Decor', icon: HomeIcon, desc: 'Artful pieces that bring color and individuality to your space.', iconCls: 'icon-painted-lime' },
            ].map((cat, i) => {
              const Icon = cat.icon
              const matchingCat = categories.find(c => c.name === cat.name || c.name === cat.name.replace('Unique Arts', 'Art').replace('Handmade Jewelry', 'Jewelry'))
              return (
                <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <Link to={matchingCat ? `/shop?category=${matchingCat.slug}` : '/shop'}
                    className="card-painted-round block rounded-[2rem] p-8 text-center group">
                    <div className={`w-20 h-20 rounded-full ${cat.iconCls} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all`}>
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
      <section className="painted-dark relative py-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <p className="font-script text-4xl md:text-6xl text-white/90 leading-snug drop-shadow-lg">
            "Creativity is your <span className="text-painted">superpower.</span><br />
            We just help you <span className="text-painted">express it.</span>"
          </p>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      {products.length > 0 && (
        <section className="canvas-bg relative py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="badge-painted mb-4">Featured</span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-navy mt-6">Made with Heart</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product, i) => {
                const img = product.product_images?.[0]?.url
                return (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Link to={`/product/${product.slug}`} className="card-painted-round block rounded-[2rem] overflow-hidden group">
                      {img ? (
                        <div className="aspect-square overflow-hidden">
                          <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        </div>
                      ) : (
                        <div className="aspect-square bg-cream flex items-center justify-center"><Gem size={48} className="text-cream/50" /></div>
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
              <Link to="/shop" className="inline-flex items-center gap-2 btn-painted-purple px-8 py-4 rounded-full font-black text-lg transition-all">
                <ShoppingBag size={20} /> View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {products.length === 0 && (
        <section className="canvas-bg relative py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="badge-painted mb-4">Coming Soon</span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-navy mt-6">Shop Opening Soon</h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto text-navy/50">Handmade jewelry, unique arts, and home decor — all made different, made by heart.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Handmade Jewelry', icon: Gem, cls: 'icon-painted-purple' },
                { title: 'Unique Arts', icon: Palette, cls: 'icon-painted-blue' },
                { title: 'Home Decor', icon: HomeIcon, cls: 'icon-painted-lime' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="card-painted-round rounded-[2rem] p-8">
                    <div className={`w-16 h-16 rounded-full ${item.cls} flex items-center justify-center mb-6`}>
                      <Icon className={i === 2 ? 'text-navy' : 'text-white'} size={30} />
                    </div>
                    <h3 className="text-2xl font-black text-navy mb-3">{item.title}</h3>
                    <p className="text-navy/50 leading-relaxed">Unique pieces crafted with soul and style.</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== CUSTOM CTA ===== */}
      <section className="hero-painted relative py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto relative text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge-painted mb-6">Custom Made</span>
            <h2 className="font-display text-4xl md:text-7xl font-black text-white mb-6 leading-tight mt-6 drop-shadow-lg">
              Handmade with <span className="text-painted">passion.</span><br />
              Designed to <span className="text-painted">stand out.</span>
            </h2>
            <p className="font-script text-2xl text-white/50 mb-10 rotate-[-1deg]">
              One-on-one custom work — jewelry, wall art, gifts, and decor
            </p>
            <Link to="/custom" className="inline-flex items-center gap-2 btn-painted-lime px-10 py-5 rounded-full font-black text-lg transition-all">
              Request a Custom Piece <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="paint-divider" />

      {/* ===== SERVICES ===== */}
      <section className="canvas-bg relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="badge-painted mb-4">Services</span>
              <h2 className="font-display text-4xl font-black text-navy mt-4 mb-4">More than a shop</h2>
              <p className="text-navy/50 leading-relaxed">Full creative services to bring your vision to life.</p>
            </motion.div>
            {['Personalized design consultations', 'Custom gift bundles', 'Art and decor commissions', 'Jewelry repair or redesign', 'Seasonal handmade collections', 'Local pickup or shipping'].map((service, i) => (
              <motion.div key={service} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="card-painted-round rounded-2xl p-6 font-bold flex items-center gap-4 text-navy group">
                  <div className={`w-10 h-10 rounded-full ${['icon-painted-purple','icon-painted-blue','icon-painted-lime'][i%3]} flex items-center justify-center shrink-0`}>
                    <Sparkles className={i%3===2 ? 'text-navy' : 'text-white'} size={18} />
                  </div>
                  <span>{service}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM TAGLINE ===== */}
      <section className="painted-dark relative py-16 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-6 drop-shadow-lg">
            Handmade with <span className="text-painted">passion.</span><br />
            Designed to <span className="text-painted">stand out.</span>
          </p>
          <div className="flex items-center justify-center gap-6 md:gap-8 text-white/40 text-sm font-bold uppercase tracking-[0.25em]">
            <span className="flex items-center gap-2"><Fingerprint size={16} className="text-purple-light" /> Handmade</span>
            <span className="text-gold text-lg">&bull;</span>
            <span className="flex items-center gap-2"><Heart size={16} className="text-purple-light" /> Heartfelt</span>
            <span className="text-gold text-lg">&bull;</span>
            <span className="flex items-center gap-2"><Sun size={16} className="text-purple-light" /> One-of-a-Kind</span>
          </div>
        </div>
      </section>
    </div>
  )
}
