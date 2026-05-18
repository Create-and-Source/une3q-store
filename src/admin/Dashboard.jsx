import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, MessageSquare } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, customers: 0, revenue: 0, pending: 0, requests: 0 })

  useEffect(() => {
    Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id, total, status'),
      supabase.from('customers').select('id', { count: 'exact', head: true }),
      supabase.from('custom_requests').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    ]).then(([products, orders, customers, requests]) => {
      const allOrders = orders.data || []
      const revenue = allOrders.reduce((sum, o) => sum + Number(o.total || 0), 0)
      const pending = allOrders.filter(o => o.status === 'pending').length
      setStats({
        products: products.count || 0,
        orders: allOrders.length,
        customers: customers.count || 0,
        revenue,
        pending,
        requests: requests.count || 0,
      })
    })
  }, [])

  const cards = [
    { label: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'bg-[#a7c900]', link: '/admin/orders' },
    { label: 'Orders', value: stats.orders, icon: ShoppingCart, color: 'bg-[#7a1fad]', link: '/admin/orders', sub: stats.pending > 0 ? `${stats.pending} pending` : null },
    { label: 'Products', value: stats.products, icon: Package, color: 'bg-[#063c86]', link: '/admin/products' },
    { label: 'Customers', value: stats.customers, icon: Users, color: 'bg-[#8a18b5]', link: '/admin/customers' },
    { label: 'Custom Requests', value: stats.requests, icon: MessageSquare, color: 'bg-[#071f47]', link: '/admin/requests', sub: stats.requests > 0 ? 'new' : null },
  ]

  return (
    <div>
      <h1 className="text-3xl font-black text-[#071f47] mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {cards.map(card => {
          const Icon = card.icon
          return (
            <Link key={card.label} to={card.link} className="bg-white rounded-2xl p-6 border border-[#e5e5e3] shadow-sm hover:shadow-md transition">
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-sm text-[#071f47]/50 font-semibold">{card.label}</p>
              <p className="text-2xl font-black text-[#071f47]">{card.value}</p>
              {card.sub && <p className="text-xs font-bold text-[#7a1fad] mt-1">{card.sub}</p>}
            </Link>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#e5e5e3] shadow-sm">
        <h2 className="text-xl font-black text-[#071f47] mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link to="/admin/products" className="bg-[#063c86] text-white rounded-xl p-4 font-bold text-center hover:scale-[1.02] transition">
            Add Product
          </Link>
          <Link to="/admin/orders" className="bg-[#7a1fad] text-white rounded-xl p-4 font-bold text-center hover:scale-[1.02] transition">
            View Orders
          </Link>
          <Link to="/admin/requests" className="bg-[#8a18b5] text-white rounded-xl p-4 font-bold text-center hover:scale-[1.02] transition">
            Custom Requests
          </Link>
          <Link to="/" className="bg-[#a7c900] text-[#071f47] rounded-xl p-4 font-bold text-center hover:scale-[1.02] transition">
            View Store
          </Link>
        </div>
      </div>
    </div>
  )
}
