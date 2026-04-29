import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface ChartsProps {
  monthlyRent: number;
  monthlyExpenses: number;
  emi: number;
  propertyPrice: number;
}

export function IncomeExpenseChart({ monthlyRent, monthlyExpenses, emi }: ChartsProps) {
  const data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => ({
    month: m,
    Income: Math.round(monthlyRent * (1 + i * 0.01)),
    Expenses: Math.round((monthlyExpenses + emi) * (1 + i * 0.005)),
  }));

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Income vs Expenses</h3>
        <p className="text-sm text-muted-foreground">6-month overview</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.18 155)" stopOpacity={1} />
              <stop offset="100%" stopColor="oklch(0.72 0.18 155)" stopOpacity={0.4} />
            </linearGradient>
            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.7 0.2 290)" stopOpacity={1} />
              <stop offset="100%" stopColor="oklch(0.7 0.2 290)" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" vertical={false} />
          <XAxis dataKey="month" stroke="oklch(0.7 0.03 260)" fontSize={12} />
          <YAxis stroke="oklch(0.7 0.03 260)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.21 0.03 265)",
              border: "1px solid oklch(1 0 0 / 0.1)",
              borderRadius: "12px",
              color: "oklch(0.97 0.01 250)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="Income" fill="url(#incomeGrad)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Expenses" fill="url(#expGrad)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PricePredictionChart({ propertyPrice }: { propertyPrice: number }) {
  const currentYear = new Date().getFullYear();
  const data = Array.from({ length: 6 }, (_, i) => ({
    year: String(currentYear + i),
    Price: Math.round(propertyPrice * Math.pow(1.065, i)),
  }));

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "backwards" }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Property Price Forecast</h3>
        <p className="text-sm text-muted-foreground">Projected appreciation over 5 years</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.65 0.22 265)" />
              <stop offset="100%" stopColor="oklch(0.7 0.2 290)" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" vertical={false} />
          <XAxis dataKey="year" stroke="oklch(0.7 0.03 260)" fontSize={12} />
          <YAxis stroke="oklch(0.7 0.03 260)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.21 0.03 265)",
              border: "1px solid oklch(1 0 0 / 0.1)",
              borderRadius: "12px",
            }}
          />
          <Line
            type="monotone"
            dataKey="Price"
            stroke="url(#lineGrad)"
            strokeWidth={3}
            dot={{ fill: "oklch(0.7 0.2 290)", r: 5, strokeWidth: 2, stroke: "oklch(0.16 0.025 265)" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
