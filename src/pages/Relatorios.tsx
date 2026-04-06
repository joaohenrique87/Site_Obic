import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchTodosRelatorios } from "@/service/supabase";
import { FileText, Download, Eye, Search } from "lucide-react";

const CATEGORIAS = [
  { value: "todos", label: "Todos" },
  { value: "lpg",     label: "LPG" },
  { value: "pnab",    label: "PNAB" },
  { value: "lab",     label: "LAB" },
  { value: "premios", label: "Prêmios" },
];

const handleDownload = async (url: string, nome: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${nome}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (e) {
    console.error("Erro ao baixar PDF:", e);
  }
};

const RelatoriosPDF = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    fetchTodosRelatorios().then((data) => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const filtrados = todos.filter((arq) => {
    const matchBusca = arq.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === "todos" || arq.categoria === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-12">

        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-4">Relatórios em PDF</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pesquise e filtre nossos relatórios por categoria
          </p>
        </div>

        {/* Busca */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        {/* Pills de categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategoriaAtiva(cat.value)}
              style={{
                padding: '0.4rem 1.2rem',
                borderRadius: '999px',
                border: '2px solid',
                borderColor: categoriaAtiva === cat.value ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                background: categoriaAtiva === cat.value ? 'hsl(var(--primary))' : 'transparent',
                color: categoriaAtiva === cat.value ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lista de relatórios */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Carregando relatórios...</div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 mb-4 opacity-40" />
            <p>Nenhum relatório encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrados.map((arq) => (
              <div
                key={arq.id}
                className="relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredId(arq.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="p-5 flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2 capitalize text-sm">
                      {arq.nome}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {new Date(arq.created_at).toLocaleDateString("pt-BR")}
                      </p>
                      {arq.categoria && (
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.1rem 0.5rem',
                          borderRadius: '999px',
                          background: 'hsl(var(--primary)/0.1)',
                          color: 'hsl(var(--primary))',
                          textTransform: 'uppercase',
                        }}>
                          {arq.categoria}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botões no hover */}
                <div className={`absolute inset-0 bg-background/95 flex items-center justify-center gap-3 transition-opacity duration-300 ${hoveredId === arq.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <button
                    onClick={() => window.open(arq.linkPreview, "_blank")}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.5rem 1rem', borderRadius: '8px', border: 'none',
                      background: '#6d28d9', color: '#fff', fontWeight: 600,
                      fontSize: '0.85rem', cursor: 'pointer',
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    Visualizar
                  </button>
                  <button
                    onClick={() => handleDownload(arq.linkDownload, arq.nome)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.5rem 1rem', borderRadius: '8px', border: 'none',
                      background: '#16a34a', color: '#fff', fontWeight: 600,
                      fontSize: '0.85rem', cursor: 'pointer',
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RelatoriosPDF;