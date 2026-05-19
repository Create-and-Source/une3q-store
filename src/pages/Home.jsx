import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles, Heart, Sun, Gem, Palette, Home as HomeIcon, ArrowRight, Fingerprint } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useCart } from '../lib/cart'

/* Wavy paint edge between sections */
function PaintEdge({ fill = '#f5efe4', flip = false, className = '' }) {
  return (
    <div className={`paint-edge relative z-20 ${flip ? 'rotate-180' : ''} ${className}`} style={{ marginTop: '-1px', marginBottom: '-1px' }}>
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: '35px' }}>
        <path d="M0,0 C80,45 160,8 240,28 C320,52 400,5 480,32 C560,55 640,12 720,35 C800,58 880,8 960,22 C1040,42 1120,5 1200,28 C1280,52 1360,18 1440,35 L1440,70 L0,70 Z" fill={fill} />
      </svg>
    </div>
  )
}

/* Real paint splatter decoration */
function Splat({ src = '/textures/splat-1.png', className = '', color = '#7a1fad', style = {} }) {
  return (
    <img src={src} alt="" className={`paint-splat ${className}`}
      style={{ filter: `opacity(0.2) drop-shadow(0 0 0 ${color})`, ...style }}
      draggable={false} />
  )
}

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
        {/* Real paint splatters */}
        <img src="/textures/splat-1.png" alt="" className="paint-splat top-[5%] left-[3%] w-[300px]" style={{ filter: 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(37deg) brightness(101%) contrast(97%)', opacity: 0.15 }} />
        <img src="/textures/splat-2.png" alt="" className="paint-splat bottom-[8%] right-[5%] w-[250px]" style={{ filter: 'invert(13%) sepia(96%) saturate(3861%) hue-rotate(266deg) brightness(80%) contrast(107%)', opacity: 0.12 }} />
        <img src="/textures/splat-3.png" alt="" className="paint-splat top-[30%] right-[20%] w-[200px]" style={{ filter: 'invert(60%) sepia(100%) saturate(400%) hue-rotate(14deg) brightness(95%) contrast(95%)', opacity: 0.1 }} />
        <img src="/textures/splat-4.png" alt="" className="paint-splat bottom-[30%] left-[15%] w-[180px]" style={{ filter: 'invert(20%) sepia(50%) saturate(2000%) hue-rotate(200deg) brightness(90%) contrast(100%)', opacity: 0.1 }} />

        {/* Gold paint speckles */}
        <div className="absolute top-[12%] right-[18%] w-3 h-3 rounded-full bg-gold/50 blur-[1px]" />
        <div className="absolute top-[22%] right-[32%] w-2 h-2 rounded-full bg-gold/40 blur-[1px]" />
        <div className="absolute bottom-[28%] left-[12%] w-3.5 h-3.5 rounded-full bg-gold/45 blur-[1px]" />
        <div className="absolute top-[55%] left-[38%] w-1.5 h-1.5 rounded-full bg-gold-light/40" />
        <div className="absolute bottom-[18%] right-[42%] w-2.5 h-2.5 rounded-full bg-gold/35 blur-[1px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="badge-painted mb-8">Art. Soul. Style.</div>

            <h2 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.95] mb-8 text-white" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.8), 0 6px 30px rgba(0,0,0,0.5)' }}>
              <span className="block">Creativity</span>
              <span className="block">is your</span>
              <span className="block brush-underline text-painted">superpower.</span>
            </h2>

            <p className="font-script text-2xl md:text-3xl text-white mb-4 rotate-[-1deg]" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              We just help you express it.
            </p>
            <p className="text-lg text-white mb-10 leading-relaxed max-w-lg" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Unique arts, handmade jewelry, and home decor — made different, made by heart.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="group btn-painted-blue px-8 py-4 rounded-full font-black text-center text-lg flex items-center justify-center gap-2">
                Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/custom" className="btn-painted-lime px-8 py-4 rounded-full font-black text-center text-lg">
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

              <div className="rounded-2xl p-5" style={{
                background: "url('/textures/canvas-weave.jpg') repeat #f3eadb",
                backgroundBlendMode: 'multiply',
                boxShadow: 'inset 0 0 0 2px rgba(201,168,76,0.3), inset 0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <p className="font-script text-2xl text-navy/70 text-center leading-snug">
                  "Every piece tells a story. Yours. Uniquely <span className="text-painted font-bold">YOU</span>."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gold-line" />
      </section>

      {/* Brush stroke divider */}
      <PaintEdge fill="#f5efe4" />
      <div className="paint-divider" />

      {/* ===== CATEGORIES ===== */}
      <section className="canvas-bg relative py-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
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
                    <p className="text-navy/70 leading-relaxed">{cat.desc}</p>
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

      {/* Painted edge transition */}
      <PaintEdge fill="#071f47" flip />

      {/* ===== QUOTE BANNER ===== */}
      <section className="painted-dark relative py-16 overflow-hidden">
        <img src="/textures/splat-2.png" alt="" className="paint-splat top-[10%] left-[5%] w-[200px]" style={{ filter: 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(37deg) brightness(101%) contrast(97%)', opacity: 0.08 }} />
        <img src="/textures/splat-3.png" alt="" className="paint-splat bottom-[10%] right-[8%] w-[180px]" style={{ filter: 'invert(60%) sepia(100%) saturate(400%) hue-rotate(14deg) brightness(95%) contrast(95%)', opacity: 0.06 }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="font-script text-4xl md:text-6xl text-white leading-snug" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.8), 0 6px 30px rgba(0,0,0,0.5)' }}>
            "Creativity is your <span className="text-painted">superpower.</span><br />
            We just help you <span className="text-painted">express it.</span>"
          </p>
        </div>
      </section>

      <PaintEdge fill="#f5efe4" />

      {/* ===== FEATURED PRODUCTS ===== */}
      {products.length > 0 && (
        <section className="canvas-bg relative py-24">
          <div className="relative z-10 max-w-7xl mx-auto px-6">
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
              <Link to="/shop" className="inline-flex items-center gap-2 btn-painted-purple px-8 py-4 rounded-full font-black text-lg">
                <ShoppingBag size={20} /> View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {products.length === 0 && (
        <section className="canvas-bg relative py-24">
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="badge-painted mb-4">Coming Soon</span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-navy mt-6">Shop Opening Soon</h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto text-navy/70">Handmade jewelry, unique arts, and home decor — all made different, made by heart.</p>
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
                    <p className="text-navy/70 leading-relaxed">Unique pieces crafted with soul and style.</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <PaintEdge fill="#071f47" flip />

      {/* ===== CUSTOM CTA ===== */}
      <section className="hero-painted relative py-28 overflow-hidden">
        <img src="/textures/splat-1.png" alt="" className="paint-splat top-[15%] right-[10%] w-[250px]" style={{ filter: 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(37deg) brightness(101%) contrast(97%)', opacity: 0.12 }} />
        <img src="/textures/splat-4.png" alt="" className="paint-splat bottom-[20%] left-[8%] w-[200px]" style={{ filter: 'invert(60%) sepia(100%) saturate(400%) hue-rotate(14deg) brightness(95%) contrast(95%)', opacity: 0.1 }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge-painted mb-6">Custom Made</span>
            <h2 className="font-display text-4xl md:text-7xl font-black text-white mb-6 leading-tight mt-6" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.8), 0 6px 30px rgba(0,0,0,0.5)' }}>
              Handmade with <span className="text-painted">passion.</span><br />
              Designed to <span className="text-painted">stand out.</span>
            </h2>
            <p className="font-script text-2xl text-white mb-10 rotate-[-1deg]" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              One-on-one custom work — jewelry, wall art, gifts, and decor
            </p>
            <Link to="/custom" className="inline-flex items-center gap-2 btn-painted-lime px-10 py-5 rounded-full font-black text-lg">
              Request a Custom Piece <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <PaintEdge fill="#f5efe4" />
      <div className="paint-divider" />

      {/* ===== SERVICES ===== */}
      <section className="canvas-bg relative py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="badge-painted mb-4">Services</span>
              <h2 className="font-display text-4xl font-black text-navy mt-4 mb-4">More than a shop</h2>
              <p className="text-navy/70 leading-relaxed">Full creative services to bring your vision to life.</p>
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

      <PaintEdge fill="#071f47" flip />

      {/* ===== BOTTOM TAGLINE ===== */}
      <section className="painted-dark relative py-16 overflow-hidden">
        <img src="/textures/splat-3.png" alt="" className="paint-splat top-[20%] left-[10%] w-[150px]" style={{ filter: 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(37deg) brightness(101%) contrast(97%)', opacity: 0.06 }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <p className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-6" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.8), 0 6px 30px rgba(0,0,0,0.5)' }}>
            Handmade with <span className="text-painted">passion.</span><br />
            Designed to <span className="text-painted">stand out.</span>
          </p>
          <div className="flex items-center justify-center gap-6 md:gap-8 text-white/80 text-sm font-bold uppercase tracking-[0.25em]">
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
