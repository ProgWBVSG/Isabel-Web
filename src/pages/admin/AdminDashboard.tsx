import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, MessageSquareQuote, FileText, TrendingUp } from 'lucide-react';

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalTestimonials: number;
  activeTestimonials: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalLeads: 0, newLeads: 0, totalTestimonials: 0, activeTestimonials: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [leadsRes, newLeadsRes, testimonialsRes, activeTestRes, recentRes] = await Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'nuevo'),
      supabase.from('testimonials').select('*', { count: 'exact', head: true }),
      supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
    ]);

    setStats({
      totalLeads: leadsRes.count || 0,
      newLeads: newLeadsRes.count || 0,
      totalTestimonials: testimonialsRes.count || 0,
      activeTestimonials: activeTestRes.count || 0,
    });
    setRecentLeads(recentRes.data || []);
    setLoading(false);
  };

  const statCards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'bg-terracotta/10 text-terracotta' },
    { label: 'Leads Nuevos', value: stats.newLeads, icon: TrendingUp, color: 'bg-green-500/10 text-green-600' },
    { label: 'Testimonios', value: stats.totalTestimonials, icon: MessageSquareQuote, color: 'bg-olive/10 text-olive' },
    { label: 'Testimonios Activos', value: stats.activeTestimonials, icon: FileText, color: 'bg-blue-500/10 text-blue-600' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-ink/10 border-t-terracotta rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink font-light">Dashboard</h1>
        <p className="text-ink/50 text-sm mt-1">Resumen general de tu sitio web</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl p-6 border border-ink/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-serif text-ink">{card.value}</p>
              <p className="text-ink/40 text-xs uppercase tracking-widest mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-2xl border border-ink/5 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-ink/5">
          <h2 className="font-serif text-xl text-ink">Últimos Contactos</h2>
        </div>
        {recentLeads.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Users className="w-10 h-10 text-ink/10 mx-auto mb-3" />
            <p className="text-ink/40 text-sm">Aún no hay contactos registrados</p>
          </div>
        ) : (
          <div className="divide-y divide-ink/5">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="px-6 py-4 flex items-center justify-between hover:bg-ink/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
                    <span className="text-terracotta font-serif text-sm">{lead.nombre?.charAt(0)?.toUpperCase() || '?'}</span>
                  </div>
                  <div>
                    <p className="text-ink text-sm font-medium">{lead.nombre}</p>
                    <p className="text-ink/40 text-xs">{lead.email}</p>
                  </div>
                </div>
                <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium ${
                  lead.status === 'nuevo' ? 'bg-green-500/10 text-green-600' :
                  lead.status === 'contactado' ? 'bg-blue-500/10 text-blue-600' :
                  lead.status === 'cliente' ? 'bg-terracotta/10 text-terracotta' :
                  'bg-ink/5 text-ink/40'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
