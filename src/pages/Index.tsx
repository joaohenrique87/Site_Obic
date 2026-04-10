import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Link } from "react-router-dom";
import CarrosselRelatorio from "@/CarrosselRelatorio.jsx";
import QuemSomosSection from "@/components/QuemSomosSection.jsx";

// REMOVIDO: import logosParceiros from "../assets/regua.png";
import regua from "@/assets/regua.png";
import pnab from "@/assets/pnab.png";
import lpg from "@/assets/lpg.jpeg";
import rouanet from "@/assets/rouanet.png";

const dashboards = [
  { href: "/cultura-em-numeros?tab=PNAB", img: pnab, alt: "Dashboard PNAB" },
  { href: "/cultura-em-numeros?tab=lpg", img: lpg, alt: "Dashboard Lei Paulo Gustavo" },
  { href: "/cultura-em-numeros?tab=rouanet", img: rouanet, alt: "Dashboard Lei Rouanet em Pernambuco" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="shadow-inner border-b border-black/5">
          <QuemSomosSection />
        </div>

        {/* Painéis de Dados */}
        <section className="py-20 bg-background relative z-10 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)]">
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

        {/* Parceiros — Usando a pasta public para evitar erros de import */}
        <section className="bg-white py-16 border-t border-border">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-12">
              Parceiros
            </h2>
            <div className="flex items-center justify-center p-4">
              <img
                src= "src/assets/regua.png" 
                alt="Nossos Parceiros"
                className="w-full max-w-4xl h-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;