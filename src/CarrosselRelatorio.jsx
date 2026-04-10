import React, { useState, useEffect, useRef } from "react";
import { fetchRelatorios } from "./service/supabase";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import "./Carrossel.css";

import * as pdfjsLib from "pdfjs-dist";
import PdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorker;

const PdfCard = ({ arq }) => {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const renderCapa = async () => {
      try {
        // A URL já vem encodada corretamente do service — não aplicar encodeURI aqui,
        // pois double-encode quebraria os %XX já existentes na URL.
        const urlPdf = arq.linkDownload;
        if (!urlPdf) throw new Error("Link não encontrado");

        const loadingTask = pdfjsLib.getDocument({
          url: urlPdf,
          cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/cmaps/",
          cMapPacked: true,
          disableAutoFetch: true,
          disableStream: true,
        });

        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const viewport = page.getViewport({ scale: 1.2 });
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        if (!cancelled) setLoaded(true);
      } catch (error) {
        console.error("Erro PDF:", error);
        if (!cancelled) setErro(true);
      }
    };

    renderCapa();
    return () => { cancelled = true; };
  }, [arq]);

  return (
    <div className="card-relatorio">
      <div className="card-capa">
        {!loaded && !erro && (
          <div className="capa-placeholder"><Loader2 className="animate-spin" /></div>
        )}
        {erro && <div className="capa-erro">PDF</div>}
        <canvas
          ref={canvasRef}
          className="canvas-pdf"
          style={{ display: loaded ? "block" : "none" }}
        />
      </div>

      <div className="card-info">
        <h3>{arq.nome_arquivo?.split("/").pop()}</h3>
        <div className="acoes">
          <a href={arq.linkDownload} target="_blank" rel="noreferrer" className="btn visualizar">
            Visualizar
          </a>
          <a href={arq.linkDownload} download className="btn baixar">
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

const CarrosselRelatorio = () => {
  const [arquivos, setArquivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchRelatorios()
      .then((dados) => {
        const validos = (dados || []).filter((arq) =>
          arq.nome_arquivo?.toLowerCase().endsWith(".pdf")
        );
        setArquivos(validos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="loading"><Loader2 className="animate-spin" /></div>;

  const visiveis = 4;
  const maxIndex = Math.max(0, arquivos.length - visiveis);
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));
  const prev = () => setIndex((i) => Math.max(0, i - 1));

  return (
    <div className="container-carrossel">
      <button className="seta esquerda" onClick={prev} disabled={index === 0}>
        <ChevronLeft size={26} />
      </button>

      <div className="carrossel-wrapper">
        <div
          className="carrossel-faixa"
          style={{ transform: `translateX(-${index * (100 / visiveis)}%)` }}
        >
          {arquivos.map((arq) => (
            <div key={arq.id} className="carrossel-item" style={{ width: `${100 / visiveis}%` }}>
              <PdfCard arq={arq} />
            </div>
          ))}
        </div>
      </div>

      <button className="seta direita" onClick={next} disabled={index >= maxIndex}>
        <ChevronRight size={26} />
      </button>
    </div>
  );
};

export default CarrosselRelatorio;