import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles, Heart, Sun, Gem, Palette, Home as HomeIcon, ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useCart } from '../lib/cart'

const VALUES = [
  { label: 'Unique', icon: Sparkles, color: 'from-purple to-purple-deep' },
  { label: 'Authentic', icon: Heart, color: 'from-royal to-navy' },
  { label: 'Limitless', icon: Sun, color: 'from-lime to-lime-light' },
]

const CATEGORIES_DISPLAY = [
  { name: 'Handmade Jewelry', icon: Gem, desc: 'Bracelets, earrings, pendants crafted with soul and style.', accent: 'purple' },
  { name: 'Unique Arts', icon: Palette, desc: 'Colorful wall art and modern pieces made different, made by heart.', accent: 'royal' },
  { name: 'Home Decor', icon: HomeIcon, desc: 'Artful pieces that bring color and individuality to your space.', accent: 'lime' },
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
    <div className="min-h-screen bg-navy-deep text-white overflow-hidden">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Painterly background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-purple-deep" />
          <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-purple/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[70%] h-[60%] bg-gradient-to-tr from-royal/30 to-transparent" />
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-purple/15 blur-[100px]" />
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-lime/10 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-royal/10 blur-[120px]" />
          {/* Gold accent lines */}
          <div className="absolute top-32 right-32 w-48 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="absolute bottom-40 left-16 w-32 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute top-1/4 right-16 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-gold/30 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
              <Star size={14} className="text-gold" />
              <span className="font-bold uppercase tracking-[0.35em] text-xs text-gold-light">Art. Soul. Style.</span>
            </div>

            {/* Main heading */}
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8">
              <span className="block text-white">Creativity</span>
              <span className="block text-white">is your</span>
              <span className="block relative">
                <span className="gold-shimmer">superpower.</span>
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-lg">
              We just help you express it. Unique arts, handmade jewelry, and home decor — made different, made by heart.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="group bg-gradient-to-r from-purple to-purple-deep text-white px-8 py-4 rounded-full font-bold text-center shadow-xl hover:shadow-purple/40 hover:scale-105 transition-all flex items-center justify-center gap-2 border border-purple-light/30">
                Shop the Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/custom" className="bg-lime/10 text-lime border border-lime/30 px-8 py-4 rounded-full font-bold text-center hover:bg-lime/20 hover:scale-105 transition-all">
                Request Custom Work
              </Link>
            </div>
          </motion.div>

          {/* Hero art card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative hidden lg:block">
            <div className="relative">
              {/* Decorative splash behind */}
              <div className="absolute -inset-8 bg-gradient-to-br from-purple/20 via-royal/10 to-lime/10 rounded-[3rem] blur-xl" />

              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-sm">
                {/* Gold corner accents */}
                <div className="absolute top-0 left-8 w-16 h-px bg-gradient-to-r from-gold/60 to-transparent" />
                <div className="absolute top-0 left-8 w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" />
                <div className="absolute bottom-0 right-8 w-16 h-px bg-gradient-to-l from-gold/60 to-transparent" />
                <div className="absolute bottom-0 right-8 w-px h-16 bg-gradient-to-t from-gold/60 to-transparent" />

                <p className="text-gold tracking-[0.4em] uppercase text-sm font-bold mb-6">UNE3Q LLC</p>

                <h3 className="font-display text-6xl font-black leading-none mb-8">
                  Be you,<br />
                  Be <span className="text-lime">UNE3Q.</span>
                  <span className="text-purple ml-1">&hearts;</span>
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {VALUES.map(item => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm hover:border-gold/30 transition">
                        <Icon className="mx-auto mb-2 text-gold" size={22} />
                        <p className="font-black uppercase text-[10px] tracking-[0.25em] text-white/70">{item.label}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-navy/60 rounded-2xl p-5 border border-white/5">
                  <p className="font-display text-lg italic text-white/80 leading-relaxed">
                    "Every piece tells a story. Yours. Uniquely <span className="text-lime font-bold not-italic">YOU</span>."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom gold divider */}
        <div className="absolute bottom-0 left-0 right-0 gold-line" />
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 paint-bg" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-gold tracking-[0.4em] uppercase text-sm font-bold mb-4">Shop the Collection</p>
            <h2 className="font-display text-4xl md:text-6xl font-black">Browse by Category</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {CATEGORIES_DISPLAY.map((cat, i) => {
              const Icon = cat.icon
              const matchingCat = categories.find(c => c.name === cat.name || c.name === cat.name.replace('Unique Arts', 'Art').replace('Handmade Jewelry', 'Jewelry'))
              return (
                <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <Link
                    to={matchingCat ? `/shop?category=${matchingCat.slug}` : '/shop'}
                    className="art-card gold-border block bg-white/[0.03] backdrop-blur-sm rounded-[2rem] p-8 text-center group"
                  >
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${cat.accent === 'purple' ? 'from-purple to-purple-deep' : cat.accent === 'royal' ? 'from-royal to-navy' : 'from-lime/80 to-lime'} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon size={34} className={cat.accent === 'lime' ? 'text-navy' : 'text-white'} />
                    </div>
                    <h3 className="text-2xl font-black mb-3 group-hover:text-lime transition">{cat.name}</h3>
                    <p className="text-white/50 leading-relaxed">{cat.desc}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition">
                      Explore <ArrowRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="paint-divider" />

      {/* ===== FEATURED PRODUCTS ===== */}
      {products.length > 0 && (
        <section className="relative py-24 cream-textured text-navy">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-purple font-black uppercase tracking-[0.35em] mb-4">Featured</p>
              <h2 className="font-display text-4xl md:text-6xl font-black text-navy">Made with Heart</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product, i) => {
                const img = product.product_images?.[0]?.url
                return (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Link to={`/product/${product.slug}`} className="art-card block bg-white rounded-[2rem] overflow-hidden shadow-xl border border-cream-dark group">
                      {img ? (
                        <div className="aspect-square overflow-hidden relative">
                          <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                        </div>
                      ) : (
                        <div className="aspect-square bg-cream flex items-center justify-center">
                          <Gem size={48} className="text-cream-dark" />
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-xs font-black tracking-[0.25em] uppercase text-purple mb-1">{product.categories?.name}</p>
                        <h3 className="text-xl font-black text-navy mb-2">{product.name}</h3>
                        <p className="text-navy/70 text-lg font-bold">${Number(product.price).toFixed(2)}</p>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <div className="text-center mt-14">
              <Link to="/shop" className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-navy/30 hover:scale-105 transition-all border border-navy-light">
                <ShoppingBag size={18} /> View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* If no products, show placeholder */}
      {products.length === 0 && (
        <section className="relative py-24 cream-textured text-navy">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-purple font-black uppercase tracking-[0.35em] mb-4">Coming Soon</p>
              <h2 className="font-display text-4xl md:text-6xl font-black text-navy">Shop Opening Soon</h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto text-navy/60">Handmade jewelry, unique arts, and home decor — all made different, made by heart.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {CATEGORIES_DISPLAY.map((cat, i) => {
                const Icon = cat.icon
                return (
                  <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-cream-dark">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${cat.accent === 'purple' ? 'from-purple to-purple-deep' : cat.accent === 'royal' ? 'from-royal to-navy' : 'from-lime/80 to-lime'} flex items-center justify-center mb-6`}>
                        <Icon className={cat.accent === 'lime' ? 'text-navy' : 'text-white'} size={30} />
                      </div>
                      <h3 className="text-2xl font-black text-navy mb-3">{cat.name}</h3>
                      <p className="text-navy/60 leading-relaxed">{cat.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <div className="paint-divider" />

      {/* ===== CUSTOM CTA ===== */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-purple-deep/40 to-navy-deep" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -left-32 top-1/4 w-96 h-96 rounded-full bg-purple/20 blur-[100px]" />
          <div className="absolute -right-32 bottom-1/4 w-80 h-80 rounded-full bg-lime/10 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-royal/10 blur-[120px]" />
        </div>
        {/* Gold lines */}
        <div className="absolute top-16 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute bottom-16 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="max-w-5xl mx-auto relative text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-gold tracking-[0.4em] uppercase text-sm font-bold mb-6">Custom Made</p>
            <h2 className="font-display text-4xl md:text-7xl font-black mb-6 leading-tight">
              Handmade with <span className="text-purple-light">passion.</span><br />
              Designed to <span className="text-lime">stand out.</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto mb-10">
              Request one-on-one custom work for jewelry, wall art, handmade gifts, and home decor that shows your individuality.
            </p>
            <Link to="/custom" className="inline-flex items-center gap-2 bg-lime text-navy px-10 py-5 rounded-full font-black text-lg shadow-xl hover:shadow-lime/30 hover:scale-105 transition-all">
              Request a Custom Piece <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="gold-line" />

      {/* ===== SERVICES ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 paint-bg" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-1">
              <p className="text-gold tracking-[0.4em] uppercase text-sm font-bold mb-4">Services</p>
              <h2 className="font-display text-4xl font-black mb-4">More than a shop</h2>
              <p className="text-white/40 leading-relaxed">We offer full creative services to bring your vision to life.</p>
            </motion.div>
            {[
              'Personalized design consultations',
              'Custom gift bundles',
              'Art and decor commissions',
              'Jewelry repair or redesign',
              'Seasonal handmade collections',
              'Local pickup or shipping',
            ].map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold/30 transition flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple/30 to-royal/30 flex items-center justify-center shrink-0 group-hover:from-purple/50 group-hover:to-royal/50 transition">
                  <Sparkles className="text-lime" size={18} />
                </div>
                <span className="font-bold text-white/80 group-hover:text-white transition">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM TAGLINE ===== */}
      <section className="relative py-16 overflow-hidden">
        <div className="gold-line mb-16" />
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="font-display text-3xl md:text-5xl font-black leading-tight mb-8">
              <span className="text-white/40">Handmade with </span>
              <span className="text-purple-light">passion.</span>
              <br />
              <span className="text-white/40">Designed to </span>
              <span className="text-lime">stand out.</span>
            </p>
            <div className="flex items-center justify-center gap-8 text-white/30 text-sm font-bold uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2"><Sparkles size={14} className="text-gold" /> Handmade</span>
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span className="flex items-center gap-2"><Heart size={14} className="text-gold" /> Heartfelt</span>
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span className="flex items-center gap-2"><Sun size={14} className="text-gold" /> One-of-a-Kind</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
