import { Link } from "wouter";
import { MessageSquare, Send, Search, User, Clock, Paperclip, MoreVertical, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Assistante sociale",
    lastMessage: "Bonjour, j'ai bien reçu vos documents. Je les examine...",
    time: "10:30",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "CAF Paris",
    role: "Service allocations",
    lastMessage: "Votre dossier APL a été validé. Vous recevrez...",
    time: "Hier",
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: "Pierre Martin",
    role: "Conseiller emploi",
    lastMessage: "N'hésitez pas si vous avez des questions.",
    time: "Lun",
    unread: 0,
    online: false
  }
];

const messages = [
  {
    id: 1,
    sender: "Marie Dupont",
    content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    time: "09:00",
    isMe: false
  },
  {
    id: 2,
    sender: "Moi",
    content: "Bonjour Marie, j'aurais besoin d'aide pour constituer mon dossier RSA.",
    time: "09:15",
    isMe: true
  },
  {
    id: 3,
    sender: "Marie Dupont",
    content: "Bien sûr ! Pour le RSA, vous aurez besoin des documents suivants : pièce d'identité, justificatif de domicile, et vos 3 derniers relevés bancaires.",
    time: "09:20",
    isMe: false
  },
  {
    id: 4,
    sender: "Moi",
    content: "Merci ! Je vais préparer tout ça. Dois-je vous les envoyer ici ?",
    time: "09:45",
    isMe: true
  },
  {
    id: 5,
    sender: "Marie Dupont",
    content: "Bonjour, j'ai bien reçu vos documents. Je les examine et je reviens vers vous rapidement.",
    time: "10:30",
    isMe: false
  }
];

export default function MessagesPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");

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
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Accès restreint</h1>
            <p className="text-muted-foreground mb-6">Connectez-vous pour accéder à votre messagerie.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/connexion">
                <Button data-testid="button-login-messages">Se connecter</Button>
              </Link>
              <Link href="/inscription">
                <Button variant="outline" data-testid="button-signup-messages">Créer un compte</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <section className="py-8 relative overflow-hidden h-[calc(100vh-12rem)]">
          <div className="absolute inset-0 gradient-mesh-subtle" />
          <div className="container mx-auto px-4 relative z-10 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-1">Messagerie</h1>
                <p className="text-muted-foreground">Échangez avec vos conseillers</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
              <Card className="lg:col-span-1 flex flex-col">
                <CardHeader className="pb-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Rechercher..." 
                      className="pl-10"
                      data-testid="input-search-messages"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-2 p-3">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                        selectedConversation === conv.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover-elevate border border-transparent"
                      }`}
                      data-testid={`conversation-${conv.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-white text-sm">
                              {conv.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conv.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent border-2 border-background rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium text-sm truncate">{conv.name}</span>
                            <span className="text-xs text-muted-foreground flex-shrink-0">{conv.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{conv.role}</p>
                          <p className="text-sm text-muted-foreground truncate mt-1">{conv.lastMessage}</p>
                        </div>
                        {conv.unread > 0 && (
                          <Badge className="bg-primary text-white text-xs">{conv.unread}</Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 flex flex-col">
                {currentConversation ? (
                  <>
                    <CardHeader className="border-b pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="lg:hidden"
                            onClick={() => setSelectedConversation(null)}
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </Button>
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-white">
                              {currentConversation.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{currentConversation.name}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              {currentConversation.online ? (
                                <>
                                  <span className="w-2 h-2 bg-accent rounded-full" />
                                  En ligne
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3" />
                                  Hors ligne
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                              msg.isMe
                                ? "bg-primary text-primary-foreground rounded-br-md"
                                : "bg-muted rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className={`text-xs mt-1 ${msg.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <div className="p-4 border-t">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Input
                          placeholder="Écrivez votre message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="flex-1"
                          data-testid="input-message"
                        />
                        <Button size="icon" data-testid="button-send-message">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="font-medium mb-2">Sélectionnez une conversation</h3>
                      <p className="text-sm text-muted-foreground">
                        Choisissez un contact pour commencer à discuter
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
