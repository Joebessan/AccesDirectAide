import { Link } from "wouter";
import { 
  FileText, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  ListChecks,
  ExternalLink,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/glass-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const demarches = [
  {
    id: "1",
    title: "Demande de RSA",
    category: "Aides sociales",
    description: "Demander le Revenu de Solidarité Active auprès de la CAF.",
    steps: 4,
    duration: "15-20 min",
    documents: ["Pièce d'identité", "Justificatif de domicile", "RIB", "Avis d'imposition"],
    source: "CAF",
    sourceUrl: "https://www.caf.fr",
  },
  {
    id: "2",
    title: "Demande d'APL",
    category: "Logement",
    description: "Demander l'Aide Personnalisée au Logement pour réduire votre loyer.",
    steps: 5,
    duration: "20-25 min",
    documents: ["Bail", "Attestation de loyer", "Avis d'imposition", "RIB"],
    source: "CAF",
    sourceUrl: "https://www.caf.fr",
  },
  {
    id: "3",
    title: "Inscription Pôle Emploi",
    category: "Emploi",
    description: "S'inscrire comme demandeur d'emploi après une fin de contrat.",
    steps: 6,
    duration: "30-45 min",
    documents: ["Pièce d'identité", "Attestation employeur", "CV", "RIB"],
    source: "France Travail",
    sourceUrl: "https://www.francetravail.fr",
  },
  {
    id: "4",
    title: "Demande de CSS",
    category: "Santé",
    description: "Demander la Complémentaire Santé Solidaire pour vos frais de santé.",
    steps: 3,
    duration: "10-15 min",
    documents: ["Attestation de droits", "Avis d'imposition"],
    source: "Ameli",
    sourceUrl: "https://www.ameli.fr",
  },
  {
    id: "5",
    title: "Demande de bourse",
    category: "Études",
    description: "Faire une demande de bourse sur critères sociaux via le CROUS.",
    steps: 7,
    duration: "30-40 min",
    documents: ["Avis d'imposition parents", "Certificat de scolarité", "RIB"],
    source: "CROUS",
    sourceUrl: "https://www.messervices.etudiant.gouv.fr",
  },
  {
    id: "6",
    title: "Renouvellement carte d'identité",
    category: "État civil",
    description: "Renouveler votre carte nationale d'identité avant ou après expiration.",
    steps: 4,
    duration: "15-20 min",
    documents: ["Photo d'identité", "Justificatif de domicile", "Ancienne carte"],
    source: "Service-Public",
    sourceUrl: "https://www.service-public.fr",
  },
];

export default function DemarchesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-gradient">Démarches</span> administratives
              </h1>
              <p className="text-muted-foreground">
                Guides pas à pas pour réaliser vos démarches avec des explications simples et fiables.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demarches.map((demarche) => (
              <Card key={demarche.id} className="hover:shadow-lg transition-shadow overflow-hidden group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="outline">{demarche.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {demarche.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{demarche.title}</CardTitle>
                  <CardDescription>{demarche.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <ListChecks className="w-4 h-4 text-primary" />
                    <span>{demarche.steps} étapes</span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Documents nécessaires :</p>
                    <div className="flex flex-wrap gap-1.5">
                      {demarche.documents.slice(0, 3).map((doc, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs font-normal">
                          {doc}
                        </Badge>
                      ))}
                      {demarche.documents.length > 3 && (
                        <Badge variant="secondary" className="text-xs font-normal">
                          +{demarche.documents.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Info className="w-3 h-3" />
                    <span>Source: {demarche.source}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/demarches/${demarche.id}`} className="flex-1">
                      <Button variant="outline" className="w-full gap-1" data-testid={`button-demarche-${demarche.id}`}>
                        Commencer
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <a href={demarche.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 mt-16">
          <GlassCard className="gradient-primary text-white text-center py-12">
            <h2 className="text-2xl font-bold mb-4">
              Besoin d'accompagnement ?
            </h2>
            <p className="opacity-90 mb-6 max-w-xl mx-auto">
              Prenez rendez-vous avec un professionnel qui vous guidera dans vos démarches.
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
