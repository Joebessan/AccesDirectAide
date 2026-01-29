import { useEffect } from "react";
import { Link } from "wouter";
import { 
  Calendar, 
  FileText, 
  MessageSquare, 
  Search, 
  Bell, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  User,
  Settings,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { GlassCard } from "@/components/glass-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const quickActions = [
  { icon: Search, label: "Chercher une aide", href: "/aides", color: "bg-primary" },
  { icon: Calendar, label: "Prendre RDV", href: "/rendez-vous/nouveau", color: "bg-accent" },
  { icon: FileText, label: "Mes documents", href: "/documents", color: "bg-chart-3" },
  { icon: MessageSquare, label: "Messagerie", href: "/messages", color: "bg-chart-4" },
];

const recentActivities = [
  { type: "rdv", title: "Rendez-vous confirmé", description: "Avec Marie D. - CAF", time: "Il y a 2h", status: "confirmed" },
  { type: "doc", title: "Document reçu", description: "Attestation de domicile", time: "Hier", status: "received" },
  { type: "msg", title: "Nouveau message", description: "De l'association Entraide", time: "Il y a 2 jours", status: "unread" },
];

const upcomingAppointments = [
  { 
    professional: "Marie D.", 
    role: "Conseillère CAF",
    date: "15 Fév 2025",
    time: "14:00",
    type: "Présentiel",
    avatar: null
  },
  { 
    professional: "Jean M.", 
    role: "Assistant social",
    date: "18 Fév 2025",
    time: "10:30",
    type: "Visio",
    avatar: null
  },
];

const documents = [
  { name: "Carte d'identité", status: "received", date: "10 Jan 2025" },
  { name: "Justificatif de domicile", status: "to_provide", date: null },
  { name: "Avis d'imposition", status: "to_complete", date: "05 Jan 2025" },
];

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Session expirée",
        description: "Veuillez vous reconnecter...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const firstName = user.firstName || user.email?.split("@")[0] || "Utilisateur";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "received":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Reçu</Badge>;
      case "to_provide":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">À fournir</Badge>;
      case "to_complete":
        return <Badge className="bg-chart-4/10 text-chart-4 border-chart-4/20">À compléter</Badge>;
      case "confirmed":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Confirmé</Badge>;
      case "unread":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Non lu</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <section className="py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  Bonjour, {firstName} !
                </h1>
                <p className="text-muted-foreground">
                  Bienvenue sur votre espace personnel
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" data-testid="button-notifications">
                  <Bell className="w-4 h-4" />
                </Button>
                <Link href="/profil">
                  <Button variant="outline" className="gap-2" data-testid="button-profile">
                    <Settings className="w-4 h-4" />
                    Mon profil
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <GlassCard className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                    <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-sm">{action.label}</span>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg">Prochains rendez-vous</CardTitle>
                    <CardDescription>Vos rendez-vous à venir</CardDescription>
                  </div>
                  <Link href="/rendez-vous/nouveau">
                    <Button size="sm" className="gap-2" data-testid="button-new-appointment">
                      <Plus className="w-4 h-4" />
                      Nouveau
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((apt, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover-elevate transition-colors">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={apt.avatar || undefined} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {apt.professional[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{apt.professional}</div>
                          <div className="text-sm text-muted-foreground">{apt.role}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{apt.date}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                            <Clock className="w-3 h-3" />
                            {apt.time}
                          </div>
                        </div>
                        <Badge variant="outline">{apt.type}</Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Aucun rendez-vous à venir</p>
                      <Link href="/rendez-vous/nouveau">
                        <Button variant="ghost" className="mt-2">
                          Prendre un rendez-vous
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg">Mes documents</CardTitle>
                    <CardDescription>Suivi de vos justificatifs</CardDescription>
                  </div>
                  <Link href="/documents">
                    <Button variant="ghost" size="sm" className="gap-1" data-testid="button-view-documents">
                      Voir tout
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">{doc.name}</div>
                            {doc.date && (
                              <div className="text-xs text-muted-foreground">{doc.date}</div>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progression du dossier</span>
                      <span className="font-medium">33%</span>
                    </div>
                    <Progress value={33} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activité récente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "rdv" ? "bg-primary/10 text-primary" :
                        activity.type === "doc" ? "bg-accent/10 text-accent" :
                        "bg-chart-4/10 text-chart-4"
                      }`}>
                        {activity.type === "rdv" && <Calendar className="w-4 h-4" />}
                        {activity.type === "doc" && <FileText className="w-4 h-4" />}
                        {activity.type === "msg" && <MessageSquare className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{activity.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{activity.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <GlassCard className="gradient-primary text-white">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Besoin d'aide ?</h3>
                    <p className="text-sm opacity-90">Notre chatbot est là 24h/24</p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full" data-testid="button-chatbot">
                  Démarrer une conversation
                </Button>
              </GlassCard>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Aides recommandées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/30 hover-elevate cursor-pointer">
                    <div className="font-medium text-sm">Prime d'activité</div>
                    <div className="text-xs text-muted-foreground">Complément de revenus</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 hover-elevate cursor-pointer">
                    <div className="font-medium text-sm">APL</div>
                    <div className="text-xs text-muted-foreground">Aide au logement</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 hover-elevate cursor-pointer">
                    <div className="font-medium text-sm">CSS</div>
                    <div className="text-xs text-muted-foreground">Complémentaire santé</div>
                  </div>
                  <Link href="/aides">
                    <Button variant="outline" className="w-full mt-2" data-testid="button-explore-aides">
                      Explorer toutes les aides
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
