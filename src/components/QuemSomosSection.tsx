import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

// ─── Edite aqui o ID do vídeo principal ──────────────────────
const VIDEO_ID = "80EcQHpFv6Y";

// ─── Edite aqui o link do canal/playlist para o botão "Ver mais" ─
const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/playlist?list=PLJDWpFL5ny_ooRDdzxZp13tFuJPb35Ih7`;

const QuemSomosSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Grid: 2 colunas no desktop, 1 coluna no mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
          gap: 0,
          alignItems: "start",
        }}>

          {/* ── Coluna esquerda: texto ── */}
          <div style={{ paddingRight: "2rem", paddingBottom: "1rem" }}>
            <h2 style={{ fontFamily: "Cambria, serif", fontSize: "1.875rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              Quem Somos
            </h2>
            <p style={{ fontFamily: "Cambria, serif", fontSize: "1.125rem", marginBottom: "1rem", lineHeight: 1.7, textAlign: "justify" }}>
              O Observatório de Indicadores Culturais e Inovação em Dados (ObIC) é uma gerência dedicada da
              Secretaria de Cultura de Pernambuco (SECULT-PE) à pesquisa, monitoramento e coleta sistemática
              de dados da cultura do estado.
            </p>
            <p style={{ fontFamily: "Cambria, serif", fontSize: "1.125rem", marginBottom: "1.5rem", lineHeight: 1.7, textAlign: "justify" }}>
              Com um enfoque particular no acompanhamento dos estudos relacionados às políticas culturais
              desenvolvidas pela SECULT-PE, o Observatório desenvolve e analisa indicadores culturais,
              transformando números em informações para a tomada de decisão estratégica.
            </p>
            <Button size="lg" asChild>
              <Link to="/quem-somos">
                Saiba Mais
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* ── Coluna direita: vídeo refinado ── */}
          <div style={{
            borderLeft: "2px solid rgba(0,0,0,0.12)",
            paddingLeft: "2rem",
            paddingBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}>
            <h2 style={{ fontFamily: "Cambria, serif", fontSize: "1.875rem", fontWeight: 700 }}>
              ObiC na Mídia
            </h2>

            {/* Player com borda e sombra refinados */}
            <div style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
              background: "#000",
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                title="Vídeo ObIC"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Rodapé do vídeo: label + botão para playlist */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
             
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  background: "#FF0000",
                  color: "#fff",
                  fontFamily: "Cambria, serif",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = "1")}
              >
                <Play style={{ width: 13, height: 13, fill: "currentColor" }} />
                Ver playlist
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuemSomosSection;