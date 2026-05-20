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
      <section className="relative pt-16 pb-28 px-6 overflow-hidden">
        {/* Paint washes — soft color blobs */}
        <div className="wash-purple" style={{ top: '-15%', left: '-10%' }} />
        <div className="wash-blue" style={{ top: '10%', right: '-15%' }} />
        <div className="wash-lime" style={{ bottom: '-10%', left: '20%' }} />
        <div className="wash-gold" style={{ top: '30%', right: '30%' }} />

        {/* Paint splatter accents */}
        <img src="/textures/splat-1.png" alt="" className="paint-splat top-[5%] left-[2%] w-[300px]" style={{ filter: 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(37deg)' }} />
        <img src="/textures/splat-2.png" alt="" className="paint-splat bottom-[10%] right-[3%] w-[250px]" style={{ filter: 'invert(13%) sepia(96%) saturate(3861%) hue-rotate(266deg) brightness(80%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="badge-painted mb-8">Art. Soul. Style.</div>

            <h1 className="font-display text-6xl md:text-8xl lg:text-[6.5rem] font-black leading-[0.9] mb-8 text-navy">
              <span className="block">Creativity</span>
              <span className="block">is your</span>
              <span className="block brush-under text-painted">superpower.</span>
            </h1>

            <p className="font-script text-3xl md:text-4xl text-navy/80 mb-3 rotate-[-1deg]">
              We just help you express it.
            </p>
            <p className="text-lg text-navy/60 mb-10 leading-relaxed max-w-lg">
              Unique arts, handmade jewelry, and home decor — made different, made by heart.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="group btn-painted-purple px-8 py-4 rounded-full font-black text-center text-lg flex items-center justify-center gap-2">
                Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/custom" className="btn-painted-lime px-8 py-4 rounded-full font-black text-center text-lg">
                Custom Piece
              </Link>
            </div>
          </motion.div>

          {/* Hero card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
            <div className="card-canvas rounded-[2.5rem] p-10">
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

              <div className="rounded-2xl p-5 bg-canvas border border-gold/15">
                <p className="font-script text-2xl text-navy/70 text-center leading-snug">
                  "Every piece tells a story. Yours. Uniquely <span className="text-painted font-bold">YOU</span>."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6"><div className="paint-divider" /></div>

      {/* ===== CATEGORIES ===== */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="wash-purple" style={{ top: '20%', right: '-20%' }} />
        <div className="wash-lime" style={{ bottom: '-20%', left: '-15%' }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-painted mb-4">Shop the Collection</span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-navy mt-6">Browse by <span className="brush-under brush-under-purple">Category</span></h2>
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
                    className="card-canvas block rounded-[2rem] p-8 text-center group">
                    <div className={`w-20 h-20 rounded-full ${cat.iconCls} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                      <Icon size={34} className={i === 2 ? 'text-navy' : 'text-white'} />
                    </div>
                    <h3 className="text-2xl font-black text-navy mb-3 group-hover:text-purple transition">{cat.name}</h3>
                    <p className="text-navy/60 leading-relaxed">{cat.desc}</p>
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
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="wash-gold" style={{ top: '0', left: '10%' }} />
        <div className="wash-purple" style={{ bottom: '0', right: '10%' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="gold-line mb-10" />
          <p className="font-script text-5xl md:text-7xl text-navy leading-snug">
            "Creativity is your <span className="text-painted">superpower.</span>"
          </p>
          <p className="font-script text-3xl md:text-4xl text-navy/50 mt-2">
            We just help you <span className="text-painted">express it.</span>
          </p>
          <div className="gold-line mt-10" />
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      {products.length > 0 && (
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="wash-blue" style={{ top: '-10%', left: '-15%' }} />
          <div className="wash-lime" style={{ bottom: '-10%', right: '-10%' }} />

          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="badge-painted mb-4">Featured</span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-navy mt-6">Made with <span className="brush-under brush-under-gold">Heart</span></h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product, i) => {
                const img = product.product_images?.[0]?.url
                return (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Link to={`/product/${product.slug}`} className="card-canvas block rounded-[2rem] overflow-hidden group">
                      {img ? (
                        <div className="aspect-square overflow-hidden">
                          <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        </div>
                      ) : (
                        <div className="aspect-square bg-canvas flex items-center justify-center"><Gem size={48} className="text-gold/30" /></div>
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


      <div className="max-w-7xl mx-auto px-6"><div className="paint-divider" /></div>

      {/* ===== CUSTOM CTA ===== */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="wash-purple" style={{ top: '0', left: '-10%' }} />
        <div className="wash-lime" style={{ bottom: '0', right: '-10%' }} />
        <div className="wash-gold" style={{ top: '40%', right: '20%' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge-painted mb-6">Custom Made</span>
            <h2 className="font-display text-5xl md:text-8xl font-black text-navy mb-6 leading-tight mt-6">
              Handmade with <span className="text-painted">passion.</span>
            </h2>
            <h3 className="font-display text-4xl md:text-6xl font-black text-navy/50 mb-8 leading-tight">
              Designed to <span className="brush-under brush-under-purple text-navy">stand out.</span>
            </h3>
            <p className="font-script text-2xl text-navy/60 mb-10 rotate-[-1deg]">
              One-on-one custom work — jewelry, wall art, gifts, and decor
            </p>
            <Link to="/custom" className="inline-flex items-center gap-2 btn-painted-lime px-10 py-5 rounded-full font-black text-lg">
              Request a Custom Piece <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="wash-blue" style={{ top: '-10%', right: '-20%' }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="badge-painted mb-4">Services</span>
              <h2 className="font-display text-4xl font-black text-navy mt-4 mb-4">More than a <span className="brush-under">shop</span></h2>
              <p className="text-navy/60 leading-relaxed">Full creative services to bring your vision to life.</p>
            </motion.div>
            {['Personalized design consultations', 'Custom gift bundles', 'Art and decor commissions', 'Jewelry repair or redesign', 'Seasonal handmade collections', 'Local pickup or shipping'].map((service, i) => (
              <motion.div key={service} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="card-canvas rounded-2xl p-6 font-bold flex items-center gap-4 text-navy group">
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

      <div className="max-w-7xl mx-auto px-6"><div className="paint-divider" /></div>

      {/* ===== BOTTOM TAGLINE ===== */}
      <section className="relative py-20 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-display text-4xl md:text-6xl font-black text-navy leading-tight mb-8">
            Handmade with <span className="text-painted">passion.</span><br />
            Designed to <span className="text-painted">stand out.</span>
          </p>
          <div className="flex items-center justify-center gap-6 md:gap-8 text-navy/50 text-sm font-bold uppercase tracking-[0.25em]">
            <span className="flex items-center gap-2"><Fingerprint size={16} className="text-purple" /> Handmade</span>
            <span className="text-gold text-lg">&bull;</span>
            <span className="flex items-center gap-2"><Heart size={16} className="text-purple" /> Heartfelt</span>
            <span className="text-gold text-lg">&bull;</span>
            <span className="flex items-center gap-2"><Sun size={16} className="text-purple" /> One-of-a-Kind</span>
          </div>
        </div>
      </section>
    </div>
  )
}
