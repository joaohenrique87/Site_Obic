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
import LeiaMais from "@/components/LeiaMais";
import manuella from "@/assets/Manuella Oliveira ObIC.jpg";
import danillo from "@/assets/Danillo Rafael ObIC.jpg";
import mariana from "@/assets/Mariana Barros ObIC.jpg";
import joao from "@/assets/João Henrique - ObIC.jpg";
import pedro from "@/assets/Pedro Augusto - ObiC.jpeg";

/* IMPORTAR FOTOS INSTITUCIONAIS */
import cacau from "@/assets/cacau.jpg";
/* import anaPaula from "@/assets/ana-paula.jpg";*/
import yasmin from "@/assets/yasmin.jpg";

/* Estrutura Institucional */



const institucional = [
  {
    name: "Cacau de Paula",
    role: "Secretária de Cultura de Pernambuco",
    bio: "Jornalista, formada pela UNICAP, com MBA em Gestão de Marketing e Vendas pelo Cedepe Business School. Foi Secretária de Turismo e Lazer da Prefeitura do Recife e atuou no Marketing da Empresa Pernambucana de Turismo, onde ocupou os cargos de executiva sênior e gestora nacional, além de diretora comercial da Empetur. Também foi gerente de captação de Eventos Internacionais do Recife Convention & Visitors Bureau. Sempre divulgando a cultura de Pernambuco como nosso maior diferencial turístico e DNA do nosso estado, assumiu a gestão da Secretaria de Cultura do Governo do Estado de Pernambuco em agosto de 2023. O foco da sua gestão, alinhado ao plano de governo da governadora Raquel Lyra, é alavancar a cadeia produtiva da Cultura com a geração de emprego e renda, além de salvaguardar e valorizar as tradições do Estado.",
    initials: "CP",
    photo: cacau, 
  },
  {
    name: "Ana Paula Jardim",
    role: "Secretária Executiva de Gestão",
    bio: "Adicionar biografia institucional da Secretaria Executiva de Gestão.",
    initials: "AP",
    photo:"" ,
    highlight: true,
  },
  {
    name: "Yasmim Neves",
    role: "Secretária Executiva de Cultura",
    bio: "Yasmim Neves, brincante, Administradora de formação, foi Superintendente de Administração e Finanças, Gerente de Controle Interno, Gerente Administrativa, assumiu a Gerencia de Políticas Culturais e hoje exerce a função de Secretaria Executiva de Cultura da Secretaria Estadual de Cultura.",
    initials: "YN",
    photo: yasmin,
    highlight: true,
  },
];

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
    bio: "Doutorando e Mestre em Ciência Política pela Universidade Federal de Pernambuco, Bacharel em Relações Internacionais. Tem interesse em políticas públicas, análise de dados e métodos de pesquisa. Integra o Observatório desde julho de 2022. ",
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
    bio: "Graduação em Análise de Desenvolvimento de Sistema - SENAC. Integra o Observatório desde Julho de 2024.",
    initials: "JH",
    photo: joao,
  },
  {
    name: "Pedro Augusto",
    role: "Analista de Dados e Pesquisador",
    bio: "Mestrando em Informática Aplicada pela Universidade Federal Rural de Pernambuco, Bacharel em Ciências Atuariais pela Universidade Federal de Pernambuco. Tem interesse na área de analise de dados e políticas públicas. Integra o Observatório desde março de 2026.",
    initials: "PA",
    photo: pedro,
  },
];

const Equipe = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">

        {/* Hero */}
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


        {/* Estrutura Institucional */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            {/* Estrutura Institucional
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Estrutura Institucional
              </h2>

              
            </div>


            {/* Secretaria de Cultura */}
            <div className="max-w-sm mx-auto mb-10">
              {institucional.slice(0, 1).map((member, index) => (
                <Card
                  key={index}
                  className="border-2 border-primary shadow-medium"
                >
                  <CardHeader className="text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={member.photo} />
                      <AvatarFallback>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>

                    <CardTitle>{member.name}</CardTitle>

                    <CardDescription className="text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <LeiaMais text={member.bio}/>
                    
                  </CardContent>

                </Card>
              ))}
            </div>


            {/* Linha */}
            <div className="w-px h-12 bg-border mx-auto mb-10" />


            {/* Secretarias Executivas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">

              {institucional.slice(1).map((member, index) => (
                <Card
                  key={index}
                  className={`border-2 transition-all hover:shadow-medium ${member.highlight
                    ? "border-primary"
                    : ""
                    }`}
                >
                  <CardHeader className="text-center">

                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={member.photo} />
                      <AvatarFallback>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>

                    <CardTitle>
                      {member.name}
                    </CardTitle>

                    <CardDescription
                      className={
                        member.highlight
                          ? "text-primary font-medium"
                          : ""
                      }
                    >
                      {member.role}
                    </CardDescription>

                  </CardHeader>

                  <CardContent>
                    <LeiaMais text={member.bio}/>
                   
                  </CardContent>

                </Card>
              ))}

            </div>

          </div>
        </section>



        {/* Equipe ObIC */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Equipe do Observatório
              </h2>
            </div>

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

                    <CardTitle className="text-xl">
                      {member.name}
                    </CardTitle>

                    <CardDescription className="text-primary font-medium">
                      {member.role}
                    </CardDescription>

                  </CardHeader>

                  <CardContent>
                    <LeiaMais text={member.bio}/>
                     
                    
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