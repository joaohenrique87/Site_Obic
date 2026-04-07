import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Link } from "react-router-dom";
import CarrosselRelatorio from "@/CarrosselRelatorio.jsx";
import QuemSomosSection from "@/components/QuemSomosSection.jsx";
import pnab from "@/assets/pnab.png";
import lpg from "@/assets/lpg.jpeg";
import rouanet from "@/assets/rouanet.png";
import fundarpe from "@/assets/FUNDARPE.png";
import fundaj from "@/assets/FUNDAJ.png";
import sebrae from "@/assets/SEBRAE.png";
import rbot from "@/assets/RBOT.png";
import ufpe from "@/assets/UFPE.png";

const dashboards = [
  { href: "/cultura-em-numeros?tab=PNAB", img: pnab, alt: "Dashboard PNAB" },
  {
    href: "/cultura-em-numeros?tab=lpg",
    img: lpg,
    alt: "Dashboard Lei Paulo Gustavo",
  },
  {
    href: "/cultura-em-numeros?tab=rouanet",
    img: rouanet,
    alt: "Dashboard Lei Rouanet em Pernambuco",
  },
];

const parceiros = [
  { img: fundarpe, alt: "Fundarpe" },
  { img: fundaj, alt: "Fundação Joaquim Nabuco" },
  { img: sebrae, alt: "Sebrae" },
  { img: rbot, alt: "RBOT" },
  { img: ufpe, alt: "UFPE" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        <QuemSomosSection />

        {/* Painéis de Dados */}
        <section className="py-20 bg-background">
          <div className="max-w-[1600px] mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Painéis de Dados
              </h2>
              <p className="text-lg font-['Cambria'] text-muted-foreground max-w-2xl mx-auto">
                Consulte abaixo os nossos Dashboards, onde você vai encontrar os
                resultados das leis analisadas por nós.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              {dashboards.map((d) => (
                <Link
                  key={d.href}
                  to={d.href}
                  className="group relative block overflow-hidden rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-500 shadow-lg w-full md:w-[calc(33.333%-1rem)]"
                >
                  <img
                    src={d.img}
                    alt={d.alt}
                    className="w-full h-auto object-cover group-hover:scale-[1.05] transition-transform duration-500"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Relatórios */}
        <section className="py-20 bg-gradient-primary">
          <div className="container text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Explore Nossos Relatórios
            </h2>
            <CarrosselRelatorio />
          </div>
        </section>

        {/* Parceiros — mesmo fundo da seção anterior, sem gap */}
        {/* Parceiros — fundo branco para as logos sem transparência */}
        <section className="bg-white py-16 border-t border-border">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-primary text-3xl md:text-4xl font-bold text-center mb-12">
              Parceiros
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
              {parceiros.map((p) => (
                <div
                  key={p.alt}
                  className="flex items-center justify-center p-2"
                >
                  <img
                    src={p.img}
                    alt={p.alt}
                    className="h-12 md:h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
