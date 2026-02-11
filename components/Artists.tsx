
import React, { useEffect, useRef, useState } from 'react';

interface ArtistPortfolioItem {
  url: string;
  title: string;
}

interface Artist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  img: string;
  portfolio: ArtistPortfolioItem[];
}

const artistData: Artist[] = [
  {
    id: "ivar",
    name: "IVAR STONE-READER",
    role: "The Sculptor",
    specialty: "Mountain Linework & Runic Etching",
    img: "https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=600",
    portfolio: [
      { url: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=800", title: "Peak Ritual" },
      { url: "https://images.unsplash.com/photo-1610444583731-9e1e968c0496?auto=format&fit=crop&q=80&w=800", title: "Glacial Bindrune" },
      { url: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&q=80&w=800", title: "Stone Totem" },
    ]
  },
  {
    id: "freyja",
    name: "FREYJA VE",
    role: "The Seeress",
    specialty: "Sacred Runes & Ethereal Mist-Work",
    img: "https://images.unsplash.com/photo-1590246814883-5785014d3532?auto=format&fit=crop&q=80&w=600",
    portfolio: [
      { url: "https://images.unsplash.com/photo-1590246814883-5785014d3532?auto=format&fit=crop&q=80&w=800", title: "Mist Oracle" },
      { url: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800", title: "Ancestral Fog" },
      { url: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=800", title: "Ethereal Flow" },
    ]
  },
  {
    id: "erik",
    name: "ERIK SAGA-WEAVER",
    role: "The Chronicler",
    specialty: "Fjord Realism & Ancestral Portraiture",
    img: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=600",
    portfolio: [
      { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800", title: "The High Pass" },
      { url: "https://images.unsplash.com/photo-1562962245-e2d7d23d8c21?auto=format&fit=crop&q=80&w=800", title: "Warrior's Rest" },
      { url: "https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=800", title: "Nordic Gaze" },
    ]
  }
];

const Artists: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeArtist, setActiveArtist] = useState<Artist | null>(null);

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
          <span className="text-slate-500 text-xs font-black uppercase tracking-[0.8em] mb-8 block">The Ancestral Line</span>
          <h2 className="text-6xl md:text-8xl font-black mb-10 uppercase text-white">The <span className="text-slate-600">Clan</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-xl leading-relaxed font-light italic">
            Masters of the craft, sworn to translate the spirit's echo into permanent legend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {artistData.map((artist, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer reveal" 
              style={{ transitionDelay: `${idx * 150}ms` }}
              onClick={() => setActiveArtist(artist)}
            >
              <div className="relative overflow-hidden mb-12 aspect-[4/6] border-l-2 border-slate-900/20 hover:border-slate-500 transition-all duration-700">
                <img 
                  src={artist.img} 
                  alt={artist.name} 
                  className="w-full h-full object-cover grayscale brightness-50 transition-all duration-[2000ms] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/40 backdrop-blur-sm translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10rem] rune-font text-slate-100/10 absolute">ᚦ</span>
                  <div className="relative z-10 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white bg-slate-800/80 px-4 py-2">View Saga</span>
                  </div>
                </div>
                <div className="absolute bottom-12 left-10">
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">{artist.role}</p>
                   <h3 className="text-4xl font-black tracking-tighter uppercase leading-none">{artist.name}</h3>
                </div>
              </div>
              <div className="flex justify-between items-center px-4">
                <p className="text-zinc-600 text-[10px] font-black tracking-[0.5em] uppercase">{artist.specialty}</p>
                <i className="fas fa-plus text-slate-800 group-hover:text-slate-400 transition-colors"></i>
              </div>
              <div className="h-[1px] bg-zinc-900 group-hover:bg-slate-700 transition-all duration-1000 mx-4 mt-6"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Modal */}
      {activeArtist && (
        <div 
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-12 animate-fade-in"
          onClick={() => setActiveArtist(null)}
        >
          <button className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors z-[101]">
            <i className="fas fa-times text-4xl"></i>
          </button>
          
          <div 
            className="max-w-7xl w-full max-h-full overflow-y-auto stone-texture p-8 sm:p-20 relative border border-slate-900/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              <div className="lg:col-span-1">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.8em] mb-6 block">{activeArtist.role}</span>
                <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none mb-10">{activeArtist.name}</h3>
                <p className="text-zinc-500 italic text-lg leading-relaxed mb-12 border-l-2 border-slate-800 pl-8 font-light">
                  "Each stroke is a tether to the ancient ones. My work in <span className="text-slate-300 font-bold">{activeArtist.specialty}</span> is a life's pursuit of the majestic."
                </p>
                <a href="#booking" onClick={() => setActiveArtist(null)} className="inline-block bg-slate-100 text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.4em] hover:bg-slate-300 transition-all">
                  Request Ritual
                </a>
              </div>
              
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {activeArtist.portfolio.map((item, pidx) => (
                  <div key={pidx} className="group relative overflow-hidden aspect-[3/4] border border-slate-900">
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 scale-105 hover:scale-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                       <span className="text-white font-black uppercase text-[10px] tracking-widest">{item.title}</span>
                       <span className="text-slate-500 text-[8px] uppercase tracking-widest mt-2">Original Saga</span>
                    </div>
                  </div>
                ))}
                <div className="aspect-[3/4] border border-dashed border-slate-900/50 flex flex-col items-center justify-center p-10 text-center">
                  <i className="fas fa-snowflake text-slate-900 text-4xl mb-6"></i>
                  <p className="text-slate-700 text-[10px] uppercase tracking-widest leading-relaxed">More chronicles await in our physical sanctum.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Artists;
