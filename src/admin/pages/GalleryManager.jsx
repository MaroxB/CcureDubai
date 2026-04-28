import { useState, useRef } from 'react'
import { Upload, Trash2, Image, X, Plus, Tag } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

const CATEGORIES = ['Voor & Na', 'Behandelingen', 'Salon', 'Team', 'Overig']

function ImageCard({ item, onDelete, onUpdate }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#EDD8E8]/40 shadow-[0_2px_8px_rgba(44,32,40,0.06)] aspect-square">
      <img
        src={item.url}
        alt={item.alt || 'Gallery'}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={e => { e.target.style.display = 'none' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
        {item.category && (
          <span className="text-[10px] font-medium text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full w-fit mb-2">
            {item.category}
          </span>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => onDelete(item.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs rounded-xl hover:bg-red-500 transition-colors"
          >
            <Trash2 size={12} />
            Verwijderen
          </button>
        </div>
      </div>
    </div>
  )
}

function URLAddModal({ onClose, onAdd }) {
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const [category, setCategory] = useState('Overig')

  const handleAdd = () => {
    if (!url.trim()) return
    onAdd({ url: url.trim(), alt: alt.trim(), category })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl text-[#2C2028]">Afbeelding toevoegen</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-[#9D8090] hover:bg-[#F9E8F3]">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Afbeelding pad of URL *</label>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="/Afbeeldingen/mijn-foto.jpg"
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Alt tekst</label>
            <input
              value={alt}
              onChange={e => setAlt(e.target.value)}
              placeholder="Beschrijving van de afbeelding"
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Categorie</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#EDD8E8] text-[#7A6270] text-sm">Annuleren</button>
          <button onClick={handleAdd} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90">
            Toevoegen
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GalleryManager() {
  const { gallery, addGalleryItem, deleteGalleryItem, updateGalleryItem } = useAdmin()
  const [filterCategory, setFilterCategory] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = filterCategory === 'all'
    ? gallery
    : gallery.filter(g => g.category === filterCategory)

  const handleAdd = (item) => {
    addGalleryItem(item)
  }

  const handleDelete = (id) => {
    deleteGalleryItem(id)
    setConfirmDelete(null)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-[#2C2028]">Galerij</h1>
          <p className="text-sm text-[#7A6270] mt-0.5">{gallery.length} afbeeldingen</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} />
          Afbeelding toevoegen
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterCategory === 'all' ? 'bg-[#A41162] text-white' : 'bg-white border border-[#EDD8E8] text-[#7A6270] hover:bg-[#F9E8F3]'}`}
        >
          Alle ({gallery.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = gallery.filter(g => g.category === cat).length
          if (count === 0) return null
          return (
            <button key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterCategory === cat ? 'bg-[#A41162] text-white' : 'bg-white border border-[#EDD8E8] text-[#7A6270] hover:bg-[#F9E8F3]'}`}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <Image size={40} className="mx-auto text-[#EDD8E8] mb-4" />
          <p className="text-[#9D8090] text-sm mb-1">
            {filterCategory === 'all' ? 'Geen afbeeldingen in de galerij' : `Geen afbeeldingen in "${filterCategory}"`}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#A41162] hover:underline"
          >
            <Plus size={12} />
            Voeg de eerste toe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(item => (
            <ImageCard
              key={item.id}
              item={item}
              onDelete={(id) => setConfirmDelete(id)}
              onUpdate={updateGalleryItem}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <URLAddModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="font-serif text-lg text-[#2C2028] mb-2">Afbeelding verwijderen?</h3>
            <p className="text-sm text-[#7A6270] mb-5">Deze actie kan niet ongedaan worden gemaakt.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-[#EDD8E8] text-sm text-[#7A6270]">Annuleren</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm">Verwijderen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
