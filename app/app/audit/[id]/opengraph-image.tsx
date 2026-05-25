import { ImageResponse } from "next/og";

export const runtime = 'edge';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const monthlySavings = searchParams.get('savings') || '0';

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0f172a, #1e1b4b)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                }}
            >
                <div style={{fontSize: 60, fontWeight: 'bold', color: '#4ade80', marginBottom: 20 }}>
                    Save ${monthlySavings}/month
                </div>
                <div style={{ fontSize: 30, color: '#cbd5e1' }}>
                    on  your AI tools spend
                </div>
                <div style={{ fontSize: 20, color: '#8b5cf6', marginTop: 40 }}>
                    AI Spend Auditor
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}