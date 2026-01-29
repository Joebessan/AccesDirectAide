import { Link } from "wouter";
import { FileText, Upload, Download, Trash2, Eye, FolderOpen, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";

const documents = [
  {
    id: 1,
    name: "Justificatif de domicile",
    type: "PDF",
    size: "1.2 Mo",
    date: "2025-01-15",
    category: "Identité",
    status: "validé"
  },
  {
    id: 2,
    name: "Avis d'imposition 2024",
    type: "PDF",
    size: "856 Ko",
    date: "2025-01-10",
    category: "Fiscal",
    status: "en attente"
  },
  {
    id: 3,
    name: "Attestation CAF",
    type: "PDF",
    size: "245 Ko",
    date: "2025-01-08",
    category: "Aides",
    status: "validé"
  },
  {
    id: 4,
    name: "RIB bancaire",
    type: "PDF",
    size: "124 Ko",
    date: "2025-01-05",
    category: "Bancaire",
    status: "validé"
  }
];

const categories = [
  { name: "Tous", count: 4 },
  { name: "Identité", count: 1 },
  { name: "Fiscal", count: 1 },
  { name: "Aides", count: 1 },
  { name: "Bancaire", count: 1 }
];

export default function DocumentsPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh">
        <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 pb-12 flex items-center justify-center">
          <div className="text-center">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Accès restreint</h1>
            <p className="text-muted-foreground mb-6">Connectez-vous pour accéder à vos documents.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/connexion">
                <Button data-testid="button-login-documents">Se connecter</Button>
              </Link>
              <Link href="/inscription">
                <Button variant="outline" data-testid="button-signup-documents">Créer un compte</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <section className="py-8 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh-subtle" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Mes documents</h1>
                <p className="text-muted-foreground">Gérez et partagez vos documents administratifs</p>
              </div>
              <Button className="gap-2" data-testid="button-upload-document">
                <Upload className="w-4 h-4" />
                Ajouter un document
              </Button>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Catégories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover-elevate transition-all"
                        data-testid={`button-category-${cat.name.toLowerCase()}`}
                      >
                        <span className="text-sm">{cat.name}</span>
                        <Badge variant="secondary">{cat.count}</Badge>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Stockage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilisé</span>
                        <span className="font-medium">2.4 Mo / 100 Mo</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[2.4%] gradient-primary rounded-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          placeholder="Rechercher un document..." 
                          className="pl-10"
                          data-testid="input-search-documents"
                        />
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filtrer
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-4 p-4 rounded-xl border bg-card/50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                          data-testid={`document-item-${doc.id}`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{doc.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <Badge 
                            variant={doc.status === "validé" ? "default" : "secondary"}
                            className={doc.status === "validé" ? "bg-accent text-accent-foreground" : ""}
                          >
                            {doc.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" data-testid={`button-view-${doc.id}`}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" data-testid={`button-download-${doc.id}`}>
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" data-testid={`button-delete-${doc.id}`}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {documents.length === 0 && (
                      <div className="text-center py-12">
                        <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="font-medium mb-2">Aucun document</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Commencez par ajouter vos premiers documents
                        </p>
                        <Button className="gap-2">
                          <Plus className="w-4 h-4" />
                          Ajouter un document
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
