import { Link } from "wouter";
import { 
  Heart, 
  Search, 
  FileText, 
  Calendar, 
  Shield, 
  Users, 
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard, StatCard, GlassCard } from "@/components/glass-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const features = [
  {
    icon: <Search className="w-6 h-6 text-white" />,
    title: "Trouver des Aides",
    description: "Découvrez toutes les aides disponibles (argent, logement, santé) avec des informations officielles et à jour.",
  },
  {
    icon: <FileText className="w-6 h-6 text-white" />,
    title: "Démarches Simplifiées",
    description: "Réalisez vos démarches administratives avec des explications claires et un accompagnement personnalisé.",
  },
  {
    icon: <Calendar className="w-6 h-6 text-white" />,
    title: "Rendez-vous Faciles",
    description: "Prenez rendez-vous avec des professionnels ou associations en quelques clics, en présentiel ou en visio.",
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "Documents Sécurisés",
    description: "Déposez et partagez vos documents en toute sécurité avec un accès contrôlé et traçable.",
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Accompagnement Pro",
    description: "Connectez-vous avec des conseillers sociaux et associations vérifiés pour un suivi personnalisé.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-white" />,
    title: "Chatbot Intelligent",
    description: "Notre assistant vous guide 24h/24 pour trouver rapidement les informations dont vous avez besoin.",
  },
];

const testimonials = [
  {
    name: "Marie L.",
    role: "Particulier",
    content: "Grâce à AccesDirectAide, j'ai pu trouver les aides auxquelles j'avais droit et prendre rendez-vous facilement.",
    rating: 5,
  },
  {
    name: "Jean-Pierre M.",
    role: "Conseiller social",
    content: "Un outil formidable pour accompagner les personnes dans leurs démarches. Tout est centralisé et clair.",
    rating: 5,
  },
  {
    name: "Association Entraide",
    role: "Structure",
    content: "La plateforme nous permet de mieux gérer nos rendez-vous et de suivre l'avancement des dossiers.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-60 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center pt-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Votre guichet unique pour les aides</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
              Simplifiez vos{" "}
              <span className="text-gradient">démarches</span>
              <br />
              accédez à vos{" "}
              <span className="text-gradient">droits</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              AccesDirectAide vous accompagne pour trouver les aides disponibles, 
              réaliser vos démarches et rencontrer des professionnels qualifiés.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/api/login">
                <Button size="lg" className="text-base px-8 gap-2" data-testid="button-cta-start">
                  Commencer maintenant
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/aides">
                <Button size="lg" variant="outline" className="text-base px-8" data-testid="button-cta-discover">
                  Découvrir les aides
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>100% gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Sources officielles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Données sécurisées</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <StatCard value="10k+" label="Utilisateurs aidés" />
            <StatCard value="500+" label="Professionnels" />
            <StatCard value="50+" label="Types d'aides" />
            <StatCard value="98%" label="Satisfaction" />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tout ce dont vous avez <span className="text-gradient">besoin</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète pour vous accompagner dans toutes vos démarches administratives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ils nous font <span className="text-gradient">confiance</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des milliers de personnes utilisent AccesDirectAide pour leurs démarches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <GlassCard key={index} className="hover:scale-[1.02] transition-transform">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à simplifier vos démarches ?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Rejoignez des milliers de personnes qui ont déjà trouvé les aides dont ils avaient besoin.
            </p>
            <Link href="/api/login">
              <Button size="lg" variant="secondary" className="text-base px-8 gap-2" data-testid="button-cta-bottom">
                Créer mon compte gratuitement
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
