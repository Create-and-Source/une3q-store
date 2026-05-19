import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Minus, Plus, ShoppingBag, Gem, Fingerprint, Heart, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
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
        if (data) { setProduct(data); setImages((data.product_images || []).sort((a, b) => a.sort_order - b.sort_order)) }
        setLoading(false)
      })
  }, [slug])

  const handleAdd = () => {
    if (!product) return
    addItem({ id: product.id, name: product.name, price: Number(product.price), image: images[0]?.url }, qty)
    setAdded(true); setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return <div className="min-h-screen  flex items-center justify-center"><div className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full animate-spin" /></div>
  if (!product) return (
    <div className="min-h-screen  flex items-center justify-center text-center px-6">
      <div><Gem size={48} className="mx-auto mb-4 text-gold/30" /><h2 className="text-3xl font-black text-navy mb-4">Product not found</h2><Link to="/shop" className="text-purple font-bold hover:underline">Back to Shop</Link></div>
    </div>
  )

  return (
    <div className="min-h-screen  text-navy">
      <div className="paint-divider" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <Link to="/shop" className="inline-flex items-center gap-1 text-purple font-bold mb-8 hover:underline"><ChevronLeft size={18} /> Back to Shop</Link>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-[2rem] overflow-hidden card-canvas mb-4">
              {images.length > 0 ? <img src={images[activeImg]?.url} alt={images[activeImg]?.alt || product.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><Gem size={64} className="text-gold/20" /></div>}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button key={img.id} onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 transition ${i === activeImg ? 'ring-2 ring-purple ring-offset-2' : 'opacity-50 hover:opacity-100'}`}>
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-xs font-black tracking-[0.25em] uppercase text-purple mb-2">{product.categories?.name}</p>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-6">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black text-painted">${Number(product.price).toFixed(2)}</span>
              {product.compare_at_price && <span className="text-xl text-navy/60 line-through">${Number(product.compare_at_price).toFixed(2)}</span>}
            </div>
            {product.description && <p className="text-navy/60 text-lg leading-relaxed mb-8">{product.description}</p>}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center rounded-full overflow-hidden input-painted p-0 border-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-cream/50 transition"><Minus size={16} /></button>
                <span className="px-4 py-3 font-black min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-cream/50 transition"><Plus size={16} /></button>
              </div>
              {product.inventory_count > 0 && product.inventory_count <= 5 && <span className="text-sm font-bold text-orange-600">Only {product.inventory_count} left!</span>}
            </div>
            <button onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 rounded-full py-4 font-black text-lg ${added ? 'btn-painted-lime' : 'btn-painted-purple'}`}>
              <ShoppingBag size={20} /> {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            {product.weight_oz && <p className="text-sm text-navy/70 mt-4">Weight: {product.weight_oz} oz</p>}
            <div className="mt-8 pt-8 border-t border-gold/20">
              <div className="grid grid-cols-3 gap-3">
                {[{ l: 'Handmade', i: Fingerprint, c: 'icon-painted-purple' }, { l: 'One-of-a-Kind', i: Heart, c: 'icon-painted-blue' }, { l: 'Made by Heart', i: Sun, c: 'icon-painted-lime' }].map(t => {
                  const I = t.i
                  return (<div key={t.l} className={`${t.c} ${t.c.includes('lime') ? 'text-navy' : 'text-white'} rounded-xl py-3 px-2 text-center`}><I size={16} className="mx-auto mb-1" /><p className="text-[10px] font-black uppercase tracking-wider">{t.l}</p></div>)
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
