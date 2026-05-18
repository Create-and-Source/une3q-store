import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Gem, Search } from 'lucide-react'
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
    <div className="min-h-screen bg-[#f3eadb] text-[#071f47]">
      <section className="bg-[#071f47] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#7a1fad] opacity-30" />
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-[#a7c900] opacity-20" />
        <div className="max-w-7xl mx-auto relative text-center">
          <p className="text-[#a7c900] font-black uppercase tracking-[0.35em] mb-3">Shop</p>
          <h1 className="text-4xl md:text-6xl font-black">The Collection</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSearchParams({})}
              className={`rounded-full px-5 py-3 font-black border transition ${activeCategory === 'all' ? 'bg-[#063c86] text-white border-[#063c86]' : 'bg-white/70 text-[#071f47] border-[#d9c8a6] hover:border-[#7a1fad]'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.slug })}
                className={`rounded-full px-5 py-3 font-black border transition ${activeCategory === cat.slug ? 'bg-[#063c86] text-white border-[#063c86]' : 'bg-white/70 text-[#071f47] border-[#d9c8a6] hover:border-[#7a1fad]'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a1fad]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-11 pr-5 py-3 rounded-full border border-[#d9c8a6] bg-white/70 font-semibold w-full md:w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-[#7a1fad] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-[#7a1fad]">Loading products...</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-20">
            <Gem size={48} className="mx-auto mb-4 text-[#d9c8a6]" />
            <h3 className="text-2xl font-black mb-2">No products yet</h3>
            <p className="text-[#12345f]">New items are being added soon. Check back!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map(product => {
              const images = (product.product_images || []).sort((a, b) => a.sort_order - b.sort_order)
              const img = images[0]?.url
              return (
                <div key={product.id} className="bg-white/70 rounded-[2rem] overflow-hidden shadow-xl border border-[#d9c8a6] hover:-translate-y-2 transition group">
                  <Link to={`/product/${product.slug}`}>
                    {img ? (
                      <div className="aspect-square overflow-hidden">
                        <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                      </div>
                    ) : (
                      <div className="aspect-square bg-[#f3eadb] flex items-center justify-center">
                        <Gem size={48} className="text-[#d9c8a6]" />
                      </div>
                    )}
                  </Link>
                  <div className="p-6">
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-[#7a1fad] mb-1">{product.categories?.name}</p>
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="text-xl font-black mb-2 hover:text-[#7a1fad] transition">{product.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
                        {product.compare_at_price && (
                          <span className="text-sm text-[#12345f]/50 line-through">${Number(product.compare_at_price).toFixed(2)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => addItem({ id: product.id, name: product.name, price: Number(product.price), image: img })}
                        className="bg-[#7a1fad] text-white rounded-full px-4 py-2 font-bold text-sm hover:scale-105 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
