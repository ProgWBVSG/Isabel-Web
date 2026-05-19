import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, GripVertical, Eye, EyeOff, Pencil, Trash2, X, Check, MessageSquareQuote } from 'lucide-react';

interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  content: string;
  is_active: boolean;
  display_order: number;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ author_name: '', author_role: '', content: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });
    if (data) setTestimonials(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.author_name.trim() || !form.content.trim()) return;
    setSaving(true);

    if (editingId) {
      await supabase.from('testimonials').update({
        author_name: form.author_name,
        author_role: form.author_role || null,
        content: form.content,
      }).eq('id', editingId);
    } else {
      const maxOrder = testimonials.length > 0 ? Math.max(...testimonials.map((t) => t.display_order)) + 1 : 0;
      await supabase.from('testimonials').insert({
        author_name: form.author_name,
        author_role: form.author_role || null,
        content: form.content,
        display_order: maxOrder,
      });
    }

    setForm({ author_name: '', author_role: '', content: '' });
    setEditingId(null);
    setShowForm(false);
    setSaving(false);
    fetchTestimonials();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from('testimonials').update({ is_active: !current }).eq('id', id);
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, is_active: !current } : t)));
  };

  const handleEdit = (testimonial: Testimonial) => {
    setForm({ author_name: testimonial.author_name, author_role: testimonial.author_role || '', content: testimonial.content });
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este testimonio?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ author_name: '', author_role: '', content: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-ink/10 border-t-terracotta rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-ink font-light">Testimonios</h1>
          <p className="text-ink/50 text-sm mt-1">Gestión de testimonios visibles en la web</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm({ author_name: '', author_role: '', content: '' }); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-terracotta text-cream text-xs rounded-xl hover:bg-terracotta/80 transition-colors tracking-widest uppercase font-medium"
          >
            <Plus className="w-4 h-4" />
            Nuevo
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-ink/5 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-ink">{editingId ? 'Editar Testimonio' : 'Nuevo Testimonio'}</h2>
            <button onClick={cancelForm} className="p-2 text-ink/30 hover:text-ink rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-ink/60 text-xs uppercase tracking-widest mb-2">Nombre *</label>
                <input
                  type="text"
                  value={form.author_name}
                  onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                  placeholder="Ej: Marta Garcés"
                  className="w-full bg-[#F8F7F4] border border-ink/10 rounded-xl py-3 px-4 text-sm text-ink placeholder:text-ink/25 focus:outline-none focus:border-terracotta/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-ink/60 text-xs uppercase tracking-widest mb-2">Rol / Edad (opcional)</label>
                <input
                  type="text"
                  value={form.author_role}
                  onChange={(e) => setForm({ ...form, author_role: e.target.value })}
                  placeholder="Ej: 58 años"
                  className="w-full bg-[#F8F7F4] border border-ink/10 rounded-xl py-3 px-4 text-sm text-ink placeholder:text-ink/25 focus:outline-none focus:border-terracotta/40 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-ink/60 text-xs uppercase tracking-widest mb-2">Testimonio *</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Escribí el testimonio de la clienta..."
                rows={4}
                className="w-full bg-[#F8F7F4] border border-ink/10 rounded-xl py-3 px-4 text-sm text-ink placeholder:text-ink/25 focus:outline-none focus:border-terracotta/40 resize-none transition-all"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving || !form.author_name.trim() || !form.content.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-terracotta text-cream text-xs rounded-xl hover:bg-terracotta/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors tracking-widest uppercase font-medium"
              >
                <Check className="w-3.5 h-3.5" />
                {saving ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
              </button>
              <button onClick={cancelForm} className="px-6 py-2.5 text-ink/40 text-xs hover:text-ink transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink/5 px-6 py-16 text-center">
          <MessageSquareQuote className="w-10 h-10 text-ink/10 mx-auto mb-3" />
          <p className="text-ink/40 text-sm">Aún no hay testimonios. Creá el primero.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                t.is_active ? 'border-ink/5' : 'border-ink/5 opacity-60'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="text-ink/15 mt-1 cursor-grab">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-ink font-medium text-sm">{t.author_name}</h3>
                      {t.author_role && <span className="text-ink/40 text-xs">· {t.author_role}</span>}
                      {!t.is_active && (
                        <span className="text-[10px] uppercase tracking-widest text-ink/30 bg-ink/5 px-2 py-0.5 rounded-full">Oculto</span>
                      )}
                    </div>
                    <p className="text-ink/60 text-sm font-light italic leading-relaxed line-clamp-3">"{t.content}"</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleActive(t.id, t.is_active)}
                      className={`p-2 rounded-lg transition-colors ${t.is_active ? 'text-green-500 hover:bg-green-500/10' : 'text-ink/25 hover:bg-ink/5'}`}
                      title={t.is_active ? 'Ocultar' : 'Mostrar'}
                    >
                      {t.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(t)}
                      className="p-2 text-ink/30 hover:text-terracotta hover:bg-terracotta/5 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-2 text-ink/30 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
