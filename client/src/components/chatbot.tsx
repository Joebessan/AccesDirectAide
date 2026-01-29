import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Bonjour ! Je suis Ada, votre assistante virtuelle. Comment puis-je vous aider aujourd'hui ?",
    isBot: true,
    time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  }
];

const quickReplies = [
  "Quelles aides sont disponibles ?",
  "Comment prendre un rendez-vous ?",
  "Où trouver mes documents ?"
];

const botResponses: Record<string, string> = {
  "aide": "Nous proposons de nombreuses aides : RSA, APL, Prime d'activité, CMU-C, et bien d'autres. Consultez notre catalogue d'aides pour découvrir celles auxquelles vous êtes éligible.",
  "rendez-vous": "Pour prendre rendez-vous, rendez-vous dans la section 'Professionnels', choisissez un conseiller et sélectionnez un créneau qui vous convient. C'est gratuit et sans engagement !",
  "document": "Vos documents sont accessibles depuis votre espace personnel, section 'Mes documents'. Vous pouvez y ajouter, consulter et partager vos justificatifs.",
  "rsa": "Le RSA (Revenu de Solidarité Active) est une aide financière pour les personnes sans ressources. Pour en bénéficier, vous devez avoir plus de 25 ans ou être parent isolé.",
  "apl": "L'APL (Aide Personnalisée au Logement) aide à payer votre loyer. Le montant dépend de vos revenus, de votre situation familiale et de votre logement.",
  "prime": "La Prime d'activité est destinée aux travailleurs modestes. Elle complète vos revenus si vous travaillez et gagnez moins d'un certain plafond.",
  "caf": "La CAF (Caisse d'Allocations Familiales) gère de nombreuses aides : allocations familiales, APL, RSA, prime d'activité... Nous pouvons vous aider dans vos démarches.",
  "bonjour": "Bonjour ! Ravi de vous rencontrer. N'hésitez pas à me poser vos questions sur les aides sociales, les démarches administratives ou les rendez-vous avec nos conseillers.",
  "merci": "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Je suis là pour vous aider !",
  "default": "Je comprends votre demande. Pour une assistance personnalisée, je vous conseille de prendre rendez-vous avec l'un de nos conseillers. Ils pourront vous guider dans vos démarches."
};

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  for (const [keyword, response] of Object.entries(botResponses)) {
    if (keyword !== "default" && lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return botResponses.default;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: content.trim(),
      isBot: false,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        content: getBotResponse(content),
        isBot: true,
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
          isOpen && "scale-0 opacity-0"
        )}
        data-testid="button-open-chatbot"
        aria-label="Ouvrir le chatbot"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-white animate-pulse" />
      </button>

      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[calc(100vh-6rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="gradient-primary p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Ada - Assistant virtuel</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 bg-accent rounded-full" />
                En ligne 24h/24
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
            data-testid="button-close-chatbot"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-2",
                msg.isBot ? "justify-start" : "justify-end"
              )}
            >
              {msg.isBot && (
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3",
                  msg.isBot
                    ? "bg-muted rounded-tl-md"
                    : "bg-primary text-primary-foreground rounded-tr-md"
                )}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className={cn(
                  "text-xs mt-1",
                  msg.isBot ? "text-muted-foreground" : "text-primary-foreground/70"
                )}>
                  {msg.time}
                </p>
              </div>
              {!msg.isBot && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-4 pb-2 bg-background">
            <p className="text-xs text-muted-foreground mb-2">Suggestions :</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(reply)}
                  className="px-3 py-1.5 text-xs rounded-full border border-primary/30 text-primary hover-elevate transition-all"
                  data-testid={`button-quick-reply-${index}`}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1"
              data-testid="input-chatbot-message"
            />
            <Button type="submit" size="icon" data-testid="button-send-chatbot">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
