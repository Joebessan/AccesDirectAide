import { Link } from "wouter";
import { Heart, Mail, Lock, User, ArrowRight, Sparkles, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";

type AccountType = "particulier" | "professionnel" | "structure";

const accountTypes = [
  {
    id: "particulier" as AccountType,
    icon: User,
    title: "Particulier",
    description: "Je cherche des aides"
  },
  {
    id: "professionnel" as AccountType,
    icon: Users,
    title: "Professionnel",
    description: "Je suis conseiller social"
  },
  {
    id: "structure" as AccountType,
    icon: Building2,
    title: "Structure",
    description: "Association ou organisme"
  }
];

export default function InscriptionPage() {
  const [selectedType, setSelectedType] = useState<AccountType>("particulier");

  const handleSocialSignup = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-subtle" />
        
        <div className="absolute top-32 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-gradient-to-br from-primary/25 to-accent/15 blur-3xl animate-float-delayed" />
        
        <div className="absolute top-60 left-16 w-14 h-14 rounded-xl bg-white/30 dark:bg-white/10 backdrop-blur-sm -rotate-12 animate-float" />
        <div className="absolute bottom-40 right-24 w-10 h-10 rounded-full bg-primary/15 animate-pulse-soft" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-lg mx-auto">
            <div className="glass-premium rounded-3xl p-8 md:p-10 animate-scale-in shadow-glass">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-lg">AccesDirectAide</span>
                </div>
                <Link href="/connexion">
                  <Button variant="outline" size="sm" className="rounded-full text-sm">
                    Connexion
                  </Button>
                </Link>
              </div>

              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Créer un compte</h1>
                <p className="text-muted-foreground text-sm">
                  Rejoignez AccesDirectAide gratuitement
                </p>
              </div>

              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Type de compte</Label>
                <div className="grid grid-cols-3 gap-2">
                  {accountTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3 rounded-xl border transition-all duration-200 hover-elevate ${
                        selectedType === type.id
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border/50 bg-white/30 dark:bg-white/5 hover:border-primary/50"
                      }`}
                      data-testid={`button-type-${type.id}`}
                    >
                      <type.icon className={`w-5 h-5 mx-auto mb-1 ${
                        selectedType === type.id ? "text-primary" : "text-muted-foreground"
                      }`} />
                      <span className={`text-xs font-medium block ${
                        selectedType === type.id ? "text-primary" : ""
                      }`}>
                        {type.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleSocialSignup}
                size="lg"
                className="w-full mb-6"
                data-testid="button-social-signup"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Inscription rapide
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

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSocialSignup(); }}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Prénom"
                      className="h-11 rounded-xl border-border/50 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                      data-testid="input-firstname"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Nom"
                      className="h-11 rounded-xl border-border/50 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                      data-testid="input-lastname"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="pl-11 h-11 rounded-xl border-border/50 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimum 8 caractères"
                      className="pl-11 h-11 rounded-xl border-border/50 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                      data-testid="input-password"
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full group"
                  data-testid="button-signup-submit"
                >
                  Créer mon compte
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground mt-6">
                Déjà un compte ?{" "}
                <Link href="/connexion" className="text-primary hover:underline font-medium">
                  Se connecter
                </Link>
              </p>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              En créant un compte, vous acceptez nos{" "}
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
