import { useState, useEffect } from "react";
import { FileText, Download, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchTodosRelatorios } from "@/service/supabase";

const handleDownload = async (url: string, nome: string) => {
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

interface PDFListProps {
  title?: string;
  category: string;
}

const PDFList = ({ title, category }: PDFListProps) => {
  const [arquivos, setArquivos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

 useEffect(() => {
  const carregar = async () => {
    const dados = await fetchTodosRelatorios();
    console.log('categoria prop recebida:', JSON.stringify(category));
    console.log('categorias dos dados:', dados.map((a: any) => JSON.stringify(a.categoria)));
    console.log('Todos os dados:', dados);
    console.log('Filtrando por categoria:', category);
    const filtrados = category
      ? dados.filter((arq: any) => arq.categoria === category)
      : dados;
    console.log('Filtrados:', filtrados);
    setArquivos(filtrados);
    setLoading(false);
  };
  carregar();
}, [category]);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Carregando relatórios...</p>
        </CardContent>
      </Card>
    );
  }

  if (arquivos.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Nenhum relatório disponível nesta categoria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {arquivos.map((arq) => (
          <Card
            key={arq.id}
            className="relative overflow-hidden transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredId(arq.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2 capitalize">
                    {arq.nome}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(arq.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              {/* Botões aparecem no hover */}
              <div className={`absolute inset-0 bg-background/95 flex items-center justify-center gap-3 transition-opacity duration-300 ${hoveredId === arq.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => window.open(arq.linkPreview, '_blank')}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Visualizar
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDownload(arq.linkDownload, arq.nome)}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PDFList;