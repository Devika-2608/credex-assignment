# Architecture

## System Diagram (Mermaid)

```mermaid
graph TD
    User[User Browser] --> Next[Next.js App on Vercel]
    Next --> Form[Input Form Page]
    Form --> Audit[Audit Engine]
    Audit --> Results[Resuls Page]
    Results --> AI[Anthropic API]
    Results --> Email[Email Capture]
    Email --> Supabase[(Supabase DB)]
    Results --> Share[Shareable URL]
    Share --> Public[Public Audit View]
    Public --> Supabase