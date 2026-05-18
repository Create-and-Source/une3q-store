import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon, Star, Package } from 'lucide-react'
import { supabase } from '../lib/supabase'

const EMPTY = { name: '', slug: '', description: '', price: '', compare_at_price: '', category_id: '', status: 'draft', featured: false, weight_oz: '', sku: '', inventory_count: 0 }

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [images, setImages] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('all')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const fileRef = useRef()

  const load = async () => {
    const { data } = await supabase.from('products').select('*, product_images(id, url, sort_order), categories(name)').order('created_at', { ascending: false })
    setProducts(data || [])
  }

  useEffect(() => {
    load()
    supabase.from('categories').select('*').order('sort_order').then(({ data }) => setCategories(data || []))
  }, [])

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const autoSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const openNew = () => {
    setForm(EMPTY)
    setImages([])
    setExistingImages([])
    setEditing('new')
  }

  const openEdit = (product) => {
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price,
      compare_at_price: product.compare_at_price || '',
      category_id: product.category_id || '',
      status: product.status,
      featured: product.featured,
      weight_oz: product.weight_oz || '',
      sku: product.sku || '',
      inventory_count: product.inventory_count || 0,
    })
    setExistingImages((product.product_images || []).sort((a, b) => a.sort_order - b.sort_order))
    setImages([])
    setEditing(product.id)
  }

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    setImages(prev => [...prev, ...files])
  }

  const removeNewImage = (idx) => setImages(prev => prev.filter((_, i) => i !== idx))

  const removeExistingImage = async (img) => {
    await supabase.from('product_images').delete().eq('id', img.id)
    setExistingImages(prev => prev.filter(i => i.id !== img.id))
  }

  const uploadImages = async (productId) => {
    const uploaded = []
    for (let i = 0; i < images.length; i++) {
      const file = images[i]
      const ext = file.name.split('.').pop()
      const path = `${productId}/${Date.now()}-${i}.${ext}`
      const { error } = await supabase.storage.from('product-images').upload(path, file)
      if (!error) {
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path)
        uploaded.push({ product_id: productId, url: publicUrl, sort_order: existingImages.length + i })
      }
    }
    if (uploaded.length > 0) {
      await supabase.from('product_images').insert(uploaded)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)

    const slug = form.slug || autoSlug(form.name)
    const payload = {
      name: form.name,
      slug,
      description: form.description,
      price: parseFloat(form.price),
      compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
      category_id: form.category_id || null,
      status: form.status,
      featured: form.featured,
      weight_oz: form.weight_oz ? parseFloat(form.weight_oz) : null,
      sku: form.sku || null,
      inventory_count: parseInt(form.inventory_count) || 0,
    }

    try {
      if (editing === 'new') {
        const { data, error } = await supabase.from('products').insert(payload).select().single()
        if (error) throw error
        if (images.length > 0) await uploadImages(data.id)
      } else {
        const { error } = await supabase.from('products').update(payload).eq('id', editing)
        if (error) throw error
        if (images.length > 0) await uploadImages(editing)
      }

      setEditing(null)
      load()
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    await supabase.from('products').delete().eq('id', id)
    setDeleteConfirm(null)
    load()
  }

  const filtered = filter === 'all' ? products : products.filter(p => p.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-black text-[#071f47]">Products</h1>
        <button onClick={openNew} className="bg-[#7a1fad] text-white rounded-xl px-5 py-3 font-bold flex items-center gap-2 hover:scale-[1.02] transition">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'active', 'draft', 'archived'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 font-bold text-sm capitalize transition ${filter === f ? 'bg-[#071f47] text-white' : 'bg-white text-[#071f47] border border-[#e5e5e3] hover:border-[#7a1fad]'}`}>
            {f} {f !== 'all' && `(${products.filter(p => f === 'all' || p.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl border border-[#e5e5e3] shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={48} className="mx-auto mb-4 text-[#d9c8a6]" />
            <h3 className="text-xl font-black text-[#071f47] mb-2">No products yet</h3>
            <p className="text-[#071f47]/50 mb-4">Add your first product to get started.</p>
            <button onClick={openNew} className="bg-[#7a1fad] text-white rounded-xl px-5 py-3 font-bold">Add Product</button>
          </div>
        ) : (
          <div className="divide-y divide-[#e5e5e3]">
            {filtered.map(product => {
              const img = (product.product_images || []).sort((a, b) => a.sort_order - b.sort_order)[0]?.url
              return (
                <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-[#f5f5f3] transition">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f3eadb] shrink-0">
                    {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={24} className="text-[#d9c8a6]" /></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-[#071f47] truncate">{product.name}</h3>
                      {product.featured && <Star size={14} className="text-[#a7c900] fill-[#a7c900] shrink-0" />}
                    </div>
                    <p className="text-sm text-[#071f47]/50">{product.categories?.name} &bull; ${Number(product.price).toFixed(2)} &bull; Stock: {product.inventory_count}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.status === 'active' ? 'bg-green-100 text-green-700' : product.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                    {product.status}
                  </span>
                  <button onClick={() => openEdit(product)} className="p-2 hover:bg-[#7a1fad]/10 rounded-lg transition">
                    <Pencil size={16} className="text-[#7a1fad]" />
                  </button>
                  <button onClick={() => setDeleteConfirm(product.id)} className="p-2 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-black text-[#071f47] mb-3">Are you sure?</h3>
            <p className="text-[#071f47]/60 mb-6">This will permanently delete this product and all its images.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl font-bold border border-[#e5e5e3] hover:bg-[#f5f5f3] transition">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Create Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-[#071f47]">{editing === 'new' ? 'Add Product' : 'Edit Product'}</h2>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-[#f5f5f3] rounded-lg"><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#071f47] mb-1">Product Name *</label>
                <input required value={form.name} onChange={e => { set('name', e.target.value); if (editing === 'new') set('slug', autoSlug(e.target.value)) }} className="w-full rounded-xl border border-[#d9c8a6] p-3" />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#071f47] mb-1">URL Slug</label>
                <input value={form.slug} onChange={e => set('slug', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-3 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#071f47] mb-1">Description</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-3 h-24" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#071f47] mb-1">Price *</label>
                  <input required type="number" step="0.01" min="0" value={form.price} onChange={e => set('price', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-3" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#071f47] mb-1">Compare At Price</label>
                  <input type="number" step="0.01" min="0" value={form.compare_at_price} onChange={e => set('compare_at_price', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#071f47] mb-1">Category</label>
                  <select value={form.category_id} onChange={e => set('category_id', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-3">
                    <option value="">None</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#071f47] mb-1">Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-3">
                    <option value="draft">Draft</option>
                    <option value="active">Active (Visible)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#071f47] mb-1">SKU</label>
                  <input value={form.sku} onChange={e => set('sku', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-3" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#071f47] mb-1">Stock Qty</label>
                  <input type="number" min="0" value={form.inventory_count} onChange={e => set('inventory_count', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-3" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#071f47] mb-1">Weight (oz)</label>
                  <input type="number" step="0.1" min="0" value={form.weight_oz} onChange={e => set('weight_oz', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-3" />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="accent-[#7a1fad] w-4 h-4" />
                <span className="font-bold text-sm">Featured product (shows on homepage)</span>
              </label>

              {/* Images */}
              <div>
                <label className="block text-sm font-bold text-[#071f47] mb-2">Product Images</label>

                {existingImages.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-3">
                    {existingImages.map(img => (
                      <div key={img.id} className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#d9c8a6]">
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeExistingImage(img)} className="absolute top-0 right-0 bg-red-600 text-white rounded-bl-lg p-1">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-3">
                    {images.map((file, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#a7c900] border-dashed">
                        <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeNewImage(i)} className="absolute top-0 right-0 bg-red-600 text-white rounded-bl-lg p-1">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-[#d9c8a6] rounded-xl p-6 text-center hover:border-[#7a1fad] transition cursor-pointer"
                >
                  <Upload size={24} className="mx-auto mb-2 text-[#7a1fad]" />
                  <p className="font-bold text-sm text-[#071f47]/60">Click to upload images</p>
                </button>
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setEditing(null)} className="flex-1 py-3 rounded-xl font-bold border border-[#e5e5e3] hover:bg-[#f5f5f3] transition">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl font-bold bg-[#7a1fad] text-white hover:bg-[#6a17a0] transition disabled:opacity-50">
                  {saving ? 'Saving...' : editing === 'new' ? 'Create Product' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
