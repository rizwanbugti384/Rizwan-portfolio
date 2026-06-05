import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Code } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface HeaderProps {
  onOpenInbox: () => void;
  messageCount: number;
}

export default function Header({ onOpenInbox, messageCount }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section highlight logic
      const sections = ['home', 'about', 'skills', 'projects', 'testimonials', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Projects', target: 'projects' },
    { label: 'Testimonials', target: 'testimonials' },
    { label: 'Blog', target: 'blog' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            id="logo-anchor"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-405 group-hover:bg-sky-400 group-hover:text-slate-950 transition-all duration-300">
              <Code className="h-5 w-5" />
            </div>
            <span className="font-sans font-bold tracking-tight text-lg text-white group-hover:text-sky-400 transition-colors duration-300">
              Rizwan<span className="text-sky-400">.dev</span>
            </span>
          </a>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center space-x-8" id="nav-desktop">
            {menuItems.map((item) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.target);
                }}
                className={`font-sans font-medium text-sm tracking-wide transition-all duration-300 relative py-1 focus:outline-none ${
                  activeSection === item.target
                    ? 'text-sky-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.target && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-450"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Secondary Action elements */}
          <div className="hidden md:flex items-center space-x-4">
            {messageCount > 0 && (
              <button
                onClick={onOpenInbox}
                className="relative bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-sky-400 px-3 py-1.5 rounded-lg border border-slate-705 text-xs transition duration-300 flex items-center gap-1.5 focus:outline-none cursor-pointer"
                id="btn-inbox-header"
              >
                <span>Inbox</span>
                <span className="h-4 min-w-4 px-1 rounded-full bg-sky-400 text-slate-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {messageCount}
                </span>
              </button>
            )}
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-sky-400 hover:bg-sky-500 active:scale-95 text-slate-950 text-sm font-bold px-4 py-2 rounded-lg transition duration-300 shadow-md shadow-sky-550/20 flex items-center group cursor-pointer focus:outline-none"
              id="btn-hire-me"
            >
              Contact Me
              <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Hamburger button */}
          <div className="flex items-center space-x-2 md:hidden">
            {messageCount > 0 && (
              <button
                onClick={onOpenInbox}
                className="relative bg-slate-800 text-slate-300 p-2 rounded-lg border border-slate-700 scale-90 focus:outline-none"
                id="btn-inbox-mobile-header"
              >
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-sky-400 text-slate-950 text-[8px] font-bold flex items-center justify-center">
                  {messageCount}
                </span>
                <span className="text-[10px] font-semibold">Inbox</span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
              id="btn-hamburger"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0f172a] border-b border-slate-800 overflow-hidden shadow-2xl"
            id="mobile-menu-drawer"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.target);
                  }}
                  className={`block px-4 py-3 rounded-lg text-base font-sans font-medium transition-colors ${
                    activeSection === item.target
                      ? 'bg-sky-500/10 text-sky-400'
                      : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-800 flex flex-col space-y-3 px-4">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full bg-sky-400 hover:bg-sky-500 text-slate-950 text-center font-bold py-2.5 rounded-lg transition duration-350 shadow-md shadow-sky-550/20"
                >
                  Hire Me / Talk
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
