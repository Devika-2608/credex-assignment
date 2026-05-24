import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { totalMonthlySavings, topRecommendations } = body;

        const prompt = `You are a financial advisor. A user just saved $${totalMonthlySavings}/month on AI tools.
        Their top recommendations are: ${topRecommendations}

        Write a ~100-word personalized summary that:
        1. Acknowledges their savings
        2. Highlights the biggest opportunity
        3. Gives one actionable next step
        4. Ends with an encouraging note

        Keep it professional but friendly.`;

        const message = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 300,
            messages: [{ role: "user", content: prompt }],
        });

        const summary = message.content[0].type === "text"
            ? message.content[0].text
            : "Great job optimizing your AI spend!";

        return NextResponse.json({ summary });
    } catch (error) {
        console.error("AI summary error:", error);

        return NextResponse.json({
            summary: `Great job optimizing your AI tool spending! 
            Keep monitoring your usage and adjust plans as your needs grow. Small optimizations can lead to huge annual savings!`
        });
    }
}