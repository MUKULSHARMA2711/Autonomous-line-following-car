import { Calculator, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface FormValues {
  price: number;
  rent: number;
  loan: number;
  rate: number;
  years: number;
  expenses: number;
}

interface Props {
  values: FormValues;
  onChange: (v: FormValues) => void;
  onCalculate: () => void;
  onReset: () => void;
  loading: boolean;
}

const fields: Array<{ key: keyof FormValues; label: string; prefix?: string; suffix?: string }> = [
  { key: "price", label: "Property Price", prefix: "$" },
  { key: "rent", label: "Monthly Rent", prefix: "$" },
  { key: "loan", label: "Loan Amount", prefix: "$" },
  { key: "rate", label: "Interest Rate", suffix: "%" },
  { key: "years", label: "Loan Duration", suffix: "yrs" },
  { key: "expenses", label: "Monthly Expenses", prefix: "$" },
];

export function InvestmentForm({ values, onChange, onCalculate, onReset, loading }: Props) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 animate-slide-up">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Investment Inputs</h2>
        <p className="text-sm text-muted-foreground">Enter property details to analyze your investment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {fields.map((f) => (
          <div key={f.key} className="space-y-2">
            <Label htmlFor={f.key} className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {f.label}
            </Label>
            <div className="relative">
              {f.prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  {f.prefix}
                </span>
              )}
              <Input
                id={f.key}
                type="number"
                value={values[f.key]}
                onChange={(e) => onChange({ ...values, [f.key]: Number(e.target.value) })}
                className={`bg-input/60 border-border/60 h-11 ${f.prefix ? "pl-7" : ""} ${f.suffix ? "pr-12" : ""} focus-visible:ring-primary/50`}
              />
              {f.suffix && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  {f.suffix}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button
          onClick={onCalculate}
          disabled={loading}
          className="gradient-primary text-primary-foreground font-semibold h-12 px-8 rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[0_0_50px_oklch(0.65_0.22_265/0.4)] hover:scale-[1.02] transition-all duration-300 border-0"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Calculating...
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Investment
            </>
          )}
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="h-12 px-6 rounded-xl border-border/60 bg-secondary/40 hover:bg-secondary/80"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
