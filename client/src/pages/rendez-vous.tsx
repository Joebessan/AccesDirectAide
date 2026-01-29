import { useState } from "react";
import { Link, useSearch } from "wouter";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  User,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";

const professionals: { [key: string]: any } = {
  "1": {
    id: "1",
    name: "Marie Dupont",
    role: "Conseillère CAF",
    organization: "CAF du Bas-Rhin",
    domains: ["Aides sociales", "Logement", "Famille"],
    modalities: ["Présentiel", "Visio"],
  },
  "2": {
    id: "2",
    name: "Jean Martin",
    role: "Assistant social",
    organization: "CCAS Strasbourg",
    domains: ["Insertion", "Logement", "Santé"],
    modalities: ["Présentiel"],
  },
  "3": {
    id: "3",
    name: "Association Entraide Alsace",
    role: "Structure d'accompagnement",
    domains: ["Aides alimentaires", "Vêtements", "Insertion"],
    modalities: ["Présentiel", "Visio"],
    isStructure: true,
  },
  "4": {
    id: "4",
    name: "Sophie Bernard",
    role: "Conseillère Pôle Emploi",
    organization: "Pôle Emploi Colmar",
    domains: ["Emploi", "Formation", "Création d'entreprise"],
    modalities: ["Présentiel", "Visio"],
  },
  "5": {
    id: "5",
    name: "Centre Social du Neuhof",
    role: "Centre social",
    domains: ["Aide administrative", "Soutien scolaire", "Loisirs"],
    modalities: ["Présentiel"],
    isStructure: true,
  },
  "6": {
    id: "6",
    name: "Pierre Muller",
    role: "Médiateur social",
    organization: "Mairie de Mulhouse",
    domains: ["Médiation", "Accès aux droits", "Logement"],
    modalities: ["Présentiel", "Visio"],
  },
};

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

