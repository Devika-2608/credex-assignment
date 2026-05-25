import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, companyName, role, teamSize, totalMonthlySavings, totalAnnualSavings, recomendations, aiSummary } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const auditId = uuidv4();

        const { data, error } = await supabase.from("leads").insert([
            {
                id: auditId,
                email,
                company_name: companyName,
                role,
                team_size: teamSize,
                total_monthly_savings: totalMonthlySavings,
                total_annual_savings: totalAnnualSavings,
                recomendations: recomendations,
                ai_summary: aiSummary,
            },
        ]);

        if (error) throw error;

        const shareableUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/audit/${auditId}`;

        return NextResponse.json({ message: true, shareableUrl, auditId });
    } catch (error) {
        console.error("Error saving lead:", error);
        return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }
}