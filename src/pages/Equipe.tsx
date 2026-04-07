import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import manuella from "@/assets/Manuella Oliveira ObIC.jpg";
import danillo from "@/assets/Danillo Rafael ObIC.jpg";
import mariana from "@/assets/Mariana Barros ObIC.jpg";
import joao from "@/assets/João Henrique - ObIC.jpg";
import pedro from "@/assets/Pedro Augusto - ObiC.jpeg";

const teamMembers = [
  {
    name: "Manuella Oliveira",
    role: "Gerente",
    bio: "Doutora em Sociologia pela Universidade Federal de Pernambuco (UFPE) e pela Universidad de La República (UDELAR - Uruguai), Bacharel em Ciências Sociais e Mestre em Desenvolvimento Local, pela Universidade Federal Rural de Pernambuco (UFRPE).  Integra o Observatório desde setembro de 2023.",
    initials: "MO",
    photo: manuella,
  },
  {
    name: "Danillo Rafael",
    role: "Analista de dados e Pesquisador",
    bio: "Doutorando e Mestre em Ciência Política pela Universidade Federal de Pernambuco, Bacharel em Relações Internacionais. Tem interesse em políticas públicas, análise de dados e métodos de pesquisa. Integra o Observatório desde julho de 2022.",
    initials: "DR",
    photo: danillo,
  },
  {
    name: "Mariana Barros",
    role: "Analista de dados e Pesquisador",
    bio: "Mestranda em Políticas Públicas pela Universidade Federal de Pernambuco, Bacharel em Ciência Política com Ênfase em Relações Internacionais pela Universidade Federal de Pernambuco (UFPE). Tem interesse pela área de políticas públicas, políticas culturais, análise de dados. Integra o Observatório desde julho de 2022.",
    initials: "MB",
    photo: mariana,
  },
  {
    name: "João Henrique",
    role: "Analista de dados e Pesquisador",
    bio: "Análista e Desenvolvedor de Sistema - SENAC. Integra o Observatório desde Julho de 2024.",
    initials: "JH",
    photo: joao,
  },
  {
    name: "Pedro Augusto",
    role: "Analista de Dados e Pesquisador",
    bio: "Mestrando em Informática Aplicada pela Universidade Federal Rural de Pernambuco (UFRPE). Bacharel em Ciências Atuariais pela Universidade Federal de Pernambuco. Tenho interesse em análise de dados, políticas públicas, vôlei e percussão. Integra o Observatorio desde março de 2026.",
    initials: "PA",
    photo: pedro,
  },
];

const Equipe = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-primary py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Nossa Equipe
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Conheça os profissionais que transformam dados em informações
                para a cultura de Pernambuco
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-primary transition-all hover:shadow-medium"
                >
                  <CardHeader className="text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage
                        src={member.photo}
                        alt={member.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-2xl font-bold text-primary-foreground bg-gradient-primary">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Equipe;
