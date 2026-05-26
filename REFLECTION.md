# Reflection

## 1. The hardest bug I hit this week, and how I debugged it

The bug:
After implementing the AI summary with Anthropic API, the page would freeze for 10+ seconds and sometimes crash.
The audit results rendered correctly, but the AI summary generation was slowing down the overall experience.

Hypothesis I formed:
1. The Anthropic API was too slow
2. My code was waiting for AI to finish before showing results
3. Network timeout issues

What I tried:
First, I added console logs to measure timing - saw API took 3-4 seconds.
Then I moved the API call to AFTER showing results.
Added a loading spinner so users know something is happening.
Finally, added a fallback template if API fails completely.

What Worked:
Moving the AI call to run in parallel with showing results.
Users see their savings in less than 1 second, and the AI summary appears 2-3 seconds later.
The fallback ensures the app never breaks.

What I learned:
Always show value first, then enhance.
Never make users wait for "nice to have" features.

## 2. How I used AI tools:

What I used:
Claude(Amthropic API) for the summary feature, and ChatGPT for debugging help when I got stuck.

What I used AI for:
Generating the initial form structure
Writing the audit logic rules
Debugging TypeScript errors
Creating this documentation structure