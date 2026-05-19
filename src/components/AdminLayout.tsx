import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard,
  Users,
  MessageSquareQuote,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  UploadCloud,
  CheckCircle2,
  Send,
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Leads (CRM)', path: '/admin/leads', icon: Users },
  { name: 'Campañas', path: '/admin/campanas', icon: Send },
  { name: 'Testimonios', path: '/admin/testimonios', icon: MessageSquareQuote },
  { name: 'Textos Web', path: '/admin/textos', icon: FileText },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handlePublish = async () => {
    const hookUrl = import.meta.env.VITE_DEPLOY_HOOK_URL;
    if (!hookUrl) {
      alert('El link de publicación (VITE_DEPLOY_HOOK_URL) no está configurado en .env');
      return;
    }
    
    setIsPublishing(true);
    try {
      const res = await fetch(hookUrl, { method: 'POST' });
      if (res.ok) {
        setPublishSuccess(true);
        setTimeout(() => setPublishSuccess(false), 4000);
      } else {
        alert('Hubo un error al notificar al servidor. Revisa la consola.');
      }
    } catch (error) {
      console.error('Error trigger:', error);
      alert('Error de conexión al intentar publicar.');
    } finally {
      setIsPublishing(false);
    }
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserName(user?.user_metadata?.full_name || user?.email || 'Admin');
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-ink flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-8 border-b border-cream/5">
          <Link to="/admin" onClick={() => setSidebarOpen(false)}>
            <h1 className="font-serif text-2xl font-light text-cream tracking-tight">
              Reinventadas <span className="text-terracotta italic">5.0</span>
            </h1>
          </Link>
          <p className="text-cream/30 text-[10px] tracking-[0.2em] uppercase mt-1">Panel de Control</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  active
                    ? 'bg-terracotta/15 text-terracotta'
                    : 'text-cream/50 hover:text-cream hover:bg-cream/5'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${active ? 'text-terracotta' : 'text-cream/30 group-hover:text-cream/60'}`} />
                <span>{item.name}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-terracotta/50" />}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-5 border-t border-cream/5">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-terracotta/20 flex items-center justify-center">
              <span className="text-terracotta font-serif text-sm font-medium">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-cream text-sm font-medium truncate">{userName}</p>
              <p className="text-cream/30 text-[10px] tracking-wider uppercase">Administrador</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-cream/40 hover:text-red-400 hover:bg-red-500/5 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-cream/30 hover:text-cream/60 hover:bg-cream/5 transition-all text-sm mt-1"
          >
            ← Volver a la web
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#F8F7F4]/80 backdrop-blur-md border-b border-ink/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-ink hover:bg-ink/5 rounded-xl transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <p className="hidden lg:block text-ink/40 text-xs tracking-widest uppercase">
              {navItems.find((item) => isActive(item.path))?.name || 'Panel'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {publishSuccess ? (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-green-500/10 text-green-700 border border-green-500/20 text-xs rounded-xl tracking-widest uppercase font-bold shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span className="hidden sm:inline">¡Ya publicado!</span>
                <span className="sm:hidden">¡Listo!</span>
              </div>
            ) : (
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="flex items-center gap-2 px-4 py-2.5 bg-ink text-cream text-xs rounded-xl hover:bg-ink/80 disabled:opacity-50 transition-all tracking-widest uppercase font-medium shadow-md"
              >
                {isPublishing ? (
                  <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                ) : (
                  <UploadCloud className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{isPublishing ? 'Enviando...' : 'Publicar Web'}</span>
                <span className="sm:hidden">{isPublishing ? '...' : 'Publicar'}</span>
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
