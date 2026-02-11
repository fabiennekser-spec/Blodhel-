
import React, { useState, useEffect } from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md py-4 shadow-2xl border-b border-red-900/10' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center">
            {/* Logo Image - Assuming logo.png is placed in public folder */}
            <img 
              src="./logo.png" 
              alt="Blod' Hel Logo" 
              className="h-12 md:h-14 w-auto object-contain drop-shadow-[0_0_10px_rgba(185,28,28,0.5)]"
              onError={(e) => {
                // Fallback to text if image fails
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden ml-2 text-2xl font-black tracking-[0.3em] font-display flex items-center">
              <span className="text-white">BLOD'</span>
              <span className="text-red-700 ml-2">HEL</span>
            </span>
          </a>
          <div className="hidden md:flex space-x-10 items-center text-[10px] font-black tracking-[0.3em] uppercase">
            <a href="#gallery" className="text-zinc-400 hover:text-white transition-colors">Portfolios</a>
            <a href="#studio" className="text-zinc-400 hover:text-red-600 transition-colors">The Forge</a>
            <a href="#artists" className="text-zinc-400 hover:text-white transition-colors">The Clan</a>
            <a href="#aftercare" className="text-zinc-400 hover:text-white transition-colors">The Rituals</a>
            <a href="#booking" className="bg-red-700 text-white px-8 py-3 rounded-none hover:bg-white hover:text-black transition-all transform hover:-translate-y-0.5">The Covenant</a>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-black border-t border-zinc-900 py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
          <div className="col-span-2">
            <img 
              src="./logo.png" 
              alt="Blod' Hel Logo" 
              className="h-24 w-auto mb-8 opacity-80"
            />
            <p className="text-zinc-600 max-w-sm mb-10 leading-relaxed font-light italic">Sacred blood, cold iron, eternal ink. We manifest the ancient sagas into modern skin at blodhel-tattoo.studio.</p>
            <div className="flex space-x-8">
              <a href="#" className="text-zinc-500 hover:text-red-600 transition-colors text-xl"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-zinc-500 hover:text-red-600 transition-colors text-xl"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-zinc-500 hover:text-red-600 transition-colors text-xl"><i className="fab fa-pinterest-p"></i></a>
            </div>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase tracking-[0.3em] text-zinc-400 text-xs">The Hall</h4>
            <ul className="text-zinc-600 space-y-4 text-[11px] uppercase tracking-widest">
              <li className="flex items-center space-x-4"><i className="fas fa-map-marker-alt text-red-800"></i> <span>Oslo / Reykjavik / NYC</span></li>
              <li className="flex items-center space-x-4"><i className="fas fa-moon text-red-800"></i> <span>Consult by Shadow Only</span></li>
              <li className="flex items-center space-x-4"><i className="fas fa-envelope text-red-800"></i> <span>ink@blodhel-tattoo.studio</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase tracking-[0.3em] text-zinc-400 text-xs">The Mark</h4>
            <ul className="text-zinc-600 space-y-4 text-[11px] uppercase tracking-widest">
              <li><a href="#gallery" className="hover:text-red-600">The Archives</a></li>
              <li><a href="#studio" className="hover:text-red-600">The Forge</a></li>
              <li><a href="#booking" className="hover:text-red-600">The Covenant</a></li>
              <li><a href="#aftercare" className="hover:text-red-600">Aftercare Rituals</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center text-zinc-700 text-[9px] tracking-[0.5em] uppercase font-black">
          <p>&copy; {new Date().getFullYear()} BLOD' HEL TATTOO. BORN IN MIDGARD.</p>
          <p className="mt-4 md:mt-0">DESIGN BY BLOD' HEL DIGITAL</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
