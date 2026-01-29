import { useState } from "react";
import { Link } from "wouter";
import { 
  Search, 
  MapPin, 
  Video, 
  Users,
  Star,
  Calendar,
  ChevronDown,
  Filter,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const professionals = [
  {
    id: "1",
    name: "Marie Dupont",
    role: "Conseillère CAF",
    organization: "CAF du Bas-Rhin",
    avatar: null,
    domains: ["Aides sociales", "Logement", "Famille"],
    territories: ["67 - Bas-Rhin"],
    modalities: ["Présentiel", "Visio"],
    rating: 4.8,
    reviewCount: 124,
    nextAvailable: "Demain 14h00",
    bio: "Accompagnement personnalisé pour vos démarches CAF depuis 10 ans.",
  },
  {
    id: "2",
    name: "Jean Martin",
    role: "Assistant social",
    organization: "CCAS Strasbourg",
    avatar: null,
    domains: ["Insertion", "Logement", "Santé"],
    territories: ["67 - Bas-Rhin", "68 - Haut-Rhin"],
    modalities: ["Présentiel"],
    rating: 4.9,
    reviewCount: 87,
    nextAvailable: "Lundi 10h00",
    bio: "Spécialisé dans l'accompagnement des personnes en difficulté.",
  },
  {
    id: "3",
    name: "Association Entraide Alsace",
    role: "Structure d'accompagnement",
    organization: null,
    avatar: null,
    domains: ["Aides alimentaires", "Vêtements", "Insertion"],
    territories: ["67 - Bas-Rhin", "68 - Haut-Rhin"],
    modalities: ["Présentiel", "Visio"],
    rating: 4.7,
    reviewCount: 203,
    nextAvailable: "Aujourd'hui 16h00",
    bio: "Association d'entraide pour les personnes en situation de précarité.",
    isStructure: true,
  },
  {
    id: "4",
    name: "Sophie Bernard",
    role: "Conseillère Pôle Emploi",
    organization: "Pôle Emploi Colmar",
    avatar: null,
    domains: ["Emploi", "Formation", "Création d'entreprise"],
    territories: ["68 - Haut-Rhin"],
    modalities: ["Présentiel", "Visio"],
    rating: 4.6,
    reviewCount: 156,
    nextAvailable: "Mercredi 9h00",
    bio: "Accompagnement vers l'emploi et la reconversion professionnelle.",
  },
  {
    id: "5",
    name: "Centre Social du Neuhof",
    role: "Centre social",
    organization: null,
    avatar: null,
    domains: ["Aide administrative", "Soutien scolaire", "Loisirs"],
    territories: ["67 - Bas-Rhin"],
    modalities: ["Présentiel"],
    rating: 4.5,
    reviewCount: 89,
    nextAvailable: "Jeudi 14h30",
    bio: "Accueil et accompagnement des habitants du quartier.",
    isStructure: true,
  },
  {
    id: "6",
    name: "Pierre Muller",
    role: "Médiateur social",
    organization: "Mairie de Mulhouse",
    avatar: null,
    domains: ["Médiation", "Accès aux droits", "Logement"],
    territories: ["68 - Haut-Rhin"],
    modalities: ["Présentiel", "Visio"],
    rating: 4.8,
    reviewCount: 67,
    nextAvailable: "Vendredi 11h00",
    bio: "Faciliter vos démarches et résoudre vos difficultés quotidiennes.",
  },
];

const domains = [
  "Tous les domaines",
  "Aides sociales",
  "Logement",
  "Emploi",
  "Santé",
  "Formation",
  "Famille",
  "Insertion",
];

const territories = [
  "Toute l'Alsace",
  "67 - Bas-Rhin",
  "68 - Haut-Rhin",
];

export default function ProfessionnelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("Tous les domaines");
  const [selectedTerritory, setSelectedTerritory] = useState("Toute l'Alsace");

  const filteredProfessionals = professionals.filter((pro) => {
    const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pro.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pro.domains.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDomain = selectedDomain === "Tous les domaines" || 
                         pro.domains.some(d => d === selectedDomain);
    const matchesTerritory = selectedTerritory === "Toute l'Alsace" || 
                            pro.territories.some(t => t === selectedTerritory);
    return matchesSearch && matchesDomain && matchesTerritory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Trouvez un <span className="text-gradient">professionnel</span>
              </h1>
              <p className="text-muted-foreground">
                Conseillers sociaux, associations et structures d'accompagnement à votre service.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par nom, spécialité..."
                  className="pl-12 h-12 text-base glass-card border-white/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-professionals"
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger className="w-[200px] glass-card" data-testid="select-domain">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Domaine" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedTerritory} onValueChange={setSelectedTerritory}>
                  <SelectTrigger className="w-[200px] glass-card" data-testid="select-territory">
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Territoire" />
                  </SelectTrigger>
                  <SelectContent>
                    {territories.map((territory) => (
                      <SelectItem key={territory} value={territory}>{territory}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {filteredProfessionals.length} professionnel{filteredProfessionals.length > 1 ? "s" : ""} trouvé{filteredProfessionals.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((pro, index) => (
              <Card key={pro.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={pro.avatar || undefined} />
                      <AvatarFallback className={`text-lg ${pro.isStructure ? "bg-accent text-white" : "bg-primary text-white"}`}>
                        {pro.isStructure ? <Building2 className="w-6 h-6" /> : pro.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base leading-tight mb-1">{pro.name}</CardTitle>
                      <CardDescription className="text-sm">{pro.role}</CardDescription>
                      {pro.organization && (
                        <p className="text-xs text-muted-foreground mt-1">{pro.organization}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 fill-chart-4 text-chart-4" />
                    <span className="font-medium">{pro.rating}</span>
                    <span className="text-muted-foreground">({pro.reviewCount} avis)</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {pro.domains.slice(0, 3).map((domain, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs font-normal">
                        {domain}
                      </Badge>
                    ))}
                    {pro.domains.length > 3 && (
                      <Badge variant="outline" className="text-xs font-normal">
                        +{pro.domains.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{pro.territories[0]}</span>
                    </div>
                    {pro.modalities.includes("Visio") && (
                      <div className="flex items-center gap-1 text-accent">
                        <Video className="w-4 h-4" />
                        <span>Visio</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-sm">
                      <span className="text-muted-foreground">Prochain créneau : </span>
                      <span className="font-medium text-accent">{pro.nextAvailable}</span>
                    </span>
                  </div>

                  <Link href={`/rendez-vous/nouveau?professionnel=${pro.id}`}>
                    <Button className="w-full gap-2" data-testid={`button-rdv-${pro.id}`}>
                      <Calendar className="w-4 h-4" />
                      Prendre rendez-vous
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucun professionnel trouvé</h3>
              <p className="text-muted-foreground">
                Essayez avec d'autres critères de recherche.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
