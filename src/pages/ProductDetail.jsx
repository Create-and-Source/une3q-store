import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Minus, Plus, ShoppingBag, Gem } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useCart } from '../lib/cart'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [images, setImages] = useState([])
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    supabase.from('products').select('*, product_images(id, url, alt, sort_order), categories(name)')
      .eq('slug', slug).single()
      .then(({ data }) => {
        if (data) {
          setProduct(data)
          const sorted = (data.product_images || []).sort((a, b) => a.sort_order - b.sort_order)
          setImages(sorted)
        }
        setLoading(false)
      })
  }, [slug])

  const handleAdd = () => {
    if (!product) return
    addItem({ id: product.id, name: product.name, price: Number(product.price), image: images[0]?.url }, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3eadb] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#7a1fad] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f3eadb] flex items-center justify-center text-center px-6">
        <div>
          <Gem size={48} className="mx-auto mb-4 text-[#d9c8a6]" />
          <h2 className="text-3xl font-black text-[#071f47] mb-4">Product not found</h2>
          <Link to="/shop" className="text-[#7a1fad] font-bold hover:underline">Back to Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3eadb] text-[#071f47]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-[#7a1fad] font-bold mb-8 hover:underline">
          <ChevronLeft size={18} /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-[2rem] overflow-hidden bg-white shadow-xl border border-[#d9c8a6] mb-4">
              {images.length > 0 ? (
                <img src={images[activeImg]?.url} alt={images[activeImg]?.alt || product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#f3eadb]">
                  <Gem size={64} className="text-[#d9c8a6]" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition ${i === activeImg ? 'border-[#7a1fad]' : 'border-[#d9c8a6] opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-black tracking-[0.25em] uppercase text-[#7a1fad] mb-2">{product.categories?.name}</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black">${Number(product.price).toFixed(2)}</span>
              {product.compare_at_price && (
                <span className="text-xl text-[#12345f]/50 line-through">${Number(product.compare_at_price).toFixed(2)}</span>
              )}
            </div>

            {product.description && (
              <p className="text-[#12345f] text-lg leading-relaxed mb-8">{product.description}</p>
            )}


            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#d9c8a6] rounded-full overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-white/50 transition">
                  <Minus size={16} />
                </button>
                <span className="px-4 py-3 font-black min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-white/50 transition">
                  <Plus size={16} />
                </button>
              </div>

              {product.inventory_count > 0 && product.inventory_count <= 5 && (
                <span className="text-sm font-bold text-orange-600">Only {product.inventory_count} left!</span>
              )}
            </div>

            <button
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 rounded-full py-4 font-black text-lg shadow-xl hover:scale-[1.02] transition ${added ? 'bg-[#a7c900] text-[#071f47]' : 'bg-[#7a1fad] text-white'}`}
            >
              <ShoppingBag size={20} />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>

            {product.weight_oz && (
              <p className="text-sm text-[#12345f]/60 mt-4">Weight: {product.weight_oz} oz</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
