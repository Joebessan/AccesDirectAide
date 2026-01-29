import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { ArrowUp, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [location] = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isHomePage = location === "/";

  return (
    <div 
      className={cn(
        "fixed bottom-6 left-6 z-40 flex flex-col gap-2 transition-all duration-300",
        showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      {!isHomePage && (
        <Link href="/">
          <Button 
            size="icon" 
            variant="outline"
            data-testid="button-go-home"
          >
            <Home className="w-4 h-4" />
          </Button>
        </Link>
      )}
      <Button 
        size="icon"
        variant="outline"
        onClick={scrollToTop}
        data-testid="button-scroll-top"
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
    </div>
  );
}
