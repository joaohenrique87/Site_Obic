import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

import img1 from '../assets/Fotos/cultura1.jpg';
import img2 from '../assets/Fotos/cultura2.jpg';
import img3 from '../assets/Fotos/cultura3.jpg';
import img4 from '../assets/Fotos/cultura4.jpg';
import img5 from '../assets/Fotos/cultura5.jpg';
import img6 from '../assets/Fotos/cultura6.jpg';
import img7 from '../assets/Fotos/cultura7.jpg';
import img8 from '../assets/Fotos/cultura8.jpg';
import img9 from '../assets/Fotos/cultura9.jpg';
import img10 from '../assets/Fotos/cultura10.jpg';
import img11 from '../assets/Fotos/cultura11.jpg';
import img12 from '../assets/Fotos/cultura12.jpg';
import img13 from '../assets/Fotos/cultura13.jpg';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 md:py-32 min-h-[400px] md:min-h-[850px] flex items-center">

      {/* Imagens de fundo */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-20' : 'opacity-0'}`}
          style={{
            backgroundImage: `url('${img}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(20%)',
          }}
        />
      ))}

      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-hero opacity-20 z-10" />

      {/* Grid pattern */}
      <div className="absolute inset-0 z-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10" />

      <div className="container relative z-30 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl md:text-4xl max-w-2xl mx-auto opacity-50">
            Observatório de Indicadores Culturais e Inovação em Dados
          </h1>
          <p className="mb-8 text-xs text-white/90 sm:text-sm md:text-base max-w-xl mx-auto opacity-50">
            Transformando dados em informações para o desenvolvimento cultural de Pernambuco
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;