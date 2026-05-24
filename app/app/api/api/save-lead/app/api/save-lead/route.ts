import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, companyName, role, teamSize, totalMonthlySavings, totalAnnualSavings, recomendations } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const { data, error } = await supabase.from("leads").insert([
            {
                email,
                company_name: companyName,
                role,
                team_size: teamSize,
                total_monthly_savings: totalMonthlySavings,
                total_annual_savings: totalAnnualSavings,
                recomendations: recomendations,
            },
        ]);

        if (error) throw error;

        return NextResponse.json({ message: true });
    } catch (error) {
        console.error("Error saving lead:", error);
        return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }
}