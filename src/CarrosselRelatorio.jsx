import React, { useState, useEffect, useRef } from 'react';
import { fetchRelatoriosRecentes } from './service/supabase';
import * as pdfjsLib from 'pdfjs-dist';
import './Carrossel.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const handleDownload = async (url, nome) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${nome}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (e) {
    console.error('Erro ao baixar PDF:', e);
  }
};

// Detecta quantos cards mostrar por vez
const useVisiveis = () => {
  const [visiveis, setVisiveis] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisiveis(1);
      else if (window.innerWidth < 1024) setVisiveis(2);
      else setVisiveis(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return visiveis;
};

const PdfCard = ({ arq }) => {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const renderCapa = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: arq.linkPreview,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/cmaps/',
          cMapPacked: true,
          withCredentials: false,
        });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const containerWidth = canvas.parentElement?.clientWidth || 280;
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
        if (!cancelled) setLoaded(true);
      } catch (e) {
        if (!cancelled) setErro(true);
      }
    };
    renderCapa();
    return () => { cancelled = true; };
  }, [arq.linkPreview]);

  return (
    <div className="card-relatorio">
      <div className="card-capa">
        {!loaded && !erro && <div className="capa-placeholder"><span>Carregando...</span></div>}
        {erro && <div className="capa-placeholder capa-erro"><span>PDF</span></div>}
        <canvas ref={canvasRef} className="capa-canvas" style={{ display: loaded ? 'block' : 'none' }} />
      </div>
      <div className="card-info">
        <h3>{arq.nome}</h3>
        <div className="acoes">
          <a href={arq.linkPreview} target="_blank" rel="noreferrer" className="btn-visualizar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Visualizar
          </a>
          <button className="btn-baixar" onClick={() => handleDownload(arq.linkDownload, arq.nome)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

const CarrosselRelatorio = () => {
  const [arquivos, setArquivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [index, setIndex] = useState(0);
  const visiveis = useVisiveis();

  useEffect(() => {
    fetchRelatoriosRecentes().then(dados => {
      setArquivos(dados);
      setLoading(false);
    }).catch(() => {
      setErro('Não foi possível carregar os relatórios.');
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loader">Carregando Indicadores Culturais...</div>;
  if (erro) return <div className="loader erro">{erro}</div>;
  if (arquivos.length === 0) return <div className="loader">Nenhum relatório encontrado.</div>;

  const maxIndex = Math.max(0, arquivos.length - visiveis);
  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(maxIndex, i + 1));

  return (
    <div className="container-carrossel">
      <div className="carrossel-wrapper">
        <button className="seta seta-esq" onClick={prev} disabled={index === 0}>&#8592;</button>
        <div className="carrossel-viewport">
          <div
            className="carrossel-faixa"
            style={{ transform: `translateX(-${index * (100 / visiveis)}%)` }}
          >
            {arquivos.map(arq => (
              <div
                key={arq.id}
                className="carrossel-item"
                style={{ flex: `0 0 ${100 / visiveis}%` }}
              >
                <PdfCard arq={arq} />
              </div>
            ))}
          </div>
        </div>
        <button className="seta seta-dir" onClick={next} disabled={index >= maxIndex}>&#8594;</button>
      </div>
    </div>
  );
};

export default CarrosselRelatorio;