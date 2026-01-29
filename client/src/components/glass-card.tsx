import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "strong" | "subtle";
}

export function GlassCard({ children, className, variant = "default" }: GlassCardProps) {
  const variants = {
    default: "glass-card",
    strong: "glass-strong",
    subtle: "glass-subtle",
  };

  return (
    <div className={cn("rounded-2xl p-6", variants[variant], className)}>
      {children}
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group",
        className
      )}
    >
      <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="glass-card rounded-xl p-5 text-center">
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
          {icon}
        </div>
      )}
      <div className="text-3xl font-bold text-gradient mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
