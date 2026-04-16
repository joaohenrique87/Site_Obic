import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/secultobic.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-20 items-center justify-between px-4">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="ObIC - Observatório de Indicadores Culturais"
            className="h-10 md:h-16 w-auto bg-transparent transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Sobre</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <Link to="/quem-somos" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Quem Somos</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Conheça nossa história e missão</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/equipe" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Equipe</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Conheça nossos profissionais</p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/cultura-em-numeros" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  Cultura em Números
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/Relatorios" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  Relatórios
                </Link>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <Link to="/Pesquisas" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  Pesquisas e Estudos
                </Link>
              </NavigationMenuItem>
              
            </NavigationMenuList>
          </NavigationMenu>

          <Button variant="default" className="ml-4" asChild>
            <Link to="/Contato">Contato</Link>
          </Button>
        </nav>

        {/* Botão hambúrguer */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-4">
          <nav className="flex flex-col space-y-1">
            {[
              { to: "/quem-somos", label: "Quem Somos" },
              { to: "/equipe", label: "Equipe" },
              { to: "/cultura-em-numeros", label: "Cultura em Números" },
              { to: "/relatorios", label: "Relatórios" },
              { to: "/pesquisas", label: "Pesquisas" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full">
                <Link to="/contato" onClick={() => setIsOpen(false)}>Contato</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;