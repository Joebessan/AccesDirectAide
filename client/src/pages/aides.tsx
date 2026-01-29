import { useState } from "react";
import { Link } from "wouter";
import { 
  Search, 
  Filter, 
  Euro, 
  Home, 
  Heart, 
  GraduationCap, 
  Briefcase, 
  Baby,
  ArrowRight,
  ExternalLink,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/glass-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const categories = [
  { id: "all", label: "Toutes", icon: null },
  { id: "money", label: "Argent", icon: Euro },
  { id: "housing", label: "Logement", icon: Home },
  { id: "health", label: "Santé", icon: Heart },
  { id: "education", label: "Études", icon: GraduationCap },
  { id: "employment", label: "Emploi", icon: Briefcase },
  { id: "family", label: "Famille", icon: Baby },
];

const aides = [
  {
    id: "1",
    title: "Prime d'activité",
    category: "money",
    description: "Complément de revenus pour les travailleurs aux ressources modestes.",
    eligibility: "Salariés, indépendants, étudiants salariés avec revenus modestes",
    amount: "Jusqu'à 595€/mois",
    source: "CAF",
    sourceUrl: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-professionnelle/la-prime-d-activite",
    sourceDate: "2025-01-15",
  },
  {
    id: "2",
    title: "APL - Aide Personnalisée au Logement",
    category: "housing",
    description: "Aide financière destinée à réduire le montant du loyer ou des mensualités d'emprunt.",
    eligibility: "Locataires, colocataires, sous-locataires déclarés",
    amount: "Variable selon situation",
    source: "CAF",
    sourceUrl: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement-et-cadre-de-vie/les-aides-au-logement",
    sourceDate: "2025-01-15",
  },
  {
    id: "3",
    title: "CSS - Complémentaire Santé Solidaire",
    category: "health",
    description: "Aide pour payer vos dépenses de santé si vos ressources sont modestes.",
    eligibility: "Personnes aux revenus modestes",
    amount: "Gratuite ou 1€/jour selon revenus",
    source: "Ameli",
    sourceUrl: "https://www.ameli.fr/assure/droits-demarches/difficultes-acces-droits-soins/complementaire-sante-solidaire",
    sourceDate: "2025-01-10",
  },
  {
    id: "4",
    title: "Bourse sur critères sociaux",
    category: "education",
    description: "Aide financière pour les étudiants en formation initiale.",
    eligibility: "Étudiants de moins de 28 ans, en formation initiale",
    amount: "De 1 454€ à 6 335€/an",
    source: "CROUS",
    sourceUrl: "https://www.etudiant.gouv.fr/fr/bourses-et-aides-financieres-702",
    sourceDate: "2025-01-12",
  },
  {
    id: "5",
    title: "RSA - Revenu de Solidarité Active",
    category: "money",
    description: "Revenu minimum pour assurer des moyens convenables d'existence.",
    eligibility: "Personnes de plus de 25 ans ou jeunes parents",
    amount: "Jusqu'à 635€/mois (personne seule)",
    source: "CAF",
    sourceUrl: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-professionnelle/le-rsa",
    sourceDate: "2025-01-15",
  },
  {
    id: "6",
    title: "Aide au permis de conduire",
    category: "employment",
    description: "Aide financière pour passer le permis de conduire.",
    eligibility: "Jeunes de 15 à 25 ans, demandeurs d'emploi",
    amount: "Jusqu'à 1 500€",
    source: "Pôle Emploi / Mission Locale",
    sourceUrl: "https://www.service-public.fr/particuliers/vosdroits/F2831",
    sourceDate: "2025-01-08",
  },
  {
    id: "7",
    title: "Allocation de rentrée scolaire",
    category: "family",
    description: "Aide pour les dépenses de la rentrée scolaire des enfants de 6 à 18 ans.",
    eligibility: "Familles aux revenus modestes avec enfants scolarisés",
    amount: "De 416€ à 454€ selon l'âge",
    source: "CAF",
    sourceUrl: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-familiale/l-allocation-de-rentree-scolaire",
    sourceDate: "2025-01-15",
  },
  {
    id: "8",
    title: "FSL - Fonds de Solidarité Logement",
    category: "housing",
    description: "Aide pour accéder à un logement ou s'y maintenir.",
    eligibility: "Personnes en difficulté pour accéder ou se maintenir dans un logement",
    amount: "Variable selon département",
    source: "Département",
    sourceUrl: "https://www.service-public.fr/particuliers/vosdroits/F1334",
    sourceDate: "2025-01-10",
  },
];

export default function AidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredAides = aides.filter((aide) => {
    const matchesSearch = aide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         aide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || aide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    if (cat?.icon) {
      const Icon = cat.icon;
      return <Icon className="w-4 h-4" />;
    }
    return null;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "money": return "bg-chart-4/10 text-chart-4 border-chart-4/20";
      case "housing": return "bg-primary/10 text-primary border-primary/20";
      case "health": return "bg-destructive/10 text-destructive border-destructive/20";
      case "education": return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "employment": return "bg-accent/10 text-accent border-accent/20";
      case "family": return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Trouvez les <span className="text-gradient">aides</span> auxquelles vous avez droit
              </h1>
              <p className="text-muted-foreground">
                Découvrez toutes les aides disponibles avec des informations officielles et à jour.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher une aide (ex: APL, Prime d'activité...)"
                  className="pl-12 h-12 text-base glass-card border-white/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-aides"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <div className="flex justify-center mb-8 overflow-x-auto">
              <TabsList className="glass-card h-auto p-1 flex-wrap">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    data-testid={`tab-category-${cat.id}`}
                  >
                    {cat.icon && <cat.icon className="w-4 h-4" />}
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAides.map((aide, index) => (
                  <Card key={aide.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge className={getCategoryColor(aide.category)}>
                          {getCategoryIcon(aide.category)}
                          <span className="ml-1">{categories.find(c => c.id === aide.category)?.label}</span>
                        </Badge>
                        <Badge variant="outline" className="font-semibold">
                          {aide.amount}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{aide.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{aide.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm">
                        <span className="font-medium">Éligibilité :</span>
                        <p className="text-muted-foreground mt-1 line-clamp-2">{aide.eligibility}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Info className="w-3 h-3" />
                        <span>Source: {aide.source} • {new Date(aide.sourceDate).toLocaleDateString("fr-FR")}</span>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/aides/${aide.id}`} className="flex-1">
                          <Button variant="outline" className="w-full gap-1 group" data-testid={`button-aide-details-${aide.id}`}>
                            En savoir plus
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                        <a href={aide.sourceUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" data-testid={`button-aide-source-${aide.id}`}>
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredAides.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune aide trouvée</h3>
                  <p className="text-muted-foreground">
                    Essayez avec d'autres mots-clés ou explorez une autre catégorie.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        <section className="container mx-auto px-4 mt-16">
          <GlassCard className="gradient-primary text-white text-center py-12">
            <h2 className="text-2xl font-bold mb-4">
              Besoin d'aide pour vos démarches ?
            </h2>
            <p className="opacity-90 mb-6 max-w-xl mx-auto">
              Prenez rendez-vous avec un professionnel qui vous accompagnera dans vos demandes d'aides.
            </p>
            <Link href="/professionnels">
              <Button variant="secondary" size="lg" className="gap-2" data-testid="button-cta-professionals">
                Trouver un professionnel
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </GlassCard>
        </section>
      </main>

      <Footer />
    </div>
  );
}
