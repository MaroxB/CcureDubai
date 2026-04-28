import { useState } from 'react'
import {
  Plus, Pencil, Trash2, Search, ChevronDown, ChevronUp,
  Eye, EyeOff, Save, X, Sparkles, RotateCcw,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { serviceCategories } from '../../data/services'

const EMPTY_SERVICE = {
  name: '', category: 'cupping', duration: 60, price: '',
  image: '', benefit: '', description: '', isNew: false, isActive: true,
}

function ServiceModal({ service, onClose, onSave }) {
  const [form, setForm] = useState(service ? { ...service } : { ...EMPTY_SERVICE })
  const isEditing = !!service

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, price: form.price === '' ? null : Number(form.price), duration: Number(form.duration) })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EDD8E8]/60">
          <h2 className="font-serif text-xl text-[#2C2028]">
            {isEditing ? 'Dienst bewerken' : 'Nieuwe dienst'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl text-[#9D8090] hover:bg-[#F9E8F3] hover:text-[#A41162] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Naam *</label>
            <input
              required
              value={form.name}
              onChange={e => set('name', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 focus:border-[#A41162]/40"
              placeholder="Naam van de behandeling"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Categorie *</label>
            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
            >
              {serviceCategories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Duration + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Duur (min) *</label>
              <input
                required
                type="number"
                min="5"
                value={form.duration}
                onChange={e => set('duration', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Prijs (€)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price ?? ''}
                onChange={e => set('price', e.target.value)}
                placeholder="Op aanvraag"
                className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
              />
            </div>
          </div>

          {/* Benefit */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Voordeel (korte tekst)</label>
            <input
              value={form.benefit}
              onChange={e => set('benefit', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
              placeholder="bv. Diepe ontspanning, betere doorbloeding"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Beschrijving</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20 resize-none"
              placeholder="Volledige beschrijving van de behandeling"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-medium text-[#7A6270] uppercase tracking-wide mb-1.5">Afbeelding pad</label>
            <input
              value={form.image || ''}
              onChange={e => set('image', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FAF7F5] text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
              placeholder="/Afbeeldingen/Diensten/..."
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div
                onClick={() => set('isActive', !form.isActive)}
                className={`w-10 h-5.5 rounded-full transition-colors relative ${form.isActive ? 'bg-[#A41162]' : 'bg-[#EDD8E8]'}`}
                style={{ height: '22px' }}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0.5'}`}
                />
              </div>
              <span className="text-sm text-[#7A6270]">Actief</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div
                onClick={() => set('isNew', !form.isNew)}
                className={`w-10 rounded-full transition-colors relative ${form.isNew ? 'bg-[#A41162]' : 'bg-[#EDD8E8]'}`}
                style={{ height: '22px' }}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.isNew ? 'translate-x-5' : 'translate-x-0.5'}`}
                />
              </div>
              <span className="text-sm text-[#7A6270]">Nieuw label</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#EDD8E8] text-[#7A6270] text-sm font-medium hover:bg-[#FAF7F5] transition-colors"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Save size={15} />
              {isEditing ? 'Opslaan' : 'Toevoegen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ServiceRow({ service, onEdit, onDelete, onToggle }) {
  return (
    <div className={`flex items-center gap-4 p-4 bg-white rounded-2xl border transition-all duration-200 ${
      service.isActive ? 'border-[#EDD8E8]/40' : 'border-[#EDD8E8]/40 opacity-50'
    }`}>
      {/* Image */}
      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F9E8F3] flex-shrink-0">
        {service.image ? (
          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles size={18} className="text-[#A41162]/40" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-[#2C2028] truncate">{service.name}</p>
          {service.isNew && (
            <span className="text-[10px] font-semibold text-[#A41162] bg-[#F9E8F3] px-1.5 py-0.5 rounded-full flex-shrink-0">Nieuw</span>
          )}
        </div>
        <p className="text-xs text-[#9D8090] mt-0.5">
          {service.duration} min · {service.price != null ? `€ ${service.price}` : 'Op aanvraag'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onToggle(service)}
          className="p-2 rounded-xl text-[#9D8090] hover:bg-[#F9E8F3] hover:text-[#A41162] transition-colors"
          title={service.isActive ? 'Verbergen' : 'Tonen'}
        >
          {service.isActive ? <Eye size={15} /> : <EyeOff size={15} />}
        </button>
        <button
          onClick={() => onEdit(service)}
          className="p-2 rounded-xl text-[#9D8090] hover:bg-[#F9E8F3] hover:text-[#A41162] transition-colors"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(service.id)}
          className="p-2 rounded-xl text-[#9D8090] hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}

export default function ServicesManager() {
  const { services, addService, updateService, deleteService, resetServices } = useAdmin()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [modal, setModal] = useState(null) // null | 'new' | service_object
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = services.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const grouped = serviceCategories.map(cat => ({
    ...cat,
    items: filtered.filter(s => s.category === cat.id),
  })).filter(g => g.items.length > 0 || activeCategory === g.id)

  const handleSave = (data) => {
    if (modal === 'new') {
      addService(data)
    } else {
      updateService(modal.id, data)
    }
    setModal(null)
  }

  const handleDelete = (id) => {
    deleteService(id)
    setConfirmDelete(null)
  }

  const handleToggle = (service) => {
    updateService(service.id, { isActive: !service.isActive })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-[#2C2028]">Diensten</h1>
          <p className="text-sm text-[#7A6270] mt-0.5">{services.length} behandelingen · {services.filter(s => s.isActive).length} actief</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { if (confirm('Alle diensten resetten naar standaard?')) resetServices() }}
            className="p-2.5 rounded-xl border border-[#EDD8E8] text-[#9D8090] hover:text-[#A41162] hover:bg-[#F9E8F3] transition-colors"
            title="Reset naar standaard"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setModal('new')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#A41162] to-[#953D7F] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Dienst toevoegen
          </button>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9D8090]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Zoek op naam..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-white text-sm text-[#2C2028] focus:outline-none focus:ring-2 focus:ring-[#A41162]/20"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${activeCategory === 'all' ? 'bg-[#A41162] text-white' : 'bg-white border border-[#EDD8E8] text-[#7A6270] hover:bg-[#F9E8F3]'}`}
          >
            Alles
          </button>
          {serviceCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${activeCategory === cat.id ? 'bg-[#A41162] text-white' : 'bg-white border border-[#EDD8E8] text-[#7A6270] hover:bg-[#F9E8F3]'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services by category */}
      {grouped.map(group => (
        <div key={group.id} className="bg-[#FAF7F5] rounded-2xl overflow-hidden border border-[#EDD8E8]/40">
          {/* Category header */}
          <button
            onClick={() => setExpandedCategory(v => v === group.id ? null : group.id)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#F9E8F3]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="font-serif text-base text-[#2C2028]">{group.label}</span>
              <span className="text-xs text-[#9D8090] bg-white border border-[#EDD8E8]/60 px-2 py-0.5 rounded-full">
                {group.items.length}
              </span>
            </div>
            {expandedCategory === group.id || expandedCategory === null
              ? <ChevronUp size={16} className="text-[#9D8090]" />
              : <ChevronDown size={16} className="text-[#9D8090]" />
            }
          </button>

          {/* Items */}
          {(expandedCategory === group.id || expandedCategory === null) && group.items.length > 0 && (
            <div className="px-3 pb-3 space-y-2">
              {group.items
                .sort((a, b) => (a.order || 999) - (b.order || 999))
                .map(s => (
                  <ServiceRow
                    key={s.id}
                    service={s}
                    onEdit={s => setModal(s)}
                    onDelete={id => setConfirmDelete(id)}
                    onToggle={handleToggle}
                  />
                ))}
            </div>
          )}
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <Sparkles size={32} className="mx-auto text-[#EDD8E8] mb-3" />
          <p className="text-sm text-[#9D8090]">Geen diensten gevonden</p>
        </div>
      )}

      {/* Modals */}
      {modal && (
        <ServiceModal
          service={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="font-serif text-lg text-[#2C2028] mb-2">Dienst verwijderen?</h3>
            <p className="text-sm text-[#7A6270] mb-5">Deze actie kan niet ongedaan worden gemaakt.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-[#EDD8E8] text-sm text-[#7A6270] hover:bg-[#FAF7F5]">Annuleren</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600">Verwijderen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
