import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CarrosselRelatorio from '@/CarrosselRelatorio.jsx';
import QuemSomosSection from "@/components/QuemSomosSection.jsx";

import pnab from "@/assets/pnab.png";
import lpg from "@/assets/lpg.jpeg";
import rouanet from "@/assets/rouanet.png";

const dashboards = [
  { href: "/cultura-em-numeros?tab=PNAB",    img: pnab,    alt: "Dashboard PNAB" },
  { href: "/cultura-em-numeros?tab=lpg",     img: lpg,     alt: "Dashboard Lei Paulo Gustavo" },
  { href: "/cultura-em-numeros?tab=rouanet", img: rouanet, alt: "Dashboard Lei Rouanet em Pernambuco" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        <QuemSomosSection />
       
        <section className="py-20 bg-background">
          <div className="max-w-[1600px] mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Dashboards
              </h2>
              <p className="text-lg font-['Cambria'] text-muted-foreground max-w-2xl mx-auto">
                Consulte abaixo os nossos Dashboards, onde você vai encontrar os resultados das leis analisadas por nós.
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

        <section className="py-20 bg-gradient-primary">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Explore Nossos Relatórios
            </h2>
            <CarrosselRelatorio />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;