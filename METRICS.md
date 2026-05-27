# Metrics

## North Star Metric

**Number of successful audits completed per week**

Why? 
- It measures real value delivered (someone got their savings number)
- It's a leading indicator of conversion (email capture happens after)
- It's shareable (each audit can generate a public URL)

## 3 Input Metrics that drive the North Star

1. **Traffic to landing page** (sources: Hacker News, Twitter, Reddit, organic)
2. **Form completion rate** (% who fill out all tool fields)
3. **Viral coefficient** (average shares per audit)

## What I'd instrument first

**Event tracking (using PostHog or similar):**

1. `audit_started` — user landed on form
2. `audit_completed` — user clicked "Calculate"
3. `email_captured` — user submitted email
4. `audit_shared` — user copied shareable link
5. `report_viewed` — someone opened a shareable URL

**Also track:**
- Time to complete form (if >3 min, form is too complex)
- Most common tool combinations (to prioritize new tools)
- Average savings by user role (CTOs save more than individual devs)

## What number triggers a pivot decision

**Pivot if:** After 500 audits, email capture rate is <10%

**Why:** 
- 10% capture rate = 50 leads
- 50 leads × 10% consultation rate = 5 calls
- 5 calls × 30% close = 1.5 customers
- 1.5 customers × $1,400 LTV = $2,100

**If capture rate is below 10%, the funnel breaks.** We can't acquire customers profitably even at $0 CAC because we don't have enough leads to find high-value opportunities.

**Action if pivot triggered:**
- Test adding stronger incentive ("Get PDF report + personalized video")
- Test removing optional fields to reduce friction
- Interview users who didn't convert to understand why