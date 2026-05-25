"use client";

import { useState } from "react";
import { Calculator, Zap, TrendingDown, Mail, CheckCircle } from "lucide-react";
import { auditSpend, type ToolInput, type Recommendation } from "@/lib/auditEngine";

const [shareableUrl, setShareableUrl] = useState("");

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
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [totalMonthlySavings, setTotalMonthlySavings] = useState(0);
  const [totalAnnualSavings, setTotalAnnualSavings] = useState(0);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");

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

  const handleSubmit =  async () => {
    const results = auditSpend(tools);
    setRecommendations(results.recommendations);
    setTotalMonthlySavings(results.totalMonthlySavings);
    setTotalAnnualSavings(results.totalAnnualSavings);
    setShowResults(true);
    setShowEmailCapture(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setLoading(true);
    const topRec= results.recommendations[0]?.recommendedAction || "optimize your plans";
    const response = await fetch("/api/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalMonthlySavings: results.totalMonthlySavings,
        topRecommendations: topRec,
      }),
    });
    const data = await response.json();
    setAiSummary(data.summary);
    setLoading(false);
  };

  const saveLead = async () => {
    if (!email) {
      alert("Email is required");
      return;
    }

    setLoading(true);
    const response = await fetch("/api/save-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        companyName,
        role,
        teamSize: tools.reduce((sum, t) => sum + t.seats, 0),
        totalMonthlySavings,
        totalAnnualSavings,
        recommendations,
        aiSummary,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSaved(true);
      setShowEmailCapture(false);
      setShareableUrl(data.shareableUrl);
    } else {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setShowResults(false);
    setShowEmailCapture(false);
    setSaved(false);
    setAiSummary("");
    setTools([{ name: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }]);
  };
  if (saved) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Report Saved! 🎉</h1>
          <p className="text-slate-300 mb-6">
            We've sent your full audit report to <strong>{email}</strong>
          </p>

          {/* Shareable Link Section */}
          {shareableUrl && (
            <div className="bg-slate-800 rounded-xl p-4 mb-6">
              <p className="text-sm text-slate-400 mb-2">Share your results:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareableUrl}
                  readOnly
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareableUrl);
                    alert("Link copied!");
                  }}
                  className="bg-blue-500 hover:bg-blue-600 px-4 rounded-lg transition"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
          
          <p className="text-slate-300 mb-8">
            For savings over ${totalMonthlySavings}/month, our team will reach out with 
            exclusive discounted credits through Credex.
          </p>
          <button
            onClick={resetForm}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition"
          >
            Audit Another Stack →
          </button>
        </div>
      </main>
    );
  }

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


          {/* AI Summary */}
          {loading && (
            <div className="bg-slate-800/50 rounded-xl p-6 mb-8 text-center">
              <div className="animate-pulse">Generating your AI summary...</div>
            </div>
          )}
          {aiSummary && !loading && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-purple-400 mb-2">AI-Powered Summary</h3>
              <p className="text-slate-300">{aiSummary}</p>
            </div>
          )}

          {/* Recommendations */}
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
              </div>
            ))}
          </div>

          {/* Email Capture */}
          {showEmailCapture && (
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold">Get Your Full Report</h3>
              </div>
              <p className="text-slate-300 mb-6">
                Enter your email to receive the complete audit with all recommendations and savings breakdown.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Company Name (optional)"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                >
                  <option value="">Select your role (optional)</option>
                  <option>Founder/CEO</option>
                  <option>Engineering Manager</option>
                  <option>Developer</option>
                  <option>CTO</option>
                  <option>Finance</option>
                </select>

                <button
                  onClick={saveLead}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Send My Report →"}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  We'll email your audit report. No spam, unsubscribe anytime.
                </p>
              </div>
            </div>
          )}
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
            Calculate My Savings →
          </button>
        </div>
      </div>
    </main>
  );
}