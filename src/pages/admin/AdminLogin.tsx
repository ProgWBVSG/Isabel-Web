import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Credenciales incorrectas. Verificá tu email y contraseña.');
      setLoading(false);
      return;
    }

    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-terracotta rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-olive rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-light text-cream tracking-tight">
            Reinventadas <span className="text-terracotta italic">5.0</span>
          </h1>
          <p className="text-cream/40 text-sm mt-2 tracking-widest uppercase">Panel de Administración</p>
        </div>

        {/* Login Card */}
        <div className="bg-ink-light/50 backdrop-blur-xl border border-cream/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="flex items-center justify-center w-14 h-14 bg-terracotta/10 rounded-2xl mx-auto mb-6">
            <Lock className="w-6 h-6 text-terracotta" />
          </div>

          <h2 className="font-serif text-2xl text-cream text-center mb-2">Bienvenida</h2>
          <p className="text-cream/50 text-sm text-center mb-8">Ingresá tus credenciales para acceder</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-cream/60 text-xs uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full bg-cream/5 border border-cream/10 rounded-xl py-3.5 pl-11 pr-4 text-cream placeholder:text-cream/20 focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/30 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-cream/60 text-xs uppercase tracking-widest mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-cream/5 border border-cream/10 rounded-xl py-3.5 pl-11 pr-12 text-cream placeholder:text-cream/20 focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/30 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terracotta hover:bg-terracotta/80 disabled:opacity-50 disabled:cursor-not-allowed text-cream py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all duration-300 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  Ingresando...
                </span>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>
        </div>

        <p className="text-cream/20 text-xs text-center mt-6">
          Acceso restringido · Solo administradores
        </p>
      </div>
    </div>
  );
}
