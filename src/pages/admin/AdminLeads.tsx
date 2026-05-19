import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Filter, MoreHorizontal, Mail, Phone, MessageSquare, ChevronDown, Download, Plus, X } from 'lucide-react';

interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  mensaje: string | null;
  origen: string;
  status: string;
  notas: string | null;
  created_at: string;
}

const STATUS_OPTIONS = ['nuevo', 'contactado', 'en_proceso', 'cliente', 'descartado', 'whatsapp', 'newsletter'];
const STATUS_COLORS: Record<string, string> = {
  nuevo: 'bg-green-500/10 text-green-600 border-green-500/20',
  contactado: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  en_proceso: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  cliente: 'bg-terracotta/10 text-terracotta border-terracotta/20',
  descartado: 'bg-ink/5 text-ink/40 border-ink/10',
  whatsapp: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  newsletter: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
};

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newLead, setNewLead] = useState({ nombre: '', email: '', telefono: '', status: 'nuevo', origen: 'agregado_manual' });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setLeads(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from('leads').update({ status: newStatus }).eq('id', id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    
    // Si cambia a estado newsletter, enviar a MailerLite
    if (newStatus === 'newsletter') {
      const lead = leads.find(l => l.id === id);
      if (lead) {
        syncToMailerLite(lead.email, lead.nombre);
      }
    }
  };

  const syncToMailerLite = async (email: string, name: string) => {
    try {
      const res = await fetch('/api/mailerlite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      if (res.ok) {
        console.log('Agregado a MailerLite');
      }
    } catch(e) {
      console.error('Error sincronizando con MailerLite', e);
    }
  };

  const saveNotes = async (id: string) => {
    await supabase.from('leads').update({ notas: noteText }).eq('id', id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notas: noteText } : l)));
    setEditingNotes(null);
  };

  const deleteLead = async (id: string) => {
    if (!confirm('¿Estás segura de eliminar este contacto?')) return;
    await supabase.from('leads').delete().eq('id', id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.nombre || !newLead.email) return;
    
    const { data, error } = await supabase.from('leads').insert([newLead]).select();
    if (!error && data) {
      setLeads([data[0], ...leads]);
      setIsAdding(false);
      
      if (newLead.status === 'newsletter') {
        syncToMailerLite(newLead.email, newLead.nombre);
      }
      
      setNewLead({ nombre: '', email: '', telefono: '', status: 'nuevo', origen: 'agregado_manual' });
    } else {
      alert('Error al agregar el lead');
    }
  };

  const handleExport = () => {
    const headers = ['Nombre', 'Email', 'Teléfono', 'Estado', 'Origen', 'Fecha'];
    const rows = filteredLeads.map(l => [
      l.nombre,
      l.email,
      l.telefono || '',
      l.status,
      l.origen || '',
      formatDate(l.created_at)
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_reinventadas_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ink font-light">Leads (CRM)</h1>
          <p className="text-ink/50 text-sm mt-1">Gestión de contactos y potenciales clientes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-ink/10 text-ink text-xs rounded-xl hover:bg-ink/5 transition-all tracking-widest uppercase font-medium"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar Excel</span>
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-terracotta text-cream text-xs rounded-xl hover:bg-terracotta/90 transition-all tracking-widest uppercase font-medium shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Agregar Lead</span>
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-ink/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-terracotta/40 focus:ring-1 focus:ring-terracotta/20 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-ink/10 rounded-xl py-2.5 pl-10 pr-10 text-sm text-ink focus:outline-none focus:border-terracotta/40 cursor-pointer"
          >
            <option value="todos">Todos los estados</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30 pointer-events-none" />
        </div>
      </div>

      {/* Count */}
      <p className="text-ink/40 text-xs uppercase tracking-widest mb-4">
        {filteredLeads.length} contacto{filteredLeads.length !== 1 ? 's' : ''}
      </p>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink/5 px-6 py-16 text-center">
          <MessageSquare className="w-10 h-10 text-ink/10 mx-auto mb-3" />
          <p className="text-ink/40 text-sm">
            {leads.length === 0 ? 'Aún no hay contactos registrados' : 'No se encontraron resultados'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-2xl border border-ink/5 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                      <span className="text-terracotta font-serif text-base font-medium">
                        {lead.nombre?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-ink font-medium text-sm">{lead.nombre}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span className="flex items-center gap-1 text-ink/40 text-xs">
                          <Mail className="w-3 h-3" /> {lead.email}
                        </span>
                        {lead.telefono && (
                          <span className="flex items-center gap-1 text-ink/40 text-xs">
                            <Phone className="w-3 h-3" /> {lead.telefono}
                          </span>
                        )}
                      </div>
                      <p className="text-ink/30 text-[10px] uppercase tracking-widest mt-1">{formatDate(lead.created_at)}</p>
                    </div>
                  </div>

                  {/* Status + Actions */}
                  <div className="flex items-center gap-2 sm:shrink-0">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`appearance-none text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-medium border cursor-pointer focus:outline-none ${STATUS_COLORS[lead.status] || STATUS_COLORS.nuevo}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        if (editingNotes === lead.id) {
                          setEditingNotes(null);
                        } else {
                          setEditingNotes(lead.id);
                          setNoteText(lead.notas || '');
                        }
                      }}
                      className="p-2 text-ink/30 hover:text-ink hover:bg-ink/5 rounded-lg transition-colors"
                      title="Notas"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="text-[10px] text-red-400 hover:text-red-600 px-2 py-1 rounded transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Message */}
                {lead.mensaje && (
                  <div className="mt-4 pl-15 sm:pl-[60px]">
                    <p className="text-ink/60 text-sm font-light italic bg-ink/[0.02] rounded-xl px-4 py-3 border border-ink/5">
                      "{lead.mensaje}"
                    </p>
                  </div>
                )}

                {/* Notes editor */}
                {editingNotes === lead.id && (
                  <div className="mt-4 pl-0 sm:pl-[60px]">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Escribí tus notas sobre este contacto..."
                      className="w-full bg-sand/30 border border-ink/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-terracotta/40 resize-none"
                      rows={3}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => saveNotes(lead.id)}
                        className="px-4 py-1.5 bg-terracotta text-cream text-xs rounded-lg hover:bg-terracotta/80 transition-colors tracking-widest uppercase"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingNotes(null)}
                        className="px-4 py-1.5 text-ink/40 text-xs hover:text-ink transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Agregar Lead Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-ink/5 flex items-center justify-between">
              <h3 className="font-serif text-xl text-ink">Nuevo Lead</h3>
              <button onClick={() => setIsAdding(false)} className="text-ink/30 hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddLead} className="p-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5 ml-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={newLead.nombre}
                  onChange={(e) => setNewLead({...newLead, nombre: e.target.value})}
                  className="w-full bg-sand/30 border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-terracotta/40"
                  placeholder="Nombre del contacto"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5 ml-1">Email</label>
                <input
                  type="email"
                  required
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  className="w-full bg-sand/30 border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-terracotta/40"
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5 ml-1">Teléfono (opcional)</label>
                <input
                  type="text"
                  value={newLead.telefono}
                  onChange={(e) => setNewLead({...newLead, telefono: e.target.value})}
                  className="w-full bg-sand/30 border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-terracotta/40"
                  placeholder="+54 9 11..."
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5 ml-1">Estado Inicial</label>
                <select
                  value={newLead.status}
                  onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                  className="w-full bg-sand/30 border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-terracotta/40 cursor-pointer"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-terracotta text-cream text-xs tracking-widest uppercase font-medium py-3.5 rounded-xl hover:bg-terracotta/90 transition-colors"
                >
                  Guardar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
