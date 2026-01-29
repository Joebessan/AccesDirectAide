import { useRoute, Link } from "wouter";
import { 
  ArrowLeft, 
  Euro, 
  Home, 
  Heart, 
  GraduationCap, 
  Briefcase, 
  Baby,
  ExternalLink,
  Calendar,
  CheckCircle,
  Info,
  FileText,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const aides = [
  {
    id: "1",
    title: "Prime d'activité",
    category: "money",
    description: "Complément de revenus pour les travailleurs aux ressources modestes.",
    fullDescription: "La prime d'activité est une prestation sociale française créée en 2016. Elle remplace le RSA activité et la prime pour l'emploi. Cette aide est versée par la CAF ou la MSA et vise à encourager l'activité professionnelle en complétant les revenus des travailleurs modestes.",
    eligibility: "Salariés, indépendants, étudiants salariés avec revenus modestes",
    eligibilityDetails: [
      "Avoir plus de 18 ans",
      "Résider en France de manière stable",
      "Exercer une activité professionnelle",
      "Percevoir des revenus modestes (plafonds selon situation familiale)",
      "Être français ou européen, ou résider en France depuis 5 ans minimum"
    ],
    amount: "Jusqu'à 595€/mois",
    documents: ["Justificatifs de revenus des 3 derniers mois", "Attestation employeur", "Pièce d'identité", "RIB"],
    steps: [
      "Faire une simulation sur le site de la CAF",
      "Créer ou se connecter à son espace personnel CAF",
      "Remplir le formulaire de demande en ligne",
      "Joindre les pièces justificatives demandées",
      "Attendre la notification de décision"
    ],
    source: "CAF",
    sourceUrl: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-professionnelle/la-prime-d-activite",
    sourceDate: "2025-01-15",
  },
  {
    id: "2",
    title: "APL - Aide Personnalisée au Logement",
    category: "housing",
    description: "Aide financière destinée à réduire le montant du loyer ou des mensualités d'emprunt.",
    fullDescription: "L'Aide Personnalisée au Logement (APL) est une aide financière versée par la CAF pour réduire le montant de votre loyer. Elle s'adresse aux locataires, colocataires ou résidents en foyer. Le montant dépend de vos ressources, de la composition de votre foyer et du montant de votre loyer.",
    eligibility: "Locataires, colocataires, sous-locataires déclarés",
    eligibilityDetails: [
      "Être locataire d'un logement conventionné",
      "Résider en France de manière régulière",
      "Avoir des ressources ne dépassant pas certains plafonds",
      "Le logement doit être votre résidence principale",
      "Le logement doit répondre aux normes de décence"
    ],
    amount: "Variable selon situation",
    documents: ["Contrat de location", "Attestation de loyer", "Justificatifs de revenus", "Pièce d'identité"],
    steps: [
      "Vérifier l'éligibilité via le simulateur CAF",
      "Se connecter à son espace personnel CAF",
      "Compléter la demande d'aide au logement",
      "Fournir l'attestation de loyer du propriétaire",
      "Suivre l'avancement de la demande en ligne"
    ],
    source: "CAF",
    sourceUrl: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement-et-cadre-de-vie/les-aides-au-logement",
    sourceDate: "2025-01-15",
  },
  {
    id: "3",
    title: "CSS - Complémentaire Santé Solidaire",
    category: "health",
    description: "Aide pour payer vos dépenses de santé si vos ressources sont modestes.",
    fullDescription: "La Complémentaire Santé Solidaire (CSS) vous permet de bénéficier d'une complémentaire santé gratuite ou à 1€ par jour selon vos ressources. Elle prend en charge la part complémentaire de vos dépenses de santé (consultations, médicaments, hospitalisation, soins dentaires et optiques).",
    eligibility: "Personnes aux revenus modestes",
    eligibilityDetails: [
      "Résider en France de manière stable et régulière",
      "Avoir des ressources inférieures à un plafond défini",
      "Être affilié à l'Assurance Maladie",
      "Ne pas être déjà bénéficiaire d'une complémentaire santé"
    ],
    amount: "Gratuite ou 1€/jour selon revenus",
    documents: ["Pièce d'identité", "Justificatifs de revenus des 12 derniers mois", "RIB", "Attestation de droits Assurance Maladie"],
    steps: [
      "Vérifier votre éligibilité sur ameli.fr",
      "Télécharger le formulaire de demande",
      "Rassembler les justificatifs de ressources",
      "Envoyer le dossier complet à votre caisse d'assurance maladie",
      "Attendre la notification de décision"
    ],
    source: "Ameli",
    sourceUrl: "https://www.ameli.fr/assure/droits-demarches/difficultes-acces-droits-soins/complementaire-sante-solidaire",
    sourceDate: "2025-01-10",
  },
  {
    id: "4",
    title: "Bourse sur critères sociaux",
    category: "education",
    description: "Aide financière pour les étudiants en formation initiale.",
    fullDescription: "La bourse sur critères sociaux (BCS) est une aide financière accordée aux étudiants en formation initiale. Son montant est calculé selon les revenus des parents, le nombre d'enfants à charge dans la famille et l'éloignement du lieu d'études. Elle est versée sur 10 mois.",
    eligibility: "Étudiants de moins de 28 ans, en formation initiale",
    eligibilityDetails: [
      "Avoir moins de 28 ans au 1er septembre de l'année universitaire",
      "Être inscrit dans un établissement habilité",
      "Suivre une formation à temps plein",
      "Être de nationalité française ou européenne",
      "Respecter les conditions d'assiduité aux cours"
    ],
    amount: "De 1 454€ à 6 335€/an",
    documents: ["Avis fiscal des parents", "Justificatif de scolarité", "RIB", "Pièce d'identité"],
    steps: [
      "Créer son Dossier Social Étudiant (DSE) sur messervices.etudiant.gouv.fr",
      "Renseigner les informations demandées",
      "Joindre les pièces justificatives",
      "Valider le dossier avant la date limite",
      "Confirmer son inscription dans l'établissement"
    ],
    source: "CROUS",
    sourceUrl: "https://www.etudiant.gouv.fr/fr/bourses-et-aides-financieres-702",
    sourceDate: "2025-01-12",
  },
  {
    id: "5",
    title: "RSA - Revenu de Solidarité Active",
    category: "money",
    description: "Revenu minimum pour assurer des moyens convenables d'existence.",
    fullDescription: "Le Revenu de Solidarité Active (RSA) assure aux personnes sans ressources un niveau minimum de revenu. Il varie selon la composition du foyer. Les bénéficiaires ont des droits et des devoirs, notamment en matière d'insertion professionnelle et sociale.",
    eligibility: "Personnes de plus de 25 ans ou jeunes parents",
    eligibilityDetails: [
      "Avoir plus de 25 ans (ou moins avec enfant à charge)",
      "Résider en France de manière stable",
      "Être français ou en situation régulière depuis 5 ans",
      "Ne pas être étudiant (sauf exceptions)",
      "S'engager dans un parcours d'insertion"
    ],
    amount: "Jusqu'à 635€/mois (personne seule)",
    documents: ["Pièce d'identité", "Justificatifs de ressources", "Titre de séjour si applicable", "Justificatif de domicile"],
    steps: [
      "Faire une simulation sur caf.fr ou msa.fr",
      "Déposer une demande en ligne ou auprès de votre CAF/MSA",
      "Fournir les documents demandés",
      "Rencontrer un conseiller pour établir votre parcours d'insertion",
      "Respecter vos engagements d'insertion"
    ],
    source: "CAF",
    sourceUrl: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-professionnelle/le-rsa",
    sourceDate: "2025-01-15",
  },
  {
    id: "6",
    title: "Aide au permis de conduire",
    category: "employment",
    description: "Aide financière pour passer le permis de conduire.",
    fullDescription: "L'aide au permis de conduire vise à faciliter l'accès à l'emploi des jeunes et des demandeurs d'emploi en les aidant à financer leur permis de conduire. Plusieurs dispositifs existent selon votre situation : aide de Pôle Emploi, CPF, Mission Locale, ou aide régionale.",
    eligibility: "Jeunes de 15 à 25 ans, demandeurs d'emploi",
    eligibilityDetails: [
      "Être inscrit en tant que demandeur d'emploi",
      "Avoir un projet professionnel nécessitant le permis",
      "Ne pas disposer de ressources suffisantes",
      "Pour les jeunes : être suivi par une Mission Locale",
      "S'inscrire dans une auto-école partenaire"
    ],
    amount: "Jusqu'à 1 500€",
    documents: ["Attestation Pôle Emploi ou Mission Locale", "Pièce d'identité", "Justificatif de domicile", "Devis auto-école"],
    steps: [
      "Contacter votre conseiller Pôle Emploi ou Mission Locale",
      "Expliquer votre projet professionnel",
      "Obtenir l'accord de financement",
      "Choisir une auto-école conventionnée",
      "Démarrer la formation"
    ],
    source: "Pôle Emploi / Mission Locale",
    sourceUrl: "https://www.service-public.fr/particuliers/vosdroits/F2831",
    sourceDate: "2025-01-08",
  },
  {
    id: "7",
    title: "Allocation de rentrée scolaire",
    category: "family",
    description: "Aide pour les dépenses de la rentrée scolaire des enfants de 6 à 18 ans.",
    fullDescription: "L'Allocation de Rentrée Scolaire (ARS) aide les familles à financer les dépenses de la rentrée scolaire. Elle est versée automatiquement sous conditions de ressources. Le montant varie selon l'âge de l'enfant. Elle est versée à la fin du mois d'août.",
    eligibility: "Familles aux revenus modestes avec enfants scolarisés",
    eligibilityDetails: [
      "Avoir un ou plusieurs enfants scolarisés de 6 à 18 ans",
      "Respecter les plafonds de ressources",
      "L'enfant doit être inscrit dans un établissement scolaire",
      "Pour les 16-18 ans : fournir un certificat de scolarité"
    ],
    amount: "De 416€ à 454€ selon l'âge",
    documents: ["Aucun pour les moins de 16 ans (versement automatique)", "Certificat de scolarité pour les 16-18 ans"],
    steps: [
      "Vérifier que vous êtes allocataire CAF/MSA",
      "Mettre à jour votre situation familiale si nécessaire",
      "Pour les 16-18 ans : déclarer la scolarité sur votre espace",
      "L'ARS est versée automatiquement fin août",
      "Vérifier le versement sur votre relevé CAF"
    ],
    source: "CAF",
    sourceUrl: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-familiale/l-allocation-de-rentree-scolaire",
    sourceDate: "2025-01-15",
  },
  {
    id: "8",
    title: "FSL - Fonds de Solidarité Logement",
    category: "housing",
    description: "Aide pour accéder à un logement ou s'y maintenir.",
    fullDescription: "Le Fonds de Solidarité pour le Logement (FSL) aide les personnes en difficulté à accéder à un logement ou à s'y maintenir. Il peut prendre en charge le dépôt de garantie, les premiers mois de loyer, les impayés de loyer, les factures d'énergie, etc. Les conditions varient selon les départements.",
    eligibility: "Personnes en difficulté pour accéder ou se maintenir dans un logement",
    eligibilityDetails: [
      "Avoir des difficultés financières liées au logement",
      "Résider dans le département concerné",
      "Être locataire, sous-locataire ou en instance d'accès au logement",
      "Avoir des ressources insuffisantes pour faire face aux dépenses de logement"
    ],
    amount: "Variable selon département",
    documents: ["Pièce d'identité", "Justificatifs de revenus", "Quittances de loyer ou impayés", "Justificatif de domicile"],
    steps: [
      "Contacter le service social de votre mairie ou département",
      "Ou demander l'aide d'un travailleur social",
      "Constituer le dossier avec les pièces demandées",
      "Le dossier est étudié par une commission",
      "Recevoir la notification de décision"
    ],
    source: "Département",
    sourceUrl: "https://www.service-public.fr/particuliers/vosdroits/F1334",
    sourceDate: "2025-01-10",
  },
];

const categories: { [key: string]: { label: string; icon: any; color: string } } = {
  money: { label: "Argent", icon: Euro, color: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  housing: { label: "Logement", icon: Home, color: "bg-primary/10 text-primary border-primary/20" },
  health: { label: "Santé", icon: Heart, color: "bg-destructive/10 text-destructive border-destructive/20" },
  education: { label: "Études", icon: GraduationCap, color: "bg-chart-3/10 text-chart-3 border-chart-3/20" },
  employment: { label: "Emploi", icon: Briefcase, color: "bg-accent/10 text-accent border-accent/20" },
  family: { label: "Famille", icon: Baby, color: "bg-chart-5/10 text-chart-5 border-chart-5/20" },
};

export default function AideDetailPage() {
  const [, params] = useRoute("/aides/:id");
  const aide = aides.find(a => a.id === params?.id);
  
  if (!aide) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Aide non trouvée</h1>
            <Link href="/aides">
              <Button>Retour aux aides</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const category = categories[aide.category];
  const CategoryIcon = category?.icon || Euro;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <section className="py-8 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh-subtle" />
          <div className="container mx-auto px-4 relative z-10">
            <Link href="/aides">
              <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back-aides">
                <ArrowLeft className="w-4 h-4" />
                Retour aux aides
              </Button>
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="glass-premium rounded-3xl p-8 md:p-10 shadow-glass animate-scale-in">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <Badge className={`${category?.color} text-sm px-3 py-1`}>
                    <CategoryIcon className="w-4 h-4 mr-2" />
                    {category?.label}
                  </Badge>
                  <Badge variant="outline" className="text-lg font-bold px-4 py-2">
                    {aide.amount}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">{aide.title}</h1>
                <p className="text-lg text-muted-foreground mb-8">{aide.fullDescription}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        Conditions d'éligibilité
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {aide.eligibilityDetails.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="w-5 h-5 text-primary" />
                        Documents requis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {aide.documents.map((doc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-8 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5 text-chart-3" />
                      Étapes pour faire la demande
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {aide.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="pt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={aide.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button size="lg" className="w-full gap-2" data-testid="button-official-source">
                      <ExternalLink className="w-4 h-4" />
                      Accéder au site officiel ({aide.source})
                    </Button>
                  </a>
                  <Link href="/professionnels" className="flex-1">
                    <Button size="lg" variant="outline" className="w-full gap-2" data-testid="button-find-professional">
                      <Calendar className="w-4 h-4" />
                      Prendre rendez-vous
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="w-4 h-4" />
                  <span>
                    Source: {aide.source} • Mis à jour le {new Date(aide.sourceDate).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
