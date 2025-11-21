import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'SERVICES', href: '#services' },
  { label: 'TECHNOLOGY', href: '#technology' },
  { label: 'FAQ', href: '#faq' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <a href="#" className="font-display font-bold text-xl md:text-2xl tracking-tight mix-blend-difference z-50 relative flex items-center gap-2">
          Diseño Pinnacle
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs md:text-sm uppercase tracking-widest hover:text-brand-red transition-colors relative group font-medium"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 border border-white/20 rounded-full text-xs md:text-sm uppercase tracking-widest hover:border-brand-red hover:text-brand-red transition-all duration-300 relative overflow-hidden group"
          >
             <span className="relative z-10">CONTACT US</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter hover:text-brand-red transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
               <motion.a
                  href="#contact"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-4 px-8 py-3 border border-white/20 rounded-full text-xl uppercase tracking-widest hover:bg-brand-red hover:border-brand-red transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};