import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Check, FileText, RefreshCw } from 'lucide-react';

interface ContentItem {
  id: string;
  section_key: string;
  section_label: string;
  text_value: string;
  page: string;
  updated_at: string;
}

export default function AdminContent() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [changes, setChanges] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .order('page', { ascending: true });
    if (data) setContent(data);
    setLoading(false);
  };

  const handleChange = (id: string, value: string) => {
    setChanges((prev) => ({ ...prev, [id]: value }));
    setSaved(false);
  };

  const getValue = (item: ContentItem) => {
    return changes[item.id] !== undefined ? changes[item.id] : item.text_value;
  };

  const hasChanges = Object.keys(changes).length > 0;

  const handleSaveAll = async () => {
    setSaving(true);
    const updates = Object.entries(changes).map(([id, text_value]) =>
      supabase.from('site_content').update({ text_value }).eq('id', id)
    );
    await Promise.all(updates);

    // Actualizar el estado local sin re-fetch (evita el flash de desaparición)
    setContent((prev) =>
      prev.map((item) =>
        changes[item.id] !== undefined
          ? { ...item, text_value: changes[item.id] }
          : item
      )
    );
    setChanges({});
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Group by page
  const groupedContent = content.reduce<Record<string, ContentItem[]>>((acc, item) => {
    if (!acc[item.page]) acc[item.page] = [];
    acc[item.page].push(item);
    return acc;
  }, {});

  const pageLabels: Record<string, string> = {
    landing: 'Landing Page',
    sobre_mi: 'Sobre Mí',
    talleres: 'Talleres',
    mentoria: 'Mentoría',
    testimonios: 'Testimonios',
    prensa: 'Prensa',
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
          <h1 className="font-serif text-3xl text-ink font-light">Textos de la Web</h1>
          <p className="text-ink/50 text-sm mt-1">Editá los textos que aparecen en cada sección</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 text-green-600 text-xs tracking-widest uppercase">
              <Check className="w-3.5 h-3.5" /> Guardado
            </span>
          )}
          <button
            onClick={handleSaveAll}
            disabled={!hasChanges || saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-terracotta text-cream text-xs rounded-xl hover:bg-terracotta/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all tracking-widest uppercase font-medium"
          >
            {saving ? (
              <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Guardando...</>
            ) : (
              <><Save className="w-3.5 h-3.5" /> Guardar cambios</>
            )}
          </button>
        </div>
      </div>

      {content.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink/5 px-6 py-16 text-center">
          <FileText className="w-10 h-10 text-ink/10 mx-auto mb-3" />
          <p className="text-ink/40 text-sm">No hay textos editables configurados</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedContent).map(([page, items]) => (
            <div key={page} className="bg-white rounded-2xl border border-ink/5 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-ink/5 bg-ink/[0.01]">
                <h2 className="font-serif text-lg text-ink">{pageLabels[page] || page}</h2>
              </div>
              <div className="p-6 space-y-5">
                {items.map((item) => (
                  <div key={item.id}>
                    <label className="block text-ink/60 text-xs uppercase tracking-widest mb-2">
                      {item.section_label}
                    </label>
                    {item.text_value.length > 100 || getValue(item).length > 100 ? (
                      <textarea
                        value={getValue(item)}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        rows={4}
                        className="w-full bg-[#F8F7F4] border border-ink/10 rounded-xl py-3 px-4 text-sm text-ink placeholder:text-ink/25 focus:outline-none focus:border-terracotta/40 resize-y transition-all"
                      />
                    ) : (
                      <input
                        type="text"
                        value={getValue(item)}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        className="w-full bg-[#F8F7F4] border border-ink/10 rounded-xl py-3 px-4 text-sm text-ink placeholder:text-ink/25 focus:outline-none focus:border-terracotta/40 transition-all"
                      />
                    )}
                    {changes[item.id] !== undefined && (
                      <p className="text-amber-500 text-[10px] uppercase tracking-widest mt-1">· Sin guardar</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
