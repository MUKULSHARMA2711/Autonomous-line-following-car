import { ReactNode } from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  accent?: "primary" | "success" | "warning" | "danger";
  tooltip?: string;
  delay?: number;
}

const accentMap = {
  primary: "from-primary/30 to-accent/20 text-primary",
  success: "from-success/30 to-success/10 text-success",
  warning: "from-warning/30 to-warning/10 text-warning",
  danger: "from-destructive/30 to-destructive/10 text-destructive",
};

export function MetricCard({
  label,
  value,
  icon: Icon,
  trend,
  trendValue,
  accent = "primary",
  tooltip,
  delay = 0,
}: MetricCardProps) {
  return (
    <div
      className="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentMap[accent]} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" />
        </div>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-3xl font-bold tracking-tight mb-2">{value}</p>
      {trend && trendValue && (
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass-card rounded-2xl ${className}`}>{children}</div>;
}
