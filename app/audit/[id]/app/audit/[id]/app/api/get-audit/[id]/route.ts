import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('id', params.id)
            .single();
        if (error || !data) {
            return NextResponse.json({ error: "Audit not found" }, { status: 404 });
        }

        return NextResponse.json({
            id: data.id,
            totalMonthlySavings: data.total_monthly_savings,
            totalAnnualSavings: data.total_annual_savings,
            recommendations: data.recommendations,
            aiSummary: data.ai_summary,
            createdAt: data.created_at,
        });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}