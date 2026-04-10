import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Database, ClipboardList, Download, Loader2 } from "lucide-react";
import { fetchRelatorios } from "@/service/supabase";

import pnabImg from "@/assets/pnab.png";
import lpgImg from "@/assets/lpg.jpeg";
import premiosImg from "@/assets/rouanet.png";

const PESQUISAS_CONFIG = [
  {
    id: "PNAB",
    titulo: "PNAB - Política Nacional Aldir Blanc",
    img: pnabImg,
    descricao: "Documentação e dados sobre a execução da Política Nacional Aldir Blanc em Pernambuco."
  },
  {
    id: "LPG",
    titulo: "LPG - Lei Paulo Gustavo",
    img: lpgImg,
    descricao: "Relatórios e bases de dados sobre a implementação da Lei Paulo Gustavo no estado."
  },
  {
    id: "PREMIOS DA CASA",
    titulo: "Prêmios Culturais",
    img: premiosImg,
    descricao: "Análises e indicadores sobre editais de premiação e reconhecimento cultural."
  }
];

const Pesquisas = () => {
  const [arquivos, setArquivos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatorios().then(dados => {
      setArquivos(dados || []);
      setLoading(false);
    });
  }, []);

  const obterLinkArquivo = (pasta: string, tipo: "relatorio" | "base" | "formulario") => {
    const encontrado = arquivos.find(arq => {
      const caminho = arq.caminho_storage?.toLowerCase() || "";
      const nome = arq.nome_arquivo?.toLowerCase() || "";
      const naPastaCorreta = caminho.startsWith(pasta.toLowerCase() + "/");

      if (!naPastaCorreta) return false;

      switch (tipo) {
        case "relatorio":
          return nome.endsWith(".pdf") && 
          (nome.includes("relatorio") || nome.includes("escuta"));

        case "base":
          const extensoesDados = [".xlsx", ".csv", ".xls", ".rds"];
          return extensoesDados.some(ext => nome.endsWith(ext)) 
          || nome.includes("banco");

        case "formulario":
          return nome.includes("formulario");

        default:
          return false;
      }
    });

    return encontrado ? encontrado.linkDownload : null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            Pesquisas
          </h1>
        </div>

        <Tabs defaultValue="PNAB" className="w-full">
          
          {/* Cards superiores */}
          <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto bg-transparent mb-12">
            {PESQUISAS_CONFIG.map((p) => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className="group relative flex flex-col p-0 overflow-hidden rounded-2xl border border-border data-[state=active]:border-primary data-[state=active]:shadow-lg transition-all duration-300 bg-card hover:shadow-md"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 w-full text-left">
                  <span className="font-bold text-lg block group-data-[state=active]:text-primary">
                    {p.titulo}
                  </span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Conteúdo */}
          {PESQUISAS_CONFIG.map((p) => (
            <TabsContent key={p.id} value={p.id}>
              <div className="bg-card p-8 rounded-2xl border border-border shadow-soft">

                <h2 className="text-3xl font-bold text-primary mb-4">
                  {p.titulo}
                </h2>

                <div className="bg-muted/30 p-6 rounded-xl mb-8">
                  <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                    {p.descricao}
                  </p>
                </div>

                {loading ? (
                  <div className="flex justify-center p-4">
                    <Loader2 className="animate-spin text-primary" />
                  </div>
                ) : (

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <BotaoArquivo
                      icon={<FileText />}
                      label="Relatório"
                      href={obterLinkArquivo(p.id, "relatorio")}
                      color="bg-gradient-primary"
                    />

                    <BotaoArquivo
                      icon={<Database />}
                      label="Base de Dados"
                      href={obterLinkArquivo(p.id, "base")}
                      color="bg-green-600"
                    />

                    <BotaoArquivo
                      icon={<ClipboardList />}
                      label="Formulário"
                      href={obterLinkArquivo(p.id, "formulario")}
                      color="bg-gradient-accent"
                    />

                  </div>

                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};


const BotaoArquivo = ({ icon, label, href, color }: any) => (
  <a
    href={href || "#"}
    target="_blank"
    rel="noreferrer"
    className={`
      flex items-center justify-between
      p-5
      rounded-xl
      text-white
      transition-all
      shadow-soft
      ${color}
      ${!href 
        ? 'opacity-30 cursor-not-allowed grayscale' 
        : 'hover:scale-[1.03] hover:shadow-medium'
      }
    `}
    onClick={(e) => !href && e.preventDefault()}
  >

    <div className="flex items-center gap-3">
      {icon}
      <span className="font-semibold">
        {label} {!href && "(Breve)"}
      </span>
    </div>

    {href && <Download className="w-4 h-4" />}

  </a>
);

export default Pesquisas;