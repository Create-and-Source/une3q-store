import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../lib/cart'

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f3eadb] flex items-center justify-center text-center px-6">
        <div>
          <ShoppingBag size={48} className="mx-auto mb-4 text-[#d9c8a6]" />
          <h2 className="text-3xl font-black text-[#071f47] mb-4">Your cart is empty</h2>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#063c86] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3eadb] text-[#071f47]">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link to="/shop" className="inline-flex items-center gap-1 text-[#7a1fad] font-bold mb-8 hover:underline">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>

        <h1 className="text-4xl font-black mb-8">Your Cart ({itemCount})</h1>

        <div className="space-y-4 mb-8">
          {items.map(item => (
            <div key={item.id} className="bg-white/70 rounded-2xl p-4 md:p-6 border border-[#d9c8a6] shadow-md flex gap-4 items-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#f3eadb] shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={24} className="text-[#d9c8a6]" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-black truncate">{item.name}</h3>
                <p className="text-[#7a1fad] font-bold">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border border-[#d9c8a6] rounded-full overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 hover:bg-white/50 transition">
                    <Minus size={14} />
                  </button>
                  <span className="px-3 py-2 font-black text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 hover:bg-white/50 transition">
                    <Plus size={14} />
                  </button>
                </div>

                <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition">
                  <Trash2 size={18} />
                </button>
              </div>

              <p className="font-black text-lg w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/70 rounded-[2rem] p-8 border border-[#d9c8a6] shadow-xl">
          <div className="flex justify-between text-lg mb-2">
            <span>Subtotal</span>
            <span className="font-black">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#12345f]/60 mb-2">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex justify-between text-sm text-[#12345f]/60 mb-6">
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="border-t border-[#d9c8a6] pt-4 flex justify-between text-2xl font-black mb-6">
            <span>Estimated Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="block w-full bg-[#7a1fad] text-white text-center rounded-full py-4 font-black text-lg shadow-xl hover:scale-[1.02] transition">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
