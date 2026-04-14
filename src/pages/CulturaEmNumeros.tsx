import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PDFList from "@/components/PDFList";

const DashboardFrame = ({ src, title }: { src: string; title: string }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full rounded-lg overflow-hidden" style={{ minHeight: '600px' }}>
      {loading && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', background: 'hsl(var(--muted))',
          zIndex: 10, gap: '1rem',
        }}>
          <div style={{
            width: '48px', height: '48px', border: '4px solid hsl(var(--border))',
            borderTop: '4px solid hsl(var(--primary))', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', fontFamily: 'Cambria, serif' }}>
            Carregando dashboard...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        className="w-full"
        style={{ minHeight: '600px', border: 'none', display: 'block' }}
        allowFullScreen
        onLoad={() => setTimeout(() => setLoading(false), 4000)}
      />
    </div>
  );
};

const VALID_TABS = ["lpg", "PNAB", "rouanet"];

const CulturaEmNumeros = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const defaultTab = VALID_TABS.includes(tabParam ?? "") ? tabParam! : "lpg";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Dados</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Acesse dados e análises sobre políticas culturais através de nossos dashboards interativos e relatórios em PDF
          </p>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="flex flex-wrap w-full mb-8 h-auto gap-1">
            <TabsTrigger value="lpg" className="flex-1 min-w-[120px]">Lei Paulo Gustavo</TabsTrigger>
            <TabsTrigger value="PNAB" className="flex-1 min-w-[120px]">PNAB</TabsTrigger>
            <TabsTrigger value="rouanet" className="flex-1 min-w-[120px]">Rouanet em Pernambuco</TabsTrigger>
          </TabsList>

          {/* LEI PAULO GUSTAVO */}
          <TabsContent value="lpg" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - Lei Paulo Gustavo</CardTitle>
                <CardDescription>Visualização interativa dos dados da execução da Lei Paulo Gustavo</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://obicrestrito.shinyapps.io/LPG_V2/" title="Dashboard Lei Paulo Gustavo" />
              </CardContent>
            </Card>
            <PDFList title="Relatórios em PDF - Lei Paulo Gustavo" category="lpg" />
          </TabsContent>

          {/* PNAB */}
          <TabsContent value="PNAB" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - PNAB Ciclo 1</CardTitle>
                <CardDescription>Acompanhe a implementação e resultados da PNAB Ciclo 1</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://secultpe-obic.shinyapps.io/pnab/" title="Dashboard PNAB Ciclo 1" />
              </CardContent>
            </Card>
            <PDFList title="Relatórios em PDF - PNAB" category="pnab" />
          </TabsContent>

          {/* ROUANET */}
          <TabsContent value="rouanet" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - Lei Rouanet em Pernambuco</CardTitle>
                <CardDescription>Dados e indicadores da Lei Rouanet no Estado de Pernambuco</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardFrame src="https://secultpe-obic.shinyapps.io/rouanet-pe/" title="Dashboard Lei Rouanet PE" />
              </CardContent>
            </Card>
            <PDFList title="Relatórios em PDF - Rouanet" category="rouanet" />
          </TabsContent>

        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default CulturaEmNumeros;