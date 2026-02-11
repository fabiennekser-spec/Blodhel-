
import React, { useEffect, useRef, useState } from 'react';

const galleryItems = [
  { id: 1, url: 'https://images.unsplash.com/photo-1590246814883-5785014d3532?auto=format&fit=crop&q=80&w=800', category: 'The Elder Futhark' },
  { id: 2, url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=800', category: 'Valkyrie Wings' },
  { id: 3, url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=800', category: 'Jormungandr Coil' },
  { id: 4, url: 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&q=80&w=800', category: 'Odin\'s Ravens' },
  { id: 5, url: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800', category: 'Ragnarok Realism' },
  { id: 6, url: 'https://images.unsplash.com/photo-1610444583731-9e1e968c0496?auto=format&fit=crop&q=80&w=800', category: 'Sacred Bindrunes' },
];

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Runic Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-20 -left-10 text-[15rem] text-red-900 rotate-12 select-none font-display opacity-10">ᚠ</div>
          <div className="absolute bottom-40 -right-10 text-[15rem] text-red-900 -rotate-12 select-none font-display opacity-10">ᚹ</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto reveal">
          <span className="text-red-700 text-xs font-black uppercase tracking-[0.6em] mb-4 block">The Archives</span>
          <h2 className="text-5xl md:text-7xl font-black mb-8">Etched in <span className="text-gradient-blood">Blood & Ash</span></h2>
          <div className="h-[2px] w-24 bg-red-800 mx-auto mb-10"></div>
          <p className="text-zinc-500 text-lg leading-relaxed italic">
            "We do not merely paint on skin; we open the gates to Valhalla with every stroke."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden aspect-[3/4] bg-zinc-950 border border-zinc-900 hover:border-red-900/50 reveal cursor-pointer transition-all duration-500 shadow-lg hover:shadow-red-900/10"
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(item.id)}
            >
              <img 
                src={item.url} 
                alt={item.category} 
                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{item.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Masterpiece {item.id}</h3>
                  <div className="w-12 h-[2px] bg-red-700"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center reveal">
          <a href="#booking" className="inline-block px-16 py-5 border border-zinc-800 text-zinc-500 hover:text-white hover:border-red-700 hover:bg-red-900/10 transition-all uppercase text-xs font-black tracking-[0.5em]">
            Claim Your Mark
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-8 right-8 text-white hover:text-red-600 transition-colors z-[101]">
            <i className="fas fa-times text-4xl"></i>
          </button>
          <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryItems.find(i => i.id === selectedImage)?.url} 
              alt="Full view" 
              className="max-w-full max-h-[85vh] object-contain border border-zinc-800 shadow-[0_0_50px_rgba(185,28,28,0.15)]"
            />
            <div className="mt-6 text-center">
               <h3 className="text-3xl font-black uppercase tracking-[0.2em] text-red-700 font-display">
                 {galleryItems.find(i => i.id === selectedImage)?.category}
               </h3>
               <p className="text-zinc-500 text-xs tracking-widest uppercase mt-2">Blod' Hel Original</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
