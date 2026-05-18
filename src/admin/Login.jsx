import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-[#071f47] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#063c86] flex items-center justify-center mx-auto mb-4">
            <span className="text-[#a7c900] font-black text-2xl">U3</span>
          </div>
          <h1 className="text-3xl font-black text-white">UNE3Q Admin</h1>
          <p className="text-white/50 mt-1">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-[2rem] p-8 shadow-2xl">
          {error && <p className="text-red-600 font-bold text-sm mb-4 bg-red-50 p-3 rounded-xl">{error}</p>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#071f47] mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#d9c8a6] p-4"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#071f47] mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#d9c8a6] p-4"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7a1fad] text-white rounded-full py-4 font-black disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
