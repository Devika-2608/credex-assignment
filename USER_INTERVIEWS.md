# User Interviews

## Interview 1: Sarah (CTO at early-stage startup)

**Name:** Sarah
**Role:** CTO
**Company stage:** Pre-seed, 8 employees

**What she said:**
> *"We use Cursor, Copilot, and ChatGPT. I honestly don't know what we spend — probably $400-500/month. The CTO before me set it up."*

> *"I've thought about switching but it's so annoying to compare plans manually. I'd rather just pay and not think about it."*

> *"If someone showed me I was overpaying by $100/month, I'd switch immediately. That's a free AWS credit right there."*

**The most surprising thing:** She didn't know her own spend. The pain isn't the money — it's the time to figure it out.

**What changed about my design:** I added team size as a required field (not optional). It's the key input for seat optimization logic.

---

## Interview 2: Mike (Engineering Manager at mid-size startup)

**Name:** Mike
**Role:** Engineering Manager
**Company stage:** Series B, 150 employees

**What he said:**
> *"We standardized on GitHub Copilot Enterprise because legal wanted the IP indemnification. I doubt we need enterprise features though."*

> *"I would never share our actual spend numbers publicly. But I'd share an anonymized version to show how much we saved."*

> *"The AI summary thing is cool but I wouldn't trust it. Show me the math."*

**The most surprising thing:** He cares more about legal/security than price. The audit needs to consider features, not just cost.

**What changed about my design:** I made the reason text explicit ("Individual plan gives you the same features, just without org-wide policies"). Also added note that public shareable URLs strip identifying info.

---

## Interview 3: Alex (Solo founder building AI app)

**Name:** Alex
**Role:** Founder
**Company stage:** Bootstrapped, 1 person

**What he said:**
> *"I'm on every free tier possible. I'll switch between Claude and ChatGPT based on who has free credits."*

> *"I literally cannot afford to pay for AI tools until I launch. But I want to know what I'll pay later."*

> *"The shareable link is genius — I'd post my audit on X to show 'look how lean I run.'"*

**The most surprising thing:** Free tier users are still valuable — they become paying customers later. Don't ignore them.

**What changed about my design:** Added note in the UI for low-spend users: "You're spending well — we'll notify you when new optimizations apply to your stack."