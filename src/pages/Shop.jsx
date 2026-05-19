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

  useEffect(() => {
    supabase.from('categories').select('*').order('sort_order').then(({ data }) => setCategories(data || []))
  }, [])

  useEffect(() => {
    setLoading(true)
    let query = supabase.from('products').select('*, product_images(url, sort_order), categories(name, slug)').eq('status', 'active').order('created_at', { ascending: false })

    if (activeCategory !== 'all') {
      query = query.eq('categories.slug', activeCategory)
    }

    query.then(({ data }) => {
      let filtered = data || []
      if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.categories?.slug === activeCategory)
      }
      setProducts(filtered)
      setLoading(false)
    })
  }, [activeCategory])

  const displayed = search
    ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : products

  return (
    <div className="min-h-screen bg-navy-deep text-white">
      {/* Header */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-purple-deep/30 to-navy-deep" />
        <div className="absolute -left-32 top-0 w-96 h-96 rounded-full bg-purple/15 blur-[100px]" />
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-lime/10 blur-[60px]" />
        <div className="absolute top-0 left-0 right-0 gold-line" />
        <div className="max-w-7xl mx-auto relative text-center">
          <p className="text-gold tracking-[0.4em] uppercase text-sm font-bold mb-4">Shop</p>
          <h1 className="font-display text-5xl md:text-7xl font-black">The Collection</h1>
        </div>
      </section>

      <div className="gold-line" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-10">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSearchParams({})}
              className={`rounded-full px-5 py-3 font-bold border transition ${activeCategory === 'all' ? 'bg-purple text-white border-purple shadow-lg shadow-purple/20' : 'bg-white/5 text-white/60 border-white/10 hover:border-purple/50 hover:text-white'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.slug })}
                className={`rounded-full px-5 py-3 font-bold border transition ${activeCategory === cat.slug ? 'bg-purple text-white border-purple shadow-lg shadow-purple/20' : 'bg-white/5 text-white/60 border-white/10 hover:border-purple/50 hover:text-white'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-11 pr-5 py-3 rounded-full border border-white/10 bg-white/5 font-semibold w-full md:w-64 text-white placeholder:text-white/30 focus:border-purple/50 focus:outline-none transition"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-purple-light">Loading products...</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-20">
            <Gem size={48} className="mx-auto mb-4 text-white/20" />
            <h3 className="text-2xl font-black mb-2">No products yet</h3>
            <p className="text-white/50">New items are being added soon. Check back!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map((product, i) => {
              const images = (product.product_images || []).sort((a, b) => a.sort_order - b.sort_order)
              const img = images[0]?.url
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="art-card bg-white/[0.03] backdrop-blur-sm rounded-[2rem] overflow-hidden border border-white/10 group">
                    <Link to={`/product/${product.slug}`}>
                      {img ? (
                        <div className="aspect-square overflow-hidden relative">
                          <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                        </div>
                      ) : (
                        <div className="aspect-square bg-navy-light flex items-center justify-center">
                          <Gem size={48} className="text-white/10" />
                        </div>
                      )}
                    </Link>
                    <div className="p-6">
                      <p className="text-xs font-black tracking-[0.25em] uppercase text-purple-light mb-1">{product.categories?.name}</p>
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="text-xl font-black mb-2 hover:text-lime transition">{product.name}</h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white">${Number(product.price).toFixed(2)}</span>
                          {product.compare_at_price && (
                            <span className="text-sm text-white/30 line-through">${Number(product.compare_at_price).toFixed(2)}</span>
                          )}
                        </div>
                        <button
                          onClick={() => addItem({ id: product.id, name: product.name, price: Number(product.price), image: img })}
                          className="bg-gradient-to-r from-purple to-purple-deep text-white rounded-full px-4 py-2 font-bold text-sm hover:scale-105 transition-all shadow-lg hover:shadow-purple/30 border border-purple-light/30"
                        >
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
