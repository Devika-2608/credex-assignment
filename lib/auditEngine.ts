export type ToolInput = {
    name: string;
    plan: string;
    monthlySpend: number;
    seats: number;
};

export type Recommendation = {
    toolName: string;
    currentPlan: string;
    currentSpend: number;
    recommendedAction: string;
    recommendedPlan: string;
    monthlySavings: number;
    annualSavings: number;
    reason: string;
};

const PRICING: Record<string, Record<string, number>> = {
    Cursor: {
        Hobby: 0,
        Pro: 20,
        Business: 40,
        Enterprise: 60,
    },
    "GitHub Copilot": {
        Individual: 10,
        Business: 19,
        Enterprise: 39,
    },
    Claude: {
        Free: 0,
        Pro: 20,
        Max: 30,
        Team: 25,
        Enterprise: 50,
        "API direct": 0,
    },
    ChatGPT: {
        Plus: 20,
        Team: 25,
        Enterprise: 50,
        "API direct": 0,
    },
    "Anthropic API": {
        "API direct":0,
    },
    "OpenAI API": {
        "API direct": 0,
    },
    Gemini: {
        Pro: 0,
        Ultra: 0,
        API: 0,
    },
};

export function auditSpend(tools: ToolInput[]): {
    recommendations: Recommendation[];
    totalMonthlySavings: number;
    totalAnnualSavings: number;
} {
    const recommendations: Recommendation[] = [];

    for (const tool of tools) {
        const rec = evaluateTool(tool);
        if (rec) {
            recommendations.push(rec);
        }
    }

    const totalMonthlySavings = recommendations.reduce(
        (sum, rec) => sum + rec.monthlySavings,
        0
    );
    const totalAnnualSavings = totalMonthlySavings * 12;

    return {
        recommendations,
        totalMonthlySavings,
        totalAnnualSavings,
    };
}

function evaluateTool(tool: ToolInput): Recommendation | null {
    const { name, plan, monthlySpend, seats } = tool;
    const pricing = PRICING[name];

    if (!pricing) return null;

    const currentPricePerSeat = pricing[plan];
    if (!currentPricePerSeat && currentPricePerSeat !== 0)  return null;

    let expectedSpend = currentPricePerSeat * seats;

    if (plan === "API direct" || name.includes("API")) {
        expectedSpend = monthlySpend;
    }

    let monthlySavings = monthlySpend - expectedSpend;
    let recommendedPlan = plan;
    let recommendedAction = "Keep current plan";
    let reason = "";

    const availablePlans = Object.entries(pricing).sort((a, b) => a[1] - b[1]);

    for (const [cheaperPlan, cheaperPrice] of availablePlans) {
        const cheaperExpectedSpend = cheaperPrice * seats;
        const potentialSavings = monthlySpend - cheaperExpectedSpend;

        if (potentialSavings > 10 && cheaperExpectedSpend < expectedSpend) {
            monthlySavings = potentialSavings;
            recommendedPlan = cheaperPlan;
            recommendedAction = `Switch to ${cheaperPlan} plan`;
            reason = `${cheaperPlan} plan costs $${cheaperPrice}/seat/month ($${cheaperExpectedSpend}/month total), saving you $${potentialSavings}/month with similar features for ${seats} ${seats === 1 ? "user" : "users"}.`;
            break;
        }
    }

    if (seats === 1 && plan === "Business" && name === "Cursor") {
    monthlySavings = monthlySpend - 20;
    recommendedPlan = "Pro";
    recommendedAction = "Downgrade to Pro";
    reason = "For a single user, Cursor Pro ($20/month) gives you all the features you need. Business plan ($40/seat/month) is only valuable for collaboration features with multiple users.";
    }

    if (seats <= 2 && plan === "Business" && name === "GitHub Copilot") {
        monthlySavings = monthlySpend -  seats * 10;
        recommendedPlan = "Individual";
        recommendedAction = "Switch to Individual plan";
        reason = `With only ${seats} ${seats === 1 ? "user" : "users"}, the Individual plan at $10/user/month gives you the same AI coding features. Business plan adds organization management, which you likely don't need yet.`;
    }

    if (monthlySavings < 10) {
        return null;
    }

    return {
        toolName: name,
        currentPlan: plan,
        currentSpend: monthlySpend,
        recommendedAction,
        recommendedPlan,
        monthlySavings,
        annualSavings: monthlySavings * 12,
        reason,
    };
}