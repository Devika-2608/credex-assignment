# Tests

I wrote 8 automated tests for the audit engine. Run with: `npm run test`

## Test Files

### `lib/auditEngine.test.ts`

| Test Name | What it covers | How to run |
|-----------|----------------|-------------|
| `calculates savings for single user on team plan` | Cursor Team plan with 1 seat should recommend Pro | `npm test -- -t "single user on team plan"` |
| `does not recommend change for optimal setup` | User already on cheapest appropriate plan | `npm test -- -t "optimal setup"` |
| `calculates total savings across multiple tools` | Sum of savings from 3 tools | `npm test -- -t "multiple tools"` |
| `handles API tools correctly` | API direct plans are pay-as-you-go | `npm test -- -t "API tools"` |
| `minimum savings threshold` | No recommendation for <$10 savings | `npm test -- -t "minimum threshold"` |
| `seat optimization logic` | Business plan with 1 seat → Individual | `npm test -- -t "seat optimization"` |
| `returns null for unknown tool` | Graceful handling of bad input | `npm test -- -t "unknown tool"` |
| `annual savings calculation` | Monthly × 12 | `npm test -- -t "annual savings"` |

## How to install test runner

```bash
npm install --save-dev jest @testing-library/react @types/jest