import { useState, useEffect } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { supabase } from '../lib/supabase'

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700',
  reviewing: 'bg-yellow-100 text-yellow-700',
  quoted: 'bg-purple-100 text-purple-700',
  accepted: 'bg-green-100 text-green-700',
  completed: 'bg-emerald-100 text-emerald-700',
  declined: 'bg-red-100 text-red-700',
}

export default function Requests() {
  const [requests, setRequests] = useState([])
  const [selected, setSelected] = useState(null)

  const load = async () => {
    const { data } = await supabase.from('custom_requests').select('*').order('created_at', { ascending: false })
    setRequests(data || [])
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    await supabase.from('custom_requests').update({ status }).eq('id', id)
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }))
    load()
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-[#071f47] mb-6">Custom Requests</h1>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] shadow-sm overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare size={48} className="mx-auto mb-4 text-[#d9c8a6]" />
            <h3 className="text-xl font-black text-[#071f47]">No custom requests yet</h3>
          </div>
        ) : (
          <div className="divide-y divide-[#e5e5e3]">
            {requests.map(req => (
              <button key={req.id} onClick={() => setSelected(req)} className="w-full p-4 flex items-center gap-4 hover:bg-[#f5f5f3] transition text-left">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-[#071f47]">{req.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[req.status]}`}>{req.status}</span>
                  </div>
                  <p className="text-sm text-[#071f47]/50">{req.request_type} &bull; {req.email}</p>
                </div>
                <p className="text-xs text-[#071f47]/40 shrink-0">{new Date(req.created_at).toLocaleDateString()}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-[#071f47]">Custom Request</h2>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-[#f5f5f3] rounded-lg"><X size={20} /></button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-[#f5f5f3] rounded-xl p-4">
                <p className="text-xs font-bold text-[#071f47]/50 uppercase mb-1">From</p>
                <p className="font-bold">{selected.name}</p>
                <p className="text-sm">{selected.email}</p>
              </div>
              <div className="bg-[#f5f5f3] rounded-xl p-4">
                <p className="text-xs font-bold text-[#071f47]/50 uppercase mb-1">Type</p>
                <p className="font-bold">{selected.request_type}</p>
              </div>
              <div className="bg-[#f5f5f3] rounded-xl p-4">
                <p className="text-xs font-bold text-[#071f47]/50 uppercase mb-1">Details</p>
                <p className="text-sm whitespace-pre-wrap">{selected.details}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-[#071f47]/50 uppercase mb-2">Update Status</p>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(STATUS_COLORS).map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition ${selected.status === s ? STATUS_COLORS[s] : 'bg-[#f5f5f3] text-[#071f47]/50 hover:bg-[#e5e5e3]'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
