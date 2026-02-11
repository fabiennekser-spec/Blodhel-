
import React, { useState, useRef, useEffect } from 'react';
import { getTattooIdeas, generateTattooImage } from '../services/geminiService';
import { TattooIdea } from '../types';

const styleOptions = [
  { label: "Glacial Flow", desc: "Elegant linework, like flowing ice.", icon: "fa-water" },
  { label: "Stone Runes", desc: "Raw, hand-etched ancient staves.", icon: "fa-gem" },
  { label: "Mountain Path", desc: "Detailed landscapes & topography.", icon: "fa-mountain" },
  { label: "Forest Veil", desc: "Organic dotwork & woodcut motifs.", icon: "fa-tree" },
  { label: "Celestial Geometry", desc: "Sacred math of the northern sky.", icon: "fa-star" },
  { label: "Traditional Fjord", desc: "Bold lines, historic Nordic beasts.", icon: "fa-dragon" },
  { label: "Elder Whispers", desc: "Fine-line, ghostly ancestral tales.", icon: "fa-wind" },
  { label: "Negative Space", desc: "The beauty in the void.", icon: "fa-moon" }
];

const AIStudio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [ideas, setIdeas] = useState<TattooIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({ brightness: 100, contrast: 100, saturation: 100 });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
        setFilters({ brightness: 100, contrast: 100, saturation: 100 });
      };
      reader.readAsDataURL(file);
    }
  };

  const getProcessedImage = async (src: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          resolve(canvas.toDataURL('image/jpeg', 0.9));
        } else {
          resolve(src);
        }
      };
      img.onerror = () => resolve(src);
    });
  };

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(prev => prev.filter(s => s !== style));
    } else {
      setSelectedStyles(prev => [...prev, style]);
    }
  };

  const handleGenerateIdeas = async () => {
    if (!prompt && !referenceImage) return;
    setLoading(true);
    try {
      let imageToSend = referenceImage;
      if (referenceImage) {
        imageToSend = await getProcessedImage(referenceImage);
      }
      const result = await getTattooIdeas(
        prompt || "Design inspired by reference image", 
        imageToSend || undefined,
        selectedStyles
      );
      setIdeas(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVisualise = async (title: string, desc: string) => {
    setImgLoading(true);
    setGeneratedImage(null);
    try {
      const img = await generateTattooImage(`${title}: ${desc}. Styles: ${selectedStyles.join(', ')}`);
      setGeneratedImage(img);
    } catch (error) {
      console.error(error);
    } finally {
      setImgLoading(false);
    }
  };

  const updateFilter = (type: 'brightness' | 'contrast' | 'saturation', value: number) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  return (
    <section id="studio" ref={sectionRef} className="py-40 bg-zinc-950 border-y border-slate-900/40 relative overflow-hidden mist-bg">
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none select-none">
        <span className="text-[20rem] font-black italic text-slate-800">ᚦ</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="reveal">
            <span className="text-slate-500 text-xs font-black uppercase tracking-[0.7em] mb-6 block">The Rune Sanctum</span>
            <h2 className="text-6xl md:text-8xl font-black mb-10 leading-tight">Sacred <br/><span className="text-gradient-frost">Vision</span></h2>
            <p className="text-zinc-500 mb-14 leading-relaxed text-xl font-light italic">
              Manifest your spirit. Provide a landscape, a thought, or a reference. Our Oracle will etch the vision of your ancestors.
            </p>
            
            <div className="bg-black border border-zinc-900 p-8 md:p-12 relative shadow-2xl">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-800"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-800"></div>
              
              <div className="mb-8">
                <h3 className="text-[10px] font-black mb-4 tracking-[0.4em] text-slate-400 uppercase">1. Visual Inspiration</h3>
                <div 
                  onClick={() => !referenceImage && fileInputRef.current?.click()}
                  className={`w-full transition-all flex flex-col items-center justify-center cursor-pointer group bg-zinc-950/50 ${referenceImage ? 'border border-zinc-800 p-4' : 'h-40 border-2 border-dashed border-zinc-800 hover:border-slate-700'}`}
                >
                  {referenceImage ? (
                    <div className="w-full">
                      <div className="relative w-full aspect-square md:aspect-video mb-6 overflow-hidden bg-black/50">
                        <img 
                          src={referenceImage} 
                          alt="Reference" 
                          className="w-full h-full object-contain"
                          style={{ filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)` }} 
                        />
                        <button 
                          onClick={(e) => { e.stopPropagation(); setReferenceImage(null); }}
                          className="absolute top-2 right-2 w-8 h-8 bg-black/80 flex items-center justify-center hover:text-white z-10 border border-zinc-800"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      <div className="space-y-4 px-2">
                         <div className="flex items-center space-x-4">
                            <label className="text-[9px] text-zinc-500 uppercase tracking-widest w-24">Light</label>
                            <input type="range" min="0" max="200" value={filters.brightness} onChange={(e) => updateFilter('brightness', parseInt(e.target.value))} className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-slate-500" />
                         </div>
                         <div className="flex items-center space-x-4">
                            <label className="text-[9px] text-zinc-500 uppercase tracking-widest w-24">Depth</label>
                            <input type="range" min="0" max="200" value={filters.contrast} onChange={(e) => updateFilter('contrast', parseInt(e.target.value))} className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-slate-500" />
                         </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <i className="fas fa-image text-2xl text-zinc-700 group-hover:text-slate-500 mb-4"></i>
                      <p className="text-xs text-zinc-600 uppercase tracking-widest font-black">Offer an image for the Oracle</p>
                    </>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              </div>

              <div className="mb-8">
                <h3 className="text-[10px] font-black mb-4 tracking-[0.4em] text-slate-400 uppercase">2. The Intent</h3>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="The wind through ancient pines..."
                  className="w-full h-32 bg-zinc-900/50 border border-zinc-800 p-6 text-white placeholder-zinc-800 focus:outline-none focus:border-slate-700 transition-all resize-none italic font-light text-base"
                />
              </div>

              <div className="mb-10">
                <h3 className="text-[10px] font-black mb-4 tracking-[0.4em] text-slate-400 uppercase">3. Choose Your Element</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {styleOptions.map((style) => (
                    <button
                      key={style.label}
                      onClick={() => toggleStyle(style.label)}
                      className={`text-left p-4 border transition-all duration-300 flex flex-col justify-between h-full min-h-[110px] group transform hover:scale-[1.03] active:scale-95 ${
                        selectedStyles.includes(style.label) 
                          ? 'bg-slate-900/20 border-slate-500 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                          : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-slate-700 hover:text-zinc-300'
                      }`}
                    >
                      <i className={`fas ${style.icon} text-lg mb-3 ${selectedStyles.includes(style.label) ? 'text-slate-300' : 'text-zinc-600 group-hover:text-slate-500'} transition-colors duration-300`}></i>
                      <div>
                        <span className="block text-[9px] font-black uppercase tracking-widest mb-1">{style.label}</span>
                        <span className="block text-[8px] font-light italic opacity-70 leading-relaxed">{style.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleGenerateIdeas}
                disabled={loading || (!prompt && !referenceImage)}
                className="w-full bg-slate-100 text-black py-6 font-black uppercase tracking-[0.4em] text-sm hover:bg-slate-300 transition-all disabled:opacity-20 flex items-center justify-center space-x-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                {loading ? (
                  <><i className="fas fa-snowflake animate-spin"></i> <span>Channeling Spirits...</span></>
                ) : (
                  <><i className="fas fa-feather-alt"></i> <span>Consult the Oracle</span></>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-12">
            {imgLoading ? (
              <div className="bg-zinc-900 border-2 border-dashed border-slate-900/30 aspect-square flex flex-col items-center justify-center p-12 text-center animate-pulse">
                <div className="relative mb-10">
                  <div className="w-24 h-24 border-2 border-slate-900/20 border-t-slate-500 rounded-full animate-spin"></div>
                  <i className="fas fa-eye absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500"></i>
                </div>
                <p className="text-slate-500 font-display text-2xl tracking-[0.3em] uppercase">Forging Your Saga</p>
              </div>
            ) : generatedImage ? (
              <div className="relative group bg-black shadow-[0_0_60px_rgba(0,0,0,1)] border border-zinc-900 p-2 reveal">
                <img src={generatedImage} alt="Prophecy Visual" className="w-full aspect-square object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-16 text-center m-2">
                  <h4 className="text-2xl font-black mb-6 text-slate-200 tracking-widest">A VISION MANIFEST</h4>
                  <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-light italic">"This mark is etched for you. To bring it to our realm, seal your path below."</p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button className="bg-white text-black px-8 py-4 font-black uppercase text-[10px] tracking-widest flex-1 hover:bg-slate-300 transition-colors">Save Seal</button>
                    <a href="#booking" className="bg-slate-800 text-white px-8 py-4 font-black uppercase text-[10px] tracking-widest flex-1 hover:bg-slate-700 transition-colors">Book Ritual</a>
                  </div>
                </div>
                <button onClick={() => setGeneratedImage(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/80 border border-zinc-900 flex items-center justify-center hover:text-white transition-colors">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {ideas.length === 0 ? (
                  <div className="bg-zinc-900/10 aspect-[4/5] border border-zinc-900 flex flex-col items-center justify-center text-center p-16 reveal">
                    <i className="fas fa-mountain text-4xl text-zinc-800 mb-8"></i>
                    <p className="text-zinc-700 italic tracking-[0.2em] uppercase text-[10px]">The mist awaits your inspiration.</p>
                  </div>
                ) : (
                  ideas.map((idea, idx) => (
                    <div key={idx} className="bg-zinc-950 p-10 border border-zinc-900 hover:border-slate-700 transition-all group relative overflow-hidden reveal">
                      <div className="absolute top-0 left-0 w-1 h-full bg-slate-800/20 group-hover:bg-slate-500 transition-all"></div>
                      <h4 className="text-white font-black text-xl mb-4 tracking-[0.2em] uppercase">{idea.title}</h4>
                      <p className="text-zinc-500 text-sm mb-8 leading-relaxed font-light italic">"{idea.description}"</p>
                      <button onClick={() => handleVisualise(idea.title, idea.description)} className="text-zinc-300 text-xs font-black uppercase tracking-[0.4em] hover:text-slate-400 flex items-center group/btn">
                        Manifest Vision <i className="fas fa-chevron-right ml-4 group-hover/btn:translate-x-4 transition-transform text-slate-500"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStudio;
