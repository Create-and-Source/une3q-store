import { useState, useEffect } from 'react'
import { Mail, Download } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Subscribers() {
  const [subs, setSubs] = useState([])

  useEffect(() => {
    supabase.from('subscribers').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setSubs(data || []))
  }, [])

  const exportCSV = () => {
    const csv = ['Email,Date Subscribed', ...subs.map(s => `${s.email},${new Date(s.created_at).toLocaleDateString()}`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'une3q-subscribers.csv'
    a.click()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-black text-[#071f47]">Subscribers</h1>
        {subs.length > 0 && (
          <button onClick={exportCSV} className="bg-[#063c86] text-white rounded-xl px-5 py-3 font-bold flex items-center gap-2 hover:scale-[1.02] transition">
            <Download size={18} /> Export CSV
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] shadow-sm overflow-hidden">
        {subs.length === 0 ? (
          <div className="p-12 text-center">
            <Mail size={48} className="mx-auto mb-4 text-[#d9c8a6]" />
            <h3 className="text-xl font-black text-[#071f47]">No subscribers yet</h3>
          </div>
        ) : (
          <div className="divide-y divide-[#e5e5e3]">
            {subs.map(s => (
              <div key={s.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#7a1fad]" />
                  <span className="font-bold text-[#071f47]">{s.email}</span>
                </div>
                <span className="text-xs text-[#071f47]/40">{new Date(s.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
