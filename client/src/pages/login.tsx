import { Link } from "wouter";
import { Heart, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function LoginPage() {
  const handleSocialLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-subtle" />
        
        <div className="absolute top-32 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-2xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-gradient-to-br from-accent/25 to-primary/15 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/10 blur-xl animate-pulse-soft" />
        
        <div className="absolute top-40 right-20 w-16 h-16 rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-sm rotate-12 animate-float-slow" />
        <div className="absolute bottom-32 left-20 w-12 h-12 rounded-full bg-accent/20 animate-float" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="glass-premium rounded-3xl p-8 md:p-10 animate-scale-in shadow-glass">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-lg">AccesDirectAide</span>
                </div>
                <Link href="/inscription">
                  <Button variant="outline" size="sm" className="rounded-full text-sm">
                    S'inscrire
                  </Button>
                </Link>
              </div>

              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Connexion</h1>
                <p className="text-muted-foreground text-sm">
                  Accédez à votre espace personnel
                </p>
              </div>

              <Button 
                onClick={handleSocialLogin}
                size="lg"
                className="w-full mb-6"
                data-testid="button-social-login"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Connexion rapide
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card/80 backdrop-blur-sm px-3 text-muted-foreground">
                    ou par email
                  </span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSocialLogin(); }}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Adresse email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="pl-11 h-12 rounded-xl border-border/50 bg-white/50 dark:bg-white/5 backdrop-blur-sm transition-all duration-300 focus:scale-[1.01]"
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Mot de passe
                    </Label>
                    <Link href="/mot-de-passe-oublie" className="text-xs text-primary hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Votre mot de passe"
                      className="pl-11 h-12 rounded-xl border-border/50 bg-white/50 dark:bg-white/5 backdrop-blur-sm transition-all duration-300 focus:scale-[1.01]"
                      data-testid="input-password"
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full group"
                  data-testid="button-login-submit"
                >
                  Se connecter
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground mt-6">
                Pas encore de compte ?{" "}
                <Link href="/inscription" className="text-primary hover:underline font-medium">
                  Créer un compte gratuit
                </Link>
              </p>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              En vous connectant, vous acceptez nos{" "}
              <Link href="/cgu" className="text-primary hover:underline">CGU</Link>
              {" "}et notre{" "}
              <Link href="/politique-confidentialite" className="text-primary hover:underline">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
