import { useState, useEffect } from 'react'
import { Package, Truck, CheckCircle2, Clock, X, ExternalLink } from 'lucide-react'
import { supabase } from '../lib/supabase'

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
}

const STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [selected, setSelected] = useState(null)
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [tracking, setTracking] = useState({ number: '', url: '' })

  const load = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data || [])
  }

  useEffect(() => { load() }, [])

  const openOrder = async (order) => {
    setSelected(order)
    setTracking({ number: order.tracking_number || '', url: order.tracking_url || '' })
    const { data } = await supabase.from('order_items').select('*').eq('order_id', order.id)
    setItems(data || [])
  }

  const updateStatus = async (id, status) => {
    await supabase.from('orders').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }))
    load()
  }

  const saveTracking = async () => {
    if (!selected) return
    await supabase.from('orders').update({
      tracking_number: tracking.number,
      tracking_url: tracking.url,
      status: 'shipped',
      updated_at: new Date().toISOString(),
    }).eq('id', selected.id)
    setSelected(prev => ({ ...prev, tracking_number: tracking.number, tracking_url: tracking.url, status: 'shipped' }))
    load()
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div>
      <h1 className="text-3xl font-black text-[#071f47] mb-6">Orders</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', ...STATUSES].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 font-bold text-sm capitalize transition ${filter === f ? 'bg-[#071f47] text-white' : 'bg-white text-[#071f47] border border-[#e5e5e3] hover:border-[#7a1fad]'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={48} className="mx-auto mb-4 text-[#d9c8a6]" />
            <h3 className="text-xl font-black text-[#071f47]">No orders yet</h3>
          </div>
        ) : (
          <div className="divide-y divide-[#e5e5e3]">
            {filtered.map(order => (
              <button key={order.id} onClick={() => openOrder(order)} className="w-full p-4 flex items-center gap-4 hover:bg-[#f5f5f3] transition text-left">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-[#071f47]">#{order.order_number}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                  </div>
                  <p className="text-sm text-[#071f47]/50">
                    {order.shipping_first_name} {order.shipping_last_name} &bull; {order.email}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-[#071f47]">${Number(order.total).toFixed(2)}</p>
                  <p className="text-xs text-[#071f47]/40">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-[#071f47]">Order #{selected.order_number}</h2>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-[#f5f5f3] rounded-lg"><X size={20} /></button>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-[#071f47] mb-2">Status</label>
              <div className="flex gap-2 flex-wrap">
                {STATUSES.map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition ${selected.status === s ? STATUS_COLORS[s] : 'bg-[#f5f5f3] text-[#071f47]/50 hover:bg-[#e5e5e3]'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#f5f5f3] rounded-xl p-4">
                <p className="text-xs font-bold text-[#071f47]/50 uppercase mb-1">Customer</p>
                <p className="font-bold">{selected.shipping_first_name} {selected.shipping_last_name}</p>
                <p className="text-sm">{selected.email}</p>
              </div>
              <div className="bg-[#f5f5f3] rounded-xl p-4">
                <p className="text-xs font-bold text-[#071f47]/50 uppercase mb-1">Ship To</p>
                <p className="font-bold text-sm">
                  {selected.shipping_address}<br />
                  {selected.shipping_address2 && <>{selected.shipping_address2}<br /></>}
                  {selected.shipping_city}, {selected.shipping_state} {selected.shipping_zip}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <p className="text-sm font-bold text-[#071f47]/50 uppercase mb-2">Items</p>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 bg-[#f5f5f3] rounded-xl p-3">
                    {item.product_image && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img src={item.product_image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-sm">{item.product_name}</p>
                      <p className="text-xs text-[#071f47]/50">Qty: {item.quantity} x ${Number(item.price).toFixed(2)}</p>
                    </div>
                    <p className="font-bold">${(item.quantity * Number(item.price)).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-[#f5f5f3] rounded-xl p-4 mb-6 space-y-1">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-bold">${Number(selected.subtotal).toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span>Shipping ({selected.shipping_method})</span><span className="font-bold">${Number(selected.shipping_cost).toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span>Tax</span><span className="font-bold">${Number(selected.tax).toFixed(2)}</span></div>
              <div className="flex justify-between text-lg font-black border-t border-[#d9c8a6] pt-2 mt-2"><span>Total</span><span>${Number(selected.total).toFixed(2)}</span></div>
            </div>

            {/* Tracking */}
            <div className="mb-6">
              <p className="text-sm font-bold text-[#071f47]/50 uppercase mb-2">Shipping / Tracking</p>
              <div className="grid md:grid-cols-2 gap-3">
                <input value={tracking.number} onChange={e => setTracking(prev => ({ ...prev, number: e.target.value }))} placeholder="Tracking Number" className="rounded-xl border border-[#d9c8a6] p-3 text-sm" />
                <input value={tracking.url} onChange={e => setTracking(prev => ({ ...prev, url: e.target.value }))} placeholder="Tracking URL" className="rounded-xl border border-[#d9c8a6] p-3 text-sm" />
              </div>
              <button onClick={saveTracking} className="mt-3 bg-[#063c86] text-white rounded-xl px-5 py-2.5 font-bold text-sm flex items-center gap-2 hover:scale-[1.02] transition">
                <Truck size={16} /> Save & Mark Shipped
              </button>
            </div>

            {selected.notes && (
              <div className="bg-yellow-50 rounded-xl p-4">
                <p className="text-xs font-bold text-yellow-700 uppercase mb-1">Order Notes</p>
                <p className="text-sm">{selected.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
