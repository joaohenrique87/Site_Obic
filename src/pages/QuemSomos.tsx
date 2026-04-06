import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Eye, Heart, Lightbulb } from "lucide-react";

const QuemSomos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Quem Somos
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Conheça mais sobre o Observatório de Indicadores Culturais de Pernambuco
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 bg-background">
          <div className="container max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                O <strong>Observatório de Indicadores Culturais e Inovação em Dados (ObIC)</strong> é uma gerência dedicada 
                da Secretaria de Cultura de Pernambuco (SECULT-PE) à pesquisa, monitoramento e coleta sistemática de dados 
                da cultura do estado.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                Com um enfoque particular no acompanhamento dos estudos relacionados às políticas culturais desenvolvidas 
                pela SECULT-PE, o Observatório desenvolve e analisa indicadores culturais, transformando números em informações. 
                Essa análise serve como bússola para a tomada de decisão da alta gestão, orientando-os na formulação de políticas 
                públicas que não são apenas responsivas às necessidades culturais emergentes, mas também moldadas por uma 
                compreensão sólida das dinâmicas culturais do estado.
              </p>

              {/* Mission, Vision, Values, Objectives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                <div className="bg-muted rounded-2xl p-8 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Missão</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Auxiliar a cultura pernambucana através de dados e informações que promovam e apoiem as ações 
                    dos agentes, equipamentos e das organizações governamentais e não governamentais, contribuindo 
                    para o desenvolvimento cultural.
                  </p>
                </div>

                <div className="bg-muted rounded-2xl p-8 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center">
                      <Eye className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Visão</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Institucionalizar o monitoramento e a coleta sistemática de dados e informações da cultura, 
                    buscando criar uma gestão orientada por dados para tomada de decisão até 2026.
                  </p>
                </div>

                <div className="bg-muted rounded-2xl p-8 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Valores</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Transparência, ética, inovação e integridade em todas as nossas ações e relacionamentos 
                    com stakeholders.
                  </p>
                </div>

                <div className="bg-muted rounded-2xl p-8 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Objetivos</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Criar uma cultura de dados na gestão pública e ampliar o acesso às informações sobre 
                    agentes e equipamentos culturais no estado de Pernambuco.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default QuemSomos;
