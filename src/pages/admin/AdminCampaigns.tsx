import { useState } from 'react';
import { Mail, Send, Plus, Search, Calendar, CheckCircle2, Clock, Trash2, ArrowLeft } from 'lucide-react';

export default function AdminCampaigns() {
  const [activeTab, setActiveTab] = useState<'list' | 'new'>('list');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<'all' | 'newsletter'>('newsletter');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState('');

  // Datos mock para el diseño inicial
  const [campaigns] = useState([
    { id: 1, subject: 'Bienvenida al Círculo de Mujeres 2024', status: 'sent', date: '2024-01-15', recipients: 142 },
    { id: 2, subject: 'Nuevo taller: Liderazgo Femenino en Tiempos de Crisis', status: 'sent', date: '2024-02-02', recipients: 205 },
    { id: 3, subject: 'Borrador: Oferta Mentoría 1:1', status: 'draft', date: '2024-03-10', recipients: 0 },
    { id: 4, subject: 'Recordatorio sesión gratuita', status: 'sent', date: '2024-03-20', recipients: 310 },
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !content) return;
    
    setIsSending(true);
    // TODO: Conectar a API de MailerLite
    await new Promise(r => setTimeout(r, 2500)); 
    setIsSending(false);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      setSubject('');
      setContent('');
      setActiveTab('list');
    }, 3000);
  };

  const filteredCampaigns = campaigns.filter(c => c.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-ink">Campañas de Correo</h1>
          <p className="text-ink/50 mt-1 text-sm">Conecta con tus leads y alumnas de forma directa.</p>
        </div>
        
        {activeTab === 'list' ? (
          <button
            onClick={() => setActiveTab('new')}
            className="flex items-center gap-2 px-5 py-2.5 bg-terracotta text-cream rounded-xl hover:bg-terracotta/90 transition-all shadow-lg hover:shadow-terracotta/20 text-sm font-medium tracking-wide"
          >
            <Plus className="w-4 h-4" />
            Nueva Campaña
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('list')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-ink/10 text-ink rounded-xl hover:bg-ink/5 transition-all shadow-sm text-sm font-medium tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        )}
      </div>

      {activeTab === 'list' && (
        <div className="bg-white rounded-2xl shadow-sm border border-ink/5 overflow-hidden">
          {/* Toolbar */}
          <div className="p-5 border-b border-ink/5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-cream/20">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
              <input
                type="text"
                placeholder="Buscar campaña por asunto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-ink/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta text-sm transition-all"
              />
            </div>
          </div>

          {/* List */}
          <div className="divide-y divide-ink/5">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-5 hover:bg-cream/10 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full flex-shrink-0 ${campaign.status === 'sent' ? 'bg-green-500/10 text-green-600' : 'bg-ink/5 text-ink/40'}`}>
                    {campaign.status === 'sent' ? <Mail className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-ink group-hover:text-terracotta transition-colors">{campaign.subject}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-ink/40">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {campaign.date}</span>
                      {campaign.status === 'sent' && (
                        <span className="flex items-center gap-1.5"><UsersIcon className="w-3.5 h-3.5" /> {campaign.recipients} destinatarios</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full border ${
                    campaign.status === 'sent' 
                      ? 'bg-green-500/5 text-green-600 border-green-500/20' 
                      : 'bg-ink/5 text-ink/50 border-ink/10'
                  }`}>
                    {campaign.status === 'sent' ? 'Enviado' : 'Borrador'}
                  </span>
                  
                  {campaign.status === 'draft' && (
                    <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {filteredCampaigns.length === 0 && (
              <div className="p-12 text-center text-ink/40">
                <Mail className="w-12 h-12 mx-auto opacity-20 mb-3" />
                <p>No se encontraron campañas</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'new' && (
        <form onSubmit={handleSend} className="bg-white rounded-2xl shadow-sm border border-ink/5 p-6 lg:p-8 relative overflow-hidden">
          
          {success && (
            <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif text-ink mb-2">¡Campaña Enviada!</h2>
              <p className="text-ink/50 text-sm">Tus leads recibirán el correo en breve.</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-2 uppercase tracking-widest text-[11px]">Asunto del correo</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ej. Novedades exclusivas para la comunidad..."
                className="w-full px-4 py-3 bg-cream/10 border border-ink/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all text-lg font-medium"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-2 uppercase tracking-widest text-[11px]">Destinatarios (MailerLite)</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Opción Newsletter */}
                <button
                  type="button"
                  onClick={() => setAudience('newsletter')}
                  className={`px-4 py-4 border rounded-xl flex items-start gap-3 transition-all text-left ${
                    audience === 'newsletter' 
                      ? 'bg-terracotta/5 border-terracotta text-terracotta' 
                      : 'bg-white border-ink/10 text-ink hover:bg-ink/5'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    audience === 'newsletter' ? 'border-terracotta bg-terracotta' : 'border-ink/20'
                  }`}>
                    {audience === 'newsletter' && <div className="w-2 h-2 bg-cream rounded-full" />}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${audience === 'newsletter' ? 'text-terracotta' : 'text-ink'}`}>Suscriptores Newsletter</p>
                    <p className="text-xs mt-1 opacity-70">Envía a tu segmento activo del newsletter (aprox. 140 contactos).</p>
                  </div>
                </button>

                {/* Opción Todos */}
                <button
                  type="button"
                  onClick={() => setAudience('all')}
                  className={`px-4 py-4 border rounded-xl flex items-start gap-3 transition-all text-left ${
                    audience === 'all' 
                      ? 'bg-terracotta/5 border-terracotta text-terracotta' 
                      : 'bg-white border-ink/10 text-ink hover:bg-ink/5'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    audience === 'all' ? 'border-terracotta bg-terracotta' : 'border-ink/20'
                  }`}>
                    {audience === 'all' && <div className="w-2 h-2 bg-cream rounded-full" />}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${audience === 'all' ? 'text-terracotta' : 'text-ink'}`}>Toda la Base de Datos</p>
                    <p className="text-xs mt-1 opacity-70">Envía a todos los leads y alumnas registrados (aprox. 340 contactos).</p>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 mb-2 uppercase tracking-widest text-[11px]">Mensaje</label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                placeholder="Escribe el contenido de tu campaña aquí..."
                className="w-full px-4 py-4 bg-cream/10 border border-ink/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all resize-y text-ink leading-relaxed"
              ></textarea>
              <p className="text-xs text-ink/40 mt-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> El diseño final incluirá tu logo y pie de página corporativo automáticamente.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-ink/5 flex justify-end">
            <button
              type="submit"
              disabled={isSending || !subject || !content}
              className="flex items-center gap-2 px-8 py-3.5 bg-terracotta text-cream rounded-xl hover:bg-terracotta/90 disabled:opacity-50 transition-all shadow-lg hover:shadow-terracotta/20 font-medium tracking-wide"
            >
              {isSending ? (
                <>
                  <span className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  Enviando a MailerLite...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar a MailerLite
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Helper icon
function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
