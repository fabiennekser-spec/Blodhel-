
import React, { useEffect, useRef } from 'react';

const artistData = [
  {
    name: "IVAR THE BONELESS",
    role: "The Dread-Needle",
    specialty: "Primal Blackwork & Scarification",
    img: "https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "FREYJA VE",
    role: "The Seeress",
    specialty: "Sacred Runes & Ethereal Fine-Line",
    img: "https://images.unsplash.com/photo-1590246814883-5785014d3532?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "ERIK BLOODAXE",
    role: "The Chronicler",
    specialty: "Saga Realism & Mythic Portraiture",
    img: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=600"
  }
];

const Artists: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="artists" ref={sectionRef} className="py-40 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32 reveal">
          <span className="text-[#c5a059] text-xs font-black uppercase tracking-[0.8em] mb-8 block">The Bloodline</span>
          <h2 className="text-6xl md:text-8xl font-black mb-10 uppercase">The Midgard <span className="text-gradient">Clan</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-xl leading-relaxed font-light italic">
            Each master is a keeper of the flame, sworn to translate the soul's burden into permanent legend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {artistData.map((artist, idx) => (
            <div key={idx} className="group cursor-pointer reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="relative overflow-hidden mb-12 aspect-[4/6] border-l-2 border-[#c5a059]/20 hover:border-[#c5a059] transition-all duration-700">
                <img 
                  src={artist.img} 
                  alt={artist.name} 
                  className="w-full h-full object-cover grayscale brightness-50 transition-all duration-[2000ms] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
                
                {/* Runic Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                  <span className="text-[12rem] rune-font">ᚦ</span>
                </div>

                <div className="absolute bottom-12 left-10">
                   <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.4em] mb-4">{artist.role}</p>
                   <h3 className="text-4xl font-black tracking-tighter uppercase leading-none">{artist.name}</h3>
                </div>
              </div>
              <p className="text-zinc-600 text-[10px] font-black tracking-[0.5em] uppercase mb-6 px-4">{artist.specialty}</p>
              <div className="h-[1px] bg-zinc-900 group-hover:bg-[#c5a059] transition-all duration-1000 mx-4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artists;
