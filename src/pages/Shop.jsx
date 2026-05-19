import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Gem, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useCart } from '../lib/cart'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const { addItem } = useCart()
  const activeCategory = searchParams.get('category') || 'all'

  useEffect(() => { supabase.from('categories').select('*').order('sort_order').then(({ data }) => setCategories(data || [])) }, [])

  useEffect(() => {
    setLoading(true)
    let query = supabase.from('products').select('*, product_images(url, sort_order), categories(name, slug)').eq('status', 'active').order('created_at', { ascending: false })
    if (activeCategory !== 'all') query = query.eq('categories.slug', activeCategory)
    query.then(({ data }) => {
      let filtered = data || []
      if (activeCategory !== 'all') filtered = filtered.filter(p => p.categories?.slug === activeCategory)
      setProducts(filtered)
      setLoading(false)
    })
  }, [activeCategory])

  const displayed = search ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : products

  return (
    <div className="min-h-screen canvas-bg text-navy">
      <section className="hero-painted relative py-20 px-6 overflow-hidden">
        <img src="/textures/splat-1.png" alt="" className="paint-splat top-[10%] left-[8%] w-[200px]" style={{ filter: 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(37deg)', opacity: 0.12 }} />
        <img src="/textures/splat-3.png" alt="" className="paint-splat bottom-[15%] right-[10%] w-[180px]" style={{ filter: 'invert(60%) sepia(100%) saturate(400%) hue-rotate(14deg)', opacity: 0.08 }} />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="badge-painted mb-4">Shop</span>
          <h1 className="font-display text-5xl md:text-7xl font-black text-white mt-4" style={{ textShadow: '0 3px 12px rgba(0,0,0,0.8), 0 6px 30px rgba(0,0,0,0.5)' }}>The Collection</h1>
        </div>
      </section>

      <div className="paint-edge relative z-20" style={{ marginTop: '-1px' }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: '35px' }}>
          <path d="M0,0 C80,45 160,8 240,28 C320,52 400,5 480,32 C560,55 640,12 720,35 C800,58 880,8 960,22 C1040,42 1120,5 1200,28 C1280,52 1360,18 1440,35 L1440,70 L0,70 Z" fill="#f5efe4" />
        </svg>
      </div>
      <div className="paint-divider" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-10">
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setSearchParams({})}
              className={`rounded-full px-5 py-3 font-black transition-all ${activeCategory === 'all' ? 'btn-painted-purple' : 'card-painted-round border-0'}`}>
              All
            </button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSearchParams({ category: cat.slug })}
                className={`rounded-full px-5 py-3 font-black transition-all ${activeCategory === cat.slug ? 'btn-painted-purple' : 'card-painted-round border-0'}`}>
                {cat.name}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="input-painted pl-11 pr-5 py-3 rounded-full w-full md:w-64" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-purple">Loading products...</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-20">
            <Gem size={48} className="mx-auto mb-4 text-gold/30" />
            <h3 className="text-2xl font-black mb-2">No products yet</h3>
            <p className="text-navy/70">New items are being added soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map((product, i) => {
              const images = (product.product_images || []).sort((a, b) => a.sort_order - b.sort_order)
              const img = images[0]?.url
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="card-painted-round rounded-[2rem] overflow-hidden group">
                    <Link to={`/product/${product.slug}`}>
                      {img ? (
                        <div className="aspect-square overflow-hidden">
                          <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                        </div>
                      ) : (
                        <div className="aspect-square bg-cream flex items-center justify-center"><Gem size={48} className="text-gold/20" /></div>
                      )}
                    </Link>
                    <div className="p-6">
                      <p className="text-xs font-black tracking-[0.25em] uppercase text-purple mb-1">{product.categories?.name}</p>
                      <Link to={`/product/${product.slug}`}><h3 className="text-xl font-black mb-2 hover:text-purple transition">{product.name}</h3></Link>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
                          {product.compare_at_price && <span className="text-sm text-navy/60 line-through">${Number(product.compare_at_price).toFixed(2)}</span>}
                        </div>
                        <button onClick={() => addItem({ id: product.id, name: product.name, price: Number(product.price), image: img })}
                          className="btn-painted-purple rounded-full px-4 py-2 font-bold text-sm">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
