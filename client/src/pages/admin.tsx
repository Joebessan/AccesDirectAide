import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  BarChart3,
  CheckCircle,
  XCircle,
  Eye,
  Shield,
  LogOut,
  Home,
  User,
  Building2,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard, GlassCard } from "@/components/glass-card";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/footer";

const pendingProfessionals = [
  {
    id: "1",
    name: "Dr. Sophie Martin",
    email: "sophie.martin@example.com",
    role: "Médecin généraliste",
    organization: "Cabinet médical Strasbourg",
    submittedAt: "2025-01-28",
    documents: ["Diplôme", "Attestation d'exercice"],
    requestVisio: true,
  },
  {
    id: "2",
    name: "Association Solidarité 67",
    email: "contact@solidarite67.org",
    role: "Structure d'accompagnement",
    organization: null,
    submittedAt: "2025-01-27",
    documents: ["Statuts", "Récépissé préfecture"],
    requestVisio: false,
    isStructure: true,
  },
];

const allUsers = [
  { id: "1", name: "Marie Dupont", email: "marie@example.com", role: "particulier", status: "active", createdAt: "2025-01-15" },
  { id: "2", name: "Jean Martin", email: "jean@example.com", role: "professionnel", status: "active", createdAt: "2025-01-10" },
  { id: "3", name: "Association Entraide", email: "entraide@example.com", role: "structure", status: "active", createdAt: "2025-01-05" },
  { id: "4", name: "Pierre Bernard", email: "pierre@example.com", role: "particulier", status: "suspended", createdAt: "2025-01-20" },
];

const recentAppointments = [
  { id: "1", user: "Marie D.", professional: "Jean M.", date: "2025-01-30 14:00", status: "confirmed" },
  { id: "2", user: "Sophie L.", professional: "Entraide Alsace", date: "2025-01-31 10:30", status: "pending" },
  { id: "3", user: "Paul R.", professional: "Marie D.", date: "2025-02-01 09:00", status: "confirmed" },
];

const ADMIN_CREDENTIALS = {
  username: "Admin26",
  password: "Azerty2026",
};

