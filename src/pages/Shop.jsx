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
    <div className="min-h-screen bg-canvas text-navy">
      {/* Header */}
      <section className="hero-paint relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-royal/15 blur-[80px] translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-purple/15 blur-[60px] -translate-x-1/4" />
        <div className="absolute top-16 left-20 w-24 h-3 bg-lime/25 rounded-full rotate-[-15deg]" />
        <div className="absolute bottom-12 right-16 w-16 h-3 bg-purple/20 rounded-full rotate-[10deg]" />

        <div className="max-w-7xl mx-auto relative text-center">
          <span className="blob-purple text-xs tracking-[0.35em] uppercase mb-4 inline-block">Shop</span>
          <h1 className="font-display text-5xl md:text-7xl font-black text-navy mt-4">The Collection</h1>
        </div>
      </section>

      <div className="paint-divider" />

      <div className="max-w-7xl mx-auto px-6 py-12 canvas-bg">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-10">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSearchParams({})}
              className={`rounded-full px-5 py-3 font-black border-2 transition ${activeCategory === 'all' ? 'bg-purple text-white border-purple' : 'bg-white text-navy border-cream-dark hover:border-purple'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.slug })}
                className={`rounded-full px-5 py-3 font-black border-2 transition ${activeCategory === cat.slug ? 'bg-purple text-white border-purple' : 'bg-white text-navy border-cream-dark hover:border-purple'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-11 pr-5 py-3 rounded-full border-2 border-cream-dark bg-white font-semibold w-full md:w-64 text-navy placeholder:text-navy/30 focus:border-purple focus:outline-none transition"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-purple">Loading products...</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-20">
            <Gem size={48} className="mx-auto mb-4 text-cream-dark" />
            <h3 className="text-2xl font-black mb-2">No products yet</h3>
            <p className="text-navy/50">New items are being added soon. Check back!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map((product, i) => {
              const images = (product.product_images || []).sort((a, b) => a.sort_order - b.sort_order)
              const img = images[0]?.url
              const shadows = ['#7a1fad', '#063c86', '#a7c900']
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="bg-white rounded-[2rem] overflow-hidden group transition-all duration-300 border-2 border-cream-dark hover:border-purple" style={{ boxShadow: `6px 6px 0 ${shadows[i % 3]}` }}>
                    <Link to={`/product/${product.slug}`}>
                      {img ? (
                        <div className="aspect-square overflow-hidden">
                          <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                        </div>
                      ) : (
                        <div className="aspect-square bg-cream flex items-center justify-center">
                          <Gem size={48} className="text-cream-dark" />
                        </div>
                      )}
                    </Link>
                    <div className="p-6">
                      <p className="text-xs font-black tracking-[0.25em] uppercase text-purple mb-1">{product.categories?.name}</p>
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="text-xl font-black mb-2 hover:text-purple transition">{product.name}</h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
                          {product.compare_at_price && (
                            <span className="text-sm text-navy/30 line-through">${Number(product.compare_at_price).toFixed(2)}</span>
                          )}
                        </div>
                        <button
                          onClick={() => addItem({ id: product.id, name: product.name, price: Number(product.price), image: img })}
                          className="bg-purple text-white rounded-full px-4 py-2 font-bold text-sm hover:scale-105 transition-all shadow-md"
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
