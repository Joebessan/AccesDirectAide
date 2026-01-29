import { Link } from "wouter";
import { Home, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gradient-mesh p-4 pt-24">
        <div className="glass-card rounded-3xl p-8 md:p-12 max-w-lg text-center animate-scale-in">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gradient mb-4">404</h1>
          
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Page non trouvée
          </h2>
          
          <p className="text-muted-foreground mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="gap-2 w-full sm:w-auto" data-testid="button-404-home">
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </Link>
            <Link href="/aides">
              <Button variant="outline" className="gap-2 w-full sm:w-auto" data-testid="button-404-aides">
                <Search className="w-4 h-4" />
                Chercher une aide
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