export default function AdminPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const adminAuth = sessionStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (loginForm.username === ADMIN_CREDENTIALS.username && 
          loginForm.password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem("adminAuth", "true");
        setIsAuthenticated(true);
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans l'espace administrateur.",
        });
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Identifiants incorrects.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setLocation("/");
  };

  const handleValidateProfessional = (id: string, approved: boolean) => {
    toast({
      title: approved ? "Professionnel validé" : "Demande refusée",
      description: approved 
        ? "Le professionnel peut maintenant utiliser la plateforme."
        : "La demande a été refusée.",
    });
  };

  const handleToggleVisio = (id: string, enabled: boolean) => {
    toast({
      title: enabled ? "Visio activée" : "Visio désactivée",
      description: `L'option visio a été ${enabled ? "activée" : "désactivée"} pour ce professionnel.`,
    });
  };

  const handleSuspendUser = (id: string, suspended: boolean) => {
    toast({
      title: suspended ? "Compte suspendu" : "Compte réactivé",
      description: suspended 
        ? "L'utilisateur ne peut plus accéder à la plateforme."
        : "L'utilisateur peut de nouveau accéder à la plateforme.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background gradient-mesh">
        <Card className="w-full max-w-md glass-strong">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle>Espace Administrateur</CardTitle>
            <CardDescription>Connectez-vous pour accéder au backoffice</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Identifiant</Label>
                <Input
                  id="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                  data-testid="input-admin-username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                  data-testid="input-admin-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-admin-login">
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-strong border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold">Administration</h1>
              <p className="text-xs text-muted-foreground">AccesDirectAide</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/")} data-testid="button-admin-home">
              <Home className="w-4 h-4 mr-2" />
              Retour au site
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} data-testid="button-admin-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard value="1,247" label="Utilisateurs" icon={<Users className="w-5 h-5 text-primary" />} />
          <StatCard value="89" label="Professionnels" icon={<Building2 className="w-5 h-5 text-accent" />} />
          <StatCard value="456" label="RDV ce mois" icon={<Calendar className="w-5 h-5 text-chart-3" />} />
          <StatCard value="2,341" label="Documents" icon={<FileText className="w-5 h-5 text-chart-4" />} />
        </section>

        <Tabs defaultValue="validation" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="validation" data-testid="tab-admin-validation">
              <CheckCircle className="w-4 h-4 mr-2" />
              Validations
            </TabsTrigger>
            <TabsTrigger value="users" data-testid="tab-admin-users">
              <Users className="w-4 h-4 mr-2" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="appointments" data-testid="tab-admin-appointments">
              <Calendar className="w-4 h-4 mr-2" />
              Rendez-vous
            </TabsTrigger>
            <TabsTrigger value="stats" data-testid="tab-admin-stats">
              <BarChart3 className="w-4 h-4 mr-2" />
              Statistiques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="validation">
            <Card>
              <CardHeader>
                <CardTitle>Professionnels en attente de validation</CardTitle>
                <CardDescription>
                  Examinez et validez les demandes d'inscription des professionnels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingProfessionals.length > 0 ? (
                  pendingProfessionals.map((pro) => (
                    <div key={pro.id} className="p-4 rounded-xl bg-muted/50 space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className={pro.isStructure ? "bg-accent text-white" : "bg-primary text-white"}>
                            {pro.isStructure ? <Building2 className="w-5 h-5" /> : pro.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{pro.name}</h4>
                            {pro.requestVisio && (
                              <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                                <Video className="w-3 h-3 mr-1" />
                                Demande visio
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{pro.role}</p>
                          <p className="text-sm text-muted-foreground">{pro.email}</p>
                          {pro.organization && (
                            <p className="text-sm text-muted-foreground">{pro.organization}</p>
                          )}
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          Soumis le {new Date(pro.submittedAt).toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Documents fournis :</span>
                        {pro.documents.map((doc, idx) => (
                          <Badge key={idx} variant="outline">{doc}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        {pro.requestVisio && (
                          <div className="flex items-center gap-2">
                            <Switch id={`visio-${pro.id}`} onCheckedChange={(checked) => handleToggleVisio(pro.id, checked)} />
                            <Label htmlFor={`visio-${pro.id}`} className="text-sm">Autoriser la visio</Label>
                          </div>
                        )}
                        <div className="flex gap-2 ml-auto">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleValidateProfessional(pro.id, false)}
                            data-testid={`button-reject-${pro.id}`}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Refuser
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleValidateProfessional(pro.id, true)}
                            data-testid={`button-approve-${pro.id}`}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Valider
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Aucune demande en attente</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>Liste de tous les utilisateurs de la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Inscription</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role === "particulier" && <User className="w-3 h-3 mr-1" />}
                            {user.role === "professionnel" && <User className="w-3 h-3 mr-1" />}
                            {user.role === "structure" && <Building2 className="w-3 h-3 mr-1" />}
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={user.status === "active" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}>
                            {user.status === "active" ? "Actif" : "Suspendu"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="icon" data-testid={`button-view-user-${user.id}`}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleSuspendUser(user.id, user.status === "active")}
                              data-testid={`button-suspend-user-${user.id}`}
                            >
                              {user.status === "active" ? (
                                <XCircle className="w-4 h-4 text-destructive" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-accent" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Rendez-vous récents</CardTitle>
                <CardDescription>Suivi des rendez-vous sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Professionnel</TableHead>
                      <TableHead>Date & Heure</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAppointments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">{apt.user}</TableCell>
                        <TableCell>{apt.professional}</TableCell>
                        <TableCell>{apt.date}</TableCell>
                        <TableCell>
                          <Badge className={apt.status === "confirmed" ? "bg-accent/10 text-accent" : "bg-chart-4/10 text-chart-4"}>
                            {apt.status === "confirmed" ? "Confirmé" : "En attente"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" data-testid={`button-view-apt-${apt.id}`}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activité mensuelle</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="w-16 h-16 opacity-50" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Répartition des utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Particuliers</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-primary rounded-full" />
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Professionnels</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-1/5 h-full bg-accent rounded-full" />
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Structures</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-[5%] h-full bg-chart-3 rounded-full" />
                        </div>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
