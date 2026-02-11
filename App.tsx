
import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import AIStudio from './components/AIStudio';
import Artists from './components/Artists';
import Booking from './components/Booking';
import Aftercare from './components/Aftercare';

const App: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Gallery />
      <AIStudio />
      <Artists />
      <Aftercare />
      <Booking />
      
      {/* Scroll to Top Feature */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-red-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all transform hover:scale-110 z-40"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </Layout>
  );
};

export default App;
