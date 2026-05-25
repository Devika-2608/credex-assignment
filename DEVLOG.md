Day 1 - 21-05-2026

Hours worked: 2

What I did:
Installed Node.js and verified npm installation.
Created a Next.js + Typescrpt + Tailwind project, initialized a GitHub repository
and pushed the initial project setup.
Tested the local development server using npm run dev.

What I learned:
Learned how Next.js projects are created, how to use the VS Code terminal, and how the local development server works.

Blockers/What I'm stuck on:
No major blockers today.
Still getting familiar with with the project structure and React file organization.

Plan for tomorrow:
Build the audit input form with dropdowns and numeric inputs for AI tool spend.



Day 2 - 22-05-2026

Hours worked: 2.5

What I did:
Built the ain AI spend audit input form in Next.js using React state management.
Added dynamic tool selection, plan dropdowns that change based on the selected tool, numeric inputs for spend and seats, and functionality to add multiple tools to the form.
Styled the UI using Tailwind CSS and tested form submission by logging data to the browser console.

What I learned:
Learned how React useState works, how to update arrays of objects in state, how controlled form inputs work, and how event handlers update UI dynamically.

Blockers/What I'm stuck on:
Initially confused about updating nested form data in React state, but understood it better after testing smaller changes step by step.

Plan for tomorrow:
Implement the audit calculation logic and display estimated monthly and yearly savings dynamically.



Day 3 - 23-05-2026

Hours worked: 4

What I did:
Created a reuable audit engine in a separate lib/auditEngine.ts file to handle AI spend analysis logic.
Added pricing data for multiple AI tools and implemented recommendation logic to detect overspending scenarios based on team size, plan type, and monthly spend.
Integrated the audit engine with the frontend form and built a result page showing monthly and annual savings recommendations.
Also created PRICING_DATA.md with official vendor pricing sources and added conditional logic to avoid showing insignificant recommendations under $10 savings.

What I learned:
Learned how to separate business logic from frontend UI logic, how conditional recommendation systems work, and how Typescript types help structure application data safely.
Improved understanding of React state flow between form submission and results rendering.

Blockers/what I'm stuck on:
Spent some time debugging conditional pricing calculations and making sure savings numbers updated correctly for different plans and seat counts.

Plans for tomorrow:
Implement form persistence using localStorage, add email capture functionality, and begin integrating AI-generated summaries using an API.


Day 4 - 2026-05-24

Hours worked: 5

What I did:
Integrated Supabase as the backend database
Created API routes in Next.js for saving lead data
Added Anthropic Claude API integration to generate AI summaries
Built an email capture workflow after showing audit results
Added fallback handling if the AI API fails

What I learned:
How API routes work in the Next.js App Router
How environment variables are used securely
How frontend and backend communicate using fetch()
Basic PostgreSQL table structure using Supabase
Why fallback responses are important for production reliability

Challenges:
Understanding how async API calls work
Managing loading states while waiting for AI responses
Learning how to structure request payloads between frontend and backend

How I solved them:
Tested API routes separately using console logs
Used loading states to improve UX
Added fallback summaries so the app still works if the AI request fails

Plan for tomorrow:
Add shareable audit links and deploy the application publicly


Day 5 - 25-05-2026

Hours worked: 4

What I did:
Added dynamic shareable audit report URLs using UUIDs
Built a public audit results page using dynamic routing
Added Open Graph image generation for social sharing previews
Connected saved reports to database retrieval APIs
Deployed the application to Vercel production hosting

What I learned:
How dynamic routes work in Next.js App Router
How production environment variables differ from local development
How Open Graph metadata improves link previews
How deployment pipelines work with GitHub and Vercel

Challenges:
Understanding dynamic route folder structure
Handling database schema updates safely
Configuring environment variables correctly in production

How I solved them:
Used UUIDs to create unique public report links
Tested routes locally before deployment
Verified API functionality separately before connecting frontend UI

Plan for tomorrow:
Finalize documentation and polish the project for submission