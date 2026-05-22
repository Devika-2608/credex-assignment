"use client";

import { useState } from "react";
import { Calculator, Zap } from "lucide-react";

type Tool = {
  name: string;
  plan: string;
  monthlySpend: number;
  seats: number;
};

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
  const [tools, setTools] = useState<Tool[]>([
    { name: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 },
  ]);

  const addTool = () => {
    setTools([...tools, { name: "Cursor", plan: "Pro", monthlySpend: 0, seats: 1 }]); 
  };

  const updateTool = (index: number, field: keyof Tool, value: string | number) => {
    const updated = [...tools];
    updated[index] = { ...updated[index], [field]: value };
    setTools(updated);
  };

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

                {/* Seats */}
                <input
                  type="number"
                  placeholder="Seats"
                  value={tool.seats || ""}
                  onChange={(e) => updateTool(idx, "seats", Number(e.target.value))}
                  className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                />
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
          onClick={() => {
            console.log("Form data:", tools);
            alert("Form submitted! Check console for data. Tomorrow we'll calculate savings.");
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition shadow-lg"
        >
          Calculate My Savings 
          </button>
        </div>
      </div>
    </main>
  );
}