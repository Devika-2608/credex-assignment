"use client";

import { useState } from "react";
import { Calculator, Zap, TrendingDown } from "lucide-react";
import { auditSpend, type ToolInput, type Recommendation } from "@/lib/auditEngine";

const toolOptions = [
  "Cursor",
  "GitHub Copilot",
  "Claude",
  "ChatGPT",
  "Anthropic API",
  "OpenAI API",
  "Gemini",
];

const planOptions = {
  Cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  "GitHub Copilot": ["Individual", "Business", "Enterprise"],
  Claude: ["Free", "Pro", "Max", "Team", "Enterprise", "API direct"],
  ChatGPT: ["Plus", "Team", "Enterprise", "API direct"],
  "Anthropic API": ["API direct"],
  "OpenAI API": ["API direct"],
  Gemini: ["Pro", "Ultra", "API"],
};

export default function Home() {
  const [tools, setTools] = useState<ToolInput[]>([
    { name: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 },
  ]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [totalMonthlySavings, setTotalMonthlySavings] = useState(0);
  const [totalAnnualSavings, setTotalAnnualSavings] = useState(0);

  const addTool = () => {
    setTools([...tools, { name: "Cursor", plan: "Pro", monthlySpend: 0, seats: 1 }]); 
  };

  const updateTool = (index: number, field: keyof ToolInput, value: string | number) => {
    const updated = [...tools];
    updated[index] = { ...updated[index], [field]: value };
    setTools(updated);
  };

  const removeTool = (index: number) => {
    const updated = tools.filter((_, i) => i !== index);
    setTools(updated);
  };

  const handleSubmit = () => {
    const results = auditSpend(tools);
    setRecommendations(results.recommendations);
    setTotalMonthlySavings(results.totalMonthlySavings);
    setTotalAnnualSavings(results.totalAnnualSavings);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setShowResults(false);
    setTools([{ name: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }]);
  };

  if (showResults) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={resetForm}
            className="mb-6 text-slate-300 hover:text-white transition"
          >
            ← Back to Form
          </button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full mb-4">
              <TrendingDown className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-medium">Potential Savings Found</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Save ${totalMonthlySavings.toLocaleString()}/month 
            </h1>
            <p className="text-2xl text-slate-300">
              That's ${totalAnnualSavings.toLocaleString()}/year
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{rec.toolName}</h3>
                    <p className="text-slate-400 text-sm">Current: {rec.currentPlan} plan</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">
                      ${rec.monthlySavings}/month
                    </div>
                    <div className="text-sm text-slate-400">
                      ${rec.annualSavings}/year saved
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 mb-3">
                  <p className="font-medium text-blue-400 mb-1">{rec.recommendedAction}</p>
                  <p className="text-slate-300 text-sm">{rec.reason}</p>
                </div>
                <div className="text-xs text-slate-500">
                  Current Spend: ${rec.currentSpend} /month
                </div>
              </div>
            ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={()=> alert("Tomorrow: Email capture + save to database!")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition shadow-lg"
          >
            Get Full Report → (Email)
          </button>
        </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Zap className="w-12 h-12 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold mb-3">AI Spend Auditor</h1>
          <p className="text-slate-300 text-lg">
            Find out if you're overspending on AI tools
          </p>
        </div>

        {/*Form */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Your AI Tools
          </h2>

          {tools.map((tool, idx) => (
            <div key={idx} className="mb-6 p-4 bg-slate-900 rounded-xl border border-slate-700">
              <div className="grid md:grid-cols-4 gap-3">
                {/* Tool Name */}
                <select
                  value={tool.name}
                  onChange={(e) => updateTool(idx, "name", e.target.value)}
                  className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                >
                  {toolOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>

                {/* Plan */}
                <select
                  value={tool.plan}
                  onChange={(e) => updateTool(idx, "plan", e.target.value)}
                  className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                >
                  {planOptions[tool.name as keyof typeof planOptions]?.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>

                {/* Monthly Spend */}
                <input
                  type="number"
                  placeholder="Monthly Spend ($)"
                  value={tool.monthlySpend || ""}
                  onChange={(e) => updateTool(idx, "monthlySpend", Number(e.target.value))}
                  className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                />
                <div className="flex gap-2">

                  {/* Seats */}
                  <input
                    type="number"
                    placeholder="Seats"
                    value={tool.seats || ""}
                    onChange={(e) => updateTool(idx, "seats", Number(e.target.value))}
                    className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                  />
                  {tools.length > 1 && (
                    <button
                      onClick={() => removeTool(idx)}
                      className="px-3 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-400"
                    >
                      x
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addTool}
            className="w-full mt-2 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded-xl transition"
          >
            + Add Another Tool
          </button>
      </div>

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition shadow-lg"
        >
          Calculate My Savings 
          </button>
        </div>
      </div>
    </main>
  );
}