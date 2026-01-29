import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Chatbot } from "@/components/chatbot";
import { useAuth } from "@/hooks/use-auth";

import LandingPage from "@/pages/landing";
import DashboardPage from "@/pages/dashboard";
import AidesPage from "@/pages/aides";
import ProfessionnelsPage from "@/pages/professionnels";
import ContactPage from "@/pages/contact";
import DemarchesPage from "@/pages/demarches";
import MentionsLegalesPage from "@/pages/mentions-legales";
import ConfidentialitePage from "@/pages/confidentialite";
import AdminPage from "@/pages/admin";
import LoginPage from "@/pages/login";
import InscriptionPage from "@/pages/inscription";
import AideDetailPage from "@/pages/aide-detail";
import RendezVousPage from "@/pages/rendez-vous";
import DocumentsPage from "@/pages/documents";
import MessagesPage from "@/pages/messages";
import BlogPage from "@/pages/blog";
import NotFound from "@/pages/not-found";

function HomePage() {
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

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/connexion" component={LoginPage} />
      <Route path="/inscription" component={InscriptionPage} />
      <Route path="/aides" component={AidesPage} />
      <Route path="/aides/:id" component={AideDetailPage} />
      <Route path="/demarches" component={DemarchesPage} />
      <Route path="/professionnels" component={ProfessionnelsPage} />
      <Route path="/rendez-vous/nouveau" component={RendezVousPage} />
      <Route path="/documents" component={DocumentsPage} />
      <Route path="/messages" component={MessagesPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/mentions-legales" component={MentionsLegalesPage} />
      <Route path="/politique-confidentialite" component={ConfidentialitePage} />
      <Route path="/confidentialite" component={ConfidentialitePage} />
      <Route path="/cgu" component={MentionsLegalesPage} />
      <Route path="/accessibilite" component={MentionsLegalesPage} />
      <Route path="/faq" component={ContactPage} />
      <Route path="/secret-admin-panel-2026" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="accesdirectaide-theme">
        <TooltipProvider>
          <ScrollToTop />
          <Toaster />
          <Router />
          <Chatbot />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
