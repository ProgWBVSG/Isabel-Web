import { ReactNode, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FAQAssistant from './FAQAssistant';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Sobre Mí', path: '/sobre-mi' },
    { name: 'Talleres', path: '/talleres' },
    { name: 'Mentoría Individual', path: '/mentoria' },
    { name: 'Testimonios', path: '/testimonios' },
    { name: 'Reinventadas Prensa', path: '/prensa' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-ink bg-cream">
      {/* Navbar */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream/90 backdrop-blur-md border-b border-sand py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <span className="font-serif text-2xl font-medium tracking-tight text-ink">
                Reinventadas <span className="text-terracotta italic">5.0</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium tracking-wide text-ink hover:text-terracotta transition-colors uppercase"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://mi.tiendup.com/stores/reinventadas5-0/themes/customize/64586/72572_66219-69d456d51948c?page_id=home"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-cream px-6 py-2.5 rounded-full text-sm font-medium hover:bg-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ver propuesta
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-ink"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[72px] left-0 w-full z-40 md:hidden bg-cream border-b border-sand overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-serif text-ink"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://mi.tiendup.com/stores/reinventadas5-0/themes/customize/64586/72572_66219-69d456d51948c?page_id=home"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="bg-ink text-cream px-6 py-4 rounded-full text-center font-medium mt-4 text-lg"
              >
                Ver propuesta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-ink text-cream py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b border-cream/10 pb-12 mb-8">
            <div>
              <span className="font-serif text-3xl font-light tracking-tight block mb-4">
                Reinventadas <span className="text-terracotta italic">5.0</span>
              </span>
              <p className="text-cream/60 text-sm max-w-sm">
                Caminar hacia tu propósito es una decisión, no una edad. Nunca es tarde para ser auténtica.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-4">
              <a href="https://instagram.com/reinventadas5.0" target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-terracotta transition-colors">
                Instagram
              </a>
              <a href="https://wa.me/5491154581170" target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-terracotta transition-colors">
                WhatsApp: +54 9 11 5458 1170
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/40">
            <p>© {new Date().getFullYear()} Isabel Martinez Campos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* FAQ Assistant Bubble */}
      <FAQAssistant />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5491154581170?text=Hola%20Isabel,%20estoy%20en%20tu%20web%20y%20quiero%20saber%20m%C3%A1s%20sobre%20el%20programa"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
