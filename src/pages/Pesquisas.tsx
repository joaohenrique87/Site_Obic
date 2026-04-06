import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PDFList from "@/components/PDFList";

/**
 * PÁGINA DE PESQUISAS
 * 
 * Como melhorar:
 * 1. Adicione cards para cada pesquisa realizada
 * 2. Use o componente PDFList para disponibilizar os PDFs das pesquisas
 * 3. Adicione filtros por ano, tema ou tipo de pesquisa
 * 4. Integre com um dashboard de metodologias se necessário
 */
const Pesquisas = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pesquisas</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estudos, levantamentos e análises produzidos pelo ObIC sobre políticas culturais
          </p>
        </div>

        {/* 
          SEÇÃO DE PESQUISAS DESTACADAS
          Como personalizar:
          1. Substitua os cards abaixo por suas pesquisas reais
          2. Adicione ano, autores, resumo executivo
          3. Link para download ou visualização do PDF completo
        */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Pesquisa 1</CardTitle>
              <CardDescription>Ano 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Breve descrição da pesquisa e seus principais resultados.
                {/* EDITE: Adicione o resumo real da sua pesquisa */}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Pesquisa 2</CardTitle>
              <CardDescription>Ano 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Breve descrição da pesquisa e seus principais resultados.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Pesquisa 3</CardTitle>
              <CardDescription>Ano 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Breve descrição da pesquisa e seus principais resultados.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de todos os PDFs de pesquisas */}
        <PDFList 
          category="pesquisas"
          title="Todas as Pesquisas em PDF"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Pesquisas;