export default function RendezVousPage() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const professionalId = params.get("professionnel") || "1";
  const professional = professionals[professionalId] || professionals["1"];
  
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedModality, setSelectedModality] = useState<string>(professional.modalities[0]);
  const [notes, setNotes] = useState("");

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < new Date(today.setHours(0, 0, 0, 0));
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isDisabled = isPast || isWeekend;

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && setSelectedDate(date)}
          disabled={isDisabled}
          className={`p-2 rounded-lg text-sm transition-all duration-200 ${
            isSelected
              ? "bg-primary text-white font-semibold"
              : isToday
              ? "border-2 border-primary font-medium"
              : isDisabled
              ? "text-muted-foreground/40 cursor-not-allowed"
              : "hover:bg-muted"
          }`}
          data-testid={`calendar-day-${day}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const handleConfirm = () => {
    if (!isAuthenticated) {
      window.location.href = "/connexion";
      return;
    }
    setStep(3);
  };

  if (!isAuthenticated && step === 1) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 pb-12">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-lg mx-auto text-center">
              <div className="glass-premium rounded-3xl p-8 md:p-10 shadow-glass animate-scale-in">
                <Calendar className="w-16 h-16 mx-auto text-primary mb-6" />
                <h1 className="text-2xl font-bold mb-4">Connectez-vous pour prendre rendez-vous</h1>
                <p className="text-muted-foreground mb-8">
                  Créez un compte ou connectez-vous pour réserver votre créneau avec {professional.name}.
                </p>
                <div className="flex flex-col gap-3">
                  <Link href="/connexion">
                    <Button className="w-full gap-2" data-testid="button-login-rdv">
                      Se connecter
                    </Button>
                  </Link>
                  <Link href="/inscription">
                    <Button variant="outline" className="w-full gap-2" data-testid="button-signup-rdv">
                      Créer un compte
                    </Button>
                  </Link>
                </div>
              </div>
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
            <Link href="/professionnels">
              <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back-professionals">
                <ArrowLeft className="w-4 h-4" />
                Retour aux professionnels
              </Button>
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step >= s 
                        ? "gradient-primary text-white" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="grid md:grid-cols-3 gap-6 animate-scale-in">
                  <Card className="md:col-span-1">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-white">
                            {professional.isStructure ? "S" : professional.name.split(" ").map((n: string) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{professional.name}</CardTitle>
                          <CardDescription>{professional.role}</CardDescription>
                        </div>
                      </div>
                      {professional.organization && (
                        <p className="text-sm text-muted-foreground">{professional.organization}</p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {professional.domains.map((domain: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Modalité</Label>
                        <RadioGroup value={selectedModality} onValueChange={setSelectedModality}>
                          {professional.modalities.map((mod: string) => (
                            <div key={mod} className="flex items-center space-x-2">
                              <RadioGroupItem value={mod} id={mod} />
                              <Label htmlFor={mod} className="flex items-center gap-2 cursor-pointer">
                                {mod === "Visio" ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                                {mod}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Choisir une date
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (currentMonth === 0) {
                              setCurrentMonth(11);
                              setCurrentYear(currentYear - 1);
                            } else {
                              setCurrentMonth(currentMonth - 1);
                            }
                          }}
                          data-testid="calendar-prev-month"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="font-medium">
                          {monthNames[currentMonth]} {currentYear}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (currentMonth === 11) {
                              setCurrentMonth(0);
                              setCurrentYear(currentYear + 1);
                            } else {
                              setCurrentMonth(currentMonth + 1);
                            }
                          }}
                          data-testid="calendar-next-month"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm text-muted-foreground">
                        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(day => (
                          <div key={day}>{day}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {renderCalendar()}
                      </div>

                      {selectedDate && (
                        <div className="mt-6 animate-fade-in">
                          <Label className="text-sm font-medium mb-3 block">
                            <Clock className="w-4 h-4 inline mr-2" />
                            Créneaux disponibles le {selectedDate.toLocaleDateString("fr-FR")}
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                  selectedTime === time
                                    ? "bg-primary text-white"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                                data-testid={`time-slot-${time}`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button
                        className="w-full mt-6 gap-2"
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setStep(2)}
                        data-testid="button-continue-step2"
                      >
                        Continuer
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {step === 2 && (
                <div className="max-w-2xl mx-auto animate-scale-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Résumé du rendez-vous</CardTitle>
                      <CardDescription>Vérifiez les informations avant de confirmer</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                          <User className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Professionnel</p>
                            <p className="font-medium">{professional.name}</p>
                            <p className="text-sm">{professional.role}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                          <Calendar className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Date et heure</p>
                            <p className="font-medium">{selectedDate?.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
                            <p className="text-sm">{selectedTime}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                          {selectedModality === "Visio" ? (
                            <Video className="w-5 h-5 text-accent mt-0.5" />
                          ) : (
                            <MapPin className="w-5 h-5 text-primary mt-0.5" />
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">Modalité</p>
                            <p className="font-medium">{selectedModality}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                          <Clock className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Durée</p>
                            <p className="font-medium">30 minutes</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes" className="mb-2 block">
                          Notes ou informations complémentaires (optionnel)
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Décrivez brièvement l'objet de votre rendez-vous..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="resize-none"
                          rows={4}
                          data-testid="textarea-notes"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setStep(1)} className="flex-1" data-testid="button-back-step1">
                          Modifier
                        </Button>
                        <Button onClick={handleConfirm} className="flex-1 gap-2" data-testid="button-confirm-rdv">
                          <CheckCircle className="w-4 h-4" />
                          Confirmer le rendez-vous
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {step === 3 && (
                <div className="max-w-lg mx-auto text-center animate-scale-in">
                  <div className="glass-premium rounded-3xl p-8 md:p-10 shadow-glass">
                    <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Rendez-vous confirmé !</h2>
                    <p className="text-muted-foreground mb-6">
                      Votre rendez-vous avec {professional.name} est confirmé pour le{" "}
                      {selectedDate?.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} à {selectedTime}.
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                      Un email de confirmation vous a été envoyé avec tous les détails.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Link href="/dashboard">
                        <Button className="w-full" data-testid="button-go-dashboard">
                          Voir mes rendez-vous
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button variant="outline" className="w-full" data-testid="button-go-home">
                          Retour à l'accueil
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
