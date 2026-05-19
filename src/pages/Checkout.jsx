import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useCart } from '../lib/cart'

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC']
const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard Shipping (5-7 days)', price: 5.99 },
  { id: 'express', label: 'Express Shipping (2-3 days)', price: 12.99 },
  { id: 'overnight', label: 'Overnight Shipping', price: 24.99 },
]
const TAX_RATE = 0.08

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', phone: '', address: '', address2: '', city: '', state: '', zip: '', shippingMethod: 'standard', notes: '' })
  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const shipping = SHIPPING_METHODS.find(m => m.id === form.shippingMethod)
  const shippingCost = subtotal >= 75 && form.shippingMethod === 'standard' ? 0 : shipping.price
  const tax = +(subtotal * TAX_RATE).toFixed(2)
  const total = +(subtotal + shippingCost + tax).toFixed(2)

  const handleSubmit = async (e) => {
    e.preventDefault(); if (items.length === 0) return; setSubmitting(true); setError('')
    try {
      const { data: customer } = await supabase.from('customers').upsert({ email: form.email, first_name: form.firstName, last_name: form.lastName, phone: form.phone }, { onConflict: 'email' }).select().single()
      const { data: order, error: orderErr } = await supabase.from('orders').insert({ customer_id: customer?.id, email: form.email, subtotal, shipping_cost: shippingCost, tax, total, shipping_first_name: form.firstName, shipping_last_name: form.lastName, shipping_address: form.address, shipping_address2: form.address2, shipping_city: form.city, shipping_state: form.state, shipping_zip: form.zip, shipping_method: form.shippingMethod, notes: form.notes, status: 'pending' }).select().single()
      if (orderErr) throw orderErr
      await supabase.from('order_items').insert(items.map(item => ({ order_id: order.id, product_id: item.id, product_name: item.name, product_image: item.image, quantity: item.quantity, price: item.price })))
      clearCart(); navigate('/order-confirmation', { state: { order, items } })
    } catch (err) { setError('Something went wrong. Please try again.'); console.error(err) } finally { setSubmitting(false) }
  }

  if (items.length === 0) return <div className="min-h-screen  flex items-center justify-center text-center px-6"><div className="relative z-10"><h2 className="text-3xl font-black text-navy mb-4">Nothing to checkout</h2><Link to="/shop" className="text-purple font-bold hover:underline">Go to Shop</Link></div></div>

  return (
    <div className="min-h-screen  text-navy">
      <div className="paint-divider" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <Link to="/cart" className="inline-flex items-center gap-1 text-purple font-bold mb-8 hover:underline"><ArrowLeft size={18} /> Back to Cart</Link>
        <h1 className="font-display text-4xl font-black mb-8">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="card-canvas rounded-[2rem] p-6 md:p-8">
              <h2 className="text-xl font-black mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input required value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="First Name" className="input-painted" />
                <input required value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Last Name" className="input-painted" />
                <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Email" className="input-painted md:col-span-2" />
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Phone (optional)" className="input-painted md:col-span-2" />
              </div>
            </div>
            <div className="card-canvas rounded-[2rem] p-6 md:p-8">
              <h2 className="text-xl font-black mb-4">Shipping Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input required value={form.address} onChange={e => set('address', e.target.value)} placeholder="Street Address" className="input-painted md:col-span-2" />
                <input value={form.address2} onChange={e => set('address2', e.target.value)} placeholder="Apt, Suite (optional)" className="input-painted md:col-span-2" />
                <input required value={form.city} onChange={e => set('city', e.target.value)} placeholder="City" className="input-painted" />
                <select required value={form.state} onChange={e => set('state', e.target.value)} className="input-painted"><option value="">State</option>{US_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select>
                <input required value={form.zip} onChange={e => set('zip', e.target.value)} placeholder="ZIP Code" pattern="[0-9]{5}" className="input-painted" />
              </div>
            </div>
            <div className="card-canvas rounded-[2rem] p-6 md:p-8">
              <h2 className="text-xl font-black mb-4">Shipping Method</h2>
              {subtotal >= 75 && <p className="text-lime font-bold text-sm mb-3">Free standard shipping on orders $75+!</p>}
              <div className="space-y-3">
                {SHIPPING_METHODS.map(method => (
                  <label key={method.id} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${form.shippingMethod === method.id ? 'card-canvas ring-2 ring-purple' : 'card-canvas'}`}>
                    <div className="flex items-center gap-3"><input type="radio" name="shipping" value={method.id} checked={form.shippingMethod === method.id} onChange={e => set('shippingMethod', e.target.value)} className="accent-purple" /><span className="font-bold">{method.label}</span></div>
                    <span className="font-black">{subtotal >= 75 && method.id === 'standard' ? <span className="text-lime">FREE</span> : `$${method.price.toFixed(2)}`}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="card-canvas rounded-[2rem] p-6 md:p-8">
              <h2 className="text-xl font-black mb-4">Order Notes (optional)</h2>
              <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Special instructions..." className="input-painted w-full h-28" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="card-canvas rounded-[2rem] p-6 md:p-8 sticky top-24">
              <h2 className="text-xl font-black mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream shrink-0">{item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}</div>
                    <div className="flex-1 min-w-0"><p className="font-bold text-sm truncate">{item.name}</p><p className="text-xs text-navy/70">Qty: {item.quantity}</p></div>
                    <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gold/20 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm"><span className="text-navy/70">Subtotal</span><span className="font-bold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-navy/70">Shipping</span><span className="font-bold">{shippingCost === 0 ? <span className="text-lime">FREE</span> : `$${shippingCost.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-sm"><span className="text-navy/70">Tax (8%)</span><span className="font-bold">${tax.toFixed(2)}</span></div>
              </div>
              <div className="border-t border-gold/20 pt-4 flex justify-between text-xl font-black mb-6"><span>Total</span><span className="text-painted">${total.toFixed(2)}</span></div>
              {error && <p className="text-red-600 font-bold text-sm mb-4">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full btn-painted-purple rounded-full py-4 font-black text-lg flex items-center justify-center gap-2 disabled:opacity-50"><Lock size={18} /> {submitting ? 'Processing...' : 'Place Order'}</button>
              <p className="text-xs text-center text-navy/70 mt-3">Payment processing coming soon. Orders are recorded and you will be contacted for payment.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
