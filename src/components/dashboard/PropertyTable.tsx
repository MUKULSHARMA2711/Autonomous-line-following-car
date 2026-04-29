import { Star } from "lucide-react";

interface Property {
  name: string;
  roi: number;
  profit: number;
  risk: "Low" | "Medium" | "High";
}

const sample: Property[] = [
  { name: "Sunset Villa, Miami", roi: 12.4, profit: 2150, risk: "Low" },
  { name: "Downtown Loft, Austin", roi: 9.8, profit: 1620, risk: "Medium" },
  { name: "Beach House, San Diego", roi: 14.2, profit: 2890, risk: "Medium" },
  { name: "Mountain Cabin, Aspen", roi: 7.1, profit: 980, risk: "High" },
];

const riskColor: Record<Property["risk"], string> = {
  Low: "bg-success/20 text-success border-success/30",
  Medium: "bg-warning/20 text-warning border-warning/30",
  High: "bg-destructive/20 text-destructive border-destructive/30",
};

export function PropertyTable() {
  const best = sample.reduce((a, b) => (a.roi > b.roi ? a : b));

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Property Comparison</h2>
        <p className="text-sm text-muted-foreground">Compare investments across your portfolio</p>
      </div>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
              <th className="px-4 py-3 font-medium">Property</th>
              <th className="px-4 py-3 font-medium">ROI</th>
              <th className="px-4 py-3 font-medium">Monthly Profit</th>
              <th className="px-4 py-3 font-medium">Risk</th>
            </tr>
          </thead>
          <tbody>
            {sample.map((p) => {
              const isBest = p.name === best.name;
              return (
                <tr
                  key={p.name}
                  className={`border-b border-border/30 last:border-0 transition-colors hover:bg-white/5 ${
                    isBest ? "bg-primary/10" : ""
                  }`}
                >
                  <td className="px-4 py-4 font-medium">
                    <div className="flex items-center gap-2">
                      {isBest && <Star className="w-4 h-4 text-warning fill-warning" />}
                      {p.name}
                      {isBest && (
                        <span className="text-[10px] uppercase tracking-wide font-semibold text-primary bg-primary/15 px-2 py-0.5 rounded-full">
                          Best
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold">{p.roi.toFixed(1)}%</td>
                  <td className="px-4 py-4 text-success font-medium">${p.profit.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${riskColor[p.risk]}`}>
                      {p.risk}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
