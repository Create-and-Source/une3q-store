import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, Mail, LogOut, Menu, X, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

const NAV = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { label: 'Customers', path: '/admin/customers', icon: Users },
  { label: 'Custom Requests', path: '/admin/requests', icon: MessageSquare },
  { label: 'Subscribers', path: '/admin/subscribers', icon: Mail },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#f5f5f3] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#071f47] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#063c86] flex items-center justify-center">
              <span className="text-[#a7c900] font-black text-lg">U3</span>
            </div>
            <div>
              <h1 className="font-black text-lg">UNE3Q</h1>
              <p className="text-xs text-white/50 uppercase tracking-wider">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(item => {
            const Icon = item.icon
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${active ? 'bg-[#7a1fad] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-2 px-4 py-3 text-white/50 hover:text-white font-semibold transition mb-1">
            <ChevronRight size={16} /> View Store
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 text-white/50 hover:text-red-400 font-semibold transition w-full">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-[#e5e5e3] px-6 py-4 flex items-center justify-between lg:justify-end sticky top-0 z-30">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <p className="text-sm text-[#071f47]/50 font-semibold">UNE3Q Admin Panel</p>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
