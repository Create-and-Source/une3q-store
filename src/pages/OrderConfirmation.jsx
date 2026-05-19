import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2, ArrowLeft } from 'lucide-react'

export default function OrderConfirmation() {
  const location = useLocation()
  const { order, items } = location.state || {}

  return (
    <div className="min-h-screen bg-navy-deep text-white flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-lime flex items-center justify-center mx-auto mb-6 shadow-xl shadow-lime/20">
          <CheckCircle2 size={40} className="text-navy" />
        </div>

        <h1 className="font-display text-4xl font-black mb-4">Order Confirmed!</h1>
        <p className="text-lg text-white/50 mb-8">
          Thank you for your order. We'll be in touch shortly with payment details and shipping updates.
        </p>

        {order && (
          <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-[2rem] p-6 border border-white/10 text-left mb-8">
            <div className="absolute top-0 left-8 w-16 h-px bg-gradient-to-r from-gold/60 to-transparent" />
            <div className="absolute top-0 left-8 w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" />

            <h2 className="font-black mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/40">Order #</span>
                <span className="font-bold">{order.order_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Email</span>
                <span className="font-bold">{order.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Ship to</span>
                <span className="font-bold">{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</span>
              </div>
              <div className="border-t border-white/10 pt-2 mt-2">
                {items?.map(item => (
                  <div key={item.id} className="flex justify-between py-1">
                    <span className="text-white/60">{item.name} x{item.quantity}</span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-black text-lg">
                <span>Total</span>
                <span className="text-lime">${Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <Link to="/shop" className="inline-flex items-center gap-2 text-gold font-bold hover:text-gold-light transition">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    </div>
  )
}
