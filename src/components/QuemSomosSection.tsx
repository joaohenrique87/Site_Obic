import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const VIDEO_ID = "80EcQHpFv6Y";
const PLAYLIST_ID = "PLJDWpFL5ny_ooRDdzxZp13tFuJPb35Ih7";

interface VideoItem {
  id: string;
  title: string;
  thumb: string;
  url: string;
  date: string;
}

const PlaylistGrid = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
        );
        const data = await res.json();
        const items: VideoItem[] = (data.items || []).map((item: any) => {
          const videoId = item.link.split('v=')[1]?.split('&')[0];
          const date = new Date(item.pubDate);
          const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
          return { id: videoId, title: item.title, thumb: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, url: item.link, date: formattedDate };
        });
        setVideos(items);
      } catch (e) {
        console.error('Erro ao buscar playlist:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <div style={{ color: '#888', fontSize: '0.85rem', padding: '1rem' }}>Carregando vídeos...</div>;
  if (videos.length === 0) return <div style={{ color: '#888', fontSize: '0.85rem' }}>Nenhum vídeo encontrado.</div>;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.75rem',
      overflowY: 'auto',
      maxHeight: '420px',
      paddingRight: '4px',
    }}>
      {videos.map((v) => (
        <a key={v.id} href={v.url} target="_blank" rel="noreferrer"
          style={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', overflow: 'hidden', textDecoration: 'none', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <img src={v.thumb} alt={v.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          <div style={{ padding: '0.5rem 0.6rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 0.2rem', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {v.title}
            </p>
            <p style={{ fontSize: '0.68rem', color: '#888', margin: 0 }}>{v.date}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

const QuemSomosSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Layout PC: 2 colunas com divisória | Mobile: 1 coluna */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '0',
          alignItems: 'start',
        }}>

          {/* Coluna esquerda — texto */}
          <div style={{ paddingRight: '2rem', paddingBottom: '1rem' }}>
            <h2 style={{ fontFamily: 'Cambria, serif', fontSize: '1.875rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Quem Somos
            </h2>
            <p style={{ fontFamily: 'Cambria, serif', fontSize: '1.125rem', marginBottom: '1rem', lineHeight: 1.7, textAlign: 'justify' }}>
              O Observatório de Indicadores Culturais e Inovação em Dados (ObIC) é uma gerência dedicada da
              Secretaria de Cultura de Pernambuco (SECULT-PE) à pesquisa, monitoramento e coleta sistemática
              de dados da cultura do estado.
            </p>
            <p style={{ fontFamily: 'Cambria, serif', fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: 1.7, textAlign: 'justify' }}>
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

          {/* Coluna direita — vídeos */}
          <div style={{
            borderLeft: '2px solid rgba(0,0,0,0.12)',
            paddingLeft: '2rem',
            paddingBottom: '1rem',
          }}>
            <h2 style={{ fontFamily: 'Cambria, serif', fontSize: '1.875rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Vídeos
            </h2>

            {/* Vídeo principal */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', marginBottom: '1rem' }}>
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                title="Vídeo ObIC"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <PlaylistGrid />
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuemSomosSection;