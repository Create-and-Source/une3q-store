import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../lib/cart'

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  if (items.length === 0) return (
    <div className="min-h-screen canvas-bg flex items-center justify-center text-center px-6">
      <div className="relative z-10"><ShoppingBag size={48} className="mx-auto mb-4 text-gold/30" /><h2 className="text-3xl font-black text-navy mb-4">Your cart is empty</h2>
        <Link to="/shop" className="inline-flex items-center gap-2 btn-painted-purple px-8 py-4 rounded-full font-bold">Continue Shopping</Link></div>
    </div>
  )

  return (
    <div className="min-h-screen canvas-bg text-navy">
      <div className="paint-divider" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <Link to="/shop" className="inline-flex items-center gap-1 text-purple font-bold mb-8 hover:underline"><ArrowLeft size={18} /> Continue Shopping</Link>
        <h1 className="font-display text-4xl font-black mb-8">Your Cart ({itemCount})</h1>
        <div className="space-y-4 mb-8">
          {items.map(item => (
            <div key={item.id} className="card-painted-round rounded-2xl p-4 md:p-6 flex gap-4 items-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream shrink-0">
                {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ShoppingBag size={24} className="text-gold/20" /></div>}
              </div>
              <div className="flex-1 min-w-0"><h3 className="font-black truncate">{item.name}</h3><p className="text-purple font-bold">${item.price.toFixed(2)}</p></div>
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-full overflow-hidden input-painted p-0 border-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 hover:bg-cream/50 transition"><Minus size={14} /></button>
                  <span className="px-3 py-2 font-black text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 hover:bg-cream/50 transition"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"><Trash2 size={18} /></button>
              </div>
              <p className="font-black text-lg w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="card-painted-round rounded-[2rem] p-8">
          <div className="flex justify-between text-lg mb-2"><span className="text-navy/60">Subtotal</span><span className="font-black">${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm text-navy/70 mb-2"><span>Shipping</span><span>Calculated at checkout</span></div>
          <div className="flex justify-between text-sm text-navy/70 mb-6"><span>Tax</span><span>Calculated at checkout</span></div>
          <div className="border-t border-gold/20 pt-4 flex justify-between text-2xl font-black mb-6"><span>Estimated Total</span><span className="text-painted">${subtotal.toFixed(2)}</span></div>
          <Link to="/checkout" className="block w-full btn-painted-purple text-center rounded-full py-4 font-black text-lg">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  )
}
