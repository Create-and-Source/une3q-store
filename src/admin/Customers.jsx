import { useState, useEffect } from 'react'
import { Users, Mail, Phone } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Customers() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    supabase.from('customers').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setCustomers(data || []))
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-black text-[#071f47] mb-6">Customers</h1>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] shadow-sm overflow-hidden">
        {customers.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto mb-4 text-[#d9c8a6]" />
            <h3 className="text-xl font-black text-[#071f47]">No customers yet</h3>
            <p className="text-[#071f47]/50">Customers appear here after they place an order.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e5e5e3]">
            {customers.map(c => (
              <div key={c.id} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7a1fad] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {(c.first_name?.[0] || '?').toUpperCase()}{(c.last_name?.[0] || '').toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-[#071f47]">{c.first_name} {c.last_name}</h3>
                  <div className="flex items-center gap-3 text-sm text-[#071f47]/50">
                    <span className="flex items-center gap-1"><Mail size={12} /> {c.email}</span>
                    {c.phone && <span className="flex items-center gap-1"><Phone size={12} /> {c.phone}</span>}
                  </div>
                </div>
                <p className="text-xs text-[#071f47]/40">{new Date(c.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
