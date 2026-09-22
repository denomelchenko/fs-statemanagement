# fs-statemanagement

Submission repository for **Part 6 — State management** of Full Stack Open. The starter was copied from
[fullstack-hy2020/fs-statemanagement](https://github.com/fullstack-hy2020/fs-statemanagement); the application code
and the tests are the exercise deliverables.

The part is published as its own 1-credit course on MOOC —
[courses.mooc.fi/org/uh-cs/courses/full-stack-open-state-management](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-state-management)
(CSM141082). That course lists **29 exercises, numbered 0–28**, and requires that *all the tests added in the
earlier exercises pass in this GitHub repository: if tests do not pass, your submission will be rejected*. The
repository root is exactly the one the material asks for —
`.git .github .gitignore unicafe unicafe-tests anecdotes anecdotes-tests query-anecdotes query-anecdotes-tests` —
with this README as the only addition.

## Applications

| Directory | Exercises (MOOC numbering) | What it is |
|---|---|---|
| `unicafe/` | 1 | Unicafe with its counters in a Zustand store |
| `anecdotes/` | 3–17 | Anecdotes with Zustand, the Fetch API and Vitest store/hook tests |
| `query-anecdotes/` | 19–26 | Anecdotes with TanStack Query and the Context API |

## Progress

22 of the 29 exercises ask for application code and are implemented. The other seven ask for no application code:
one is the warm-up quiz, one is "tell us your repository", and five are **checkups** whose requirement is that the
shipped Playwright suites pass locally *and* on GitHub. All five workflows are green, so every checkup is already
satisfied — what is left is the work that can only be done in the MOOC web interface.

| MOOC # | Exercise | Type | Where | Note | Done |
|---|---|---|---|---|---|
| 0 | Warm up | warm-up quiz | MOOC UI | must be done in the MOOC interface | [ ] |
| 1 | Unicafe revisited | code | `unicafe/` | implemented | [ ] |
| 2 | Running tests | checkup | `unicafe-tests/` + `unicafe-tests.yml` | tests pass locally; workflow green | [ ] |
| 3 | Anecdotes, step1 | code | `anecdotes/` | implemented | [ ] |
| 4 | Anecdotes, step2 | code | `anecdotes/` | implemented | [ ] |
| 5 | Anecdotes, step3 | code | `anecdotes/` | implemented | [ ] |
| 6 | Anecdotes, step4 | code | `anecdotes/` | implemented | [ ] |
| 7 | Anecdotes, step5 | code | `anecdotes/` | implemented | [ ] |
| 8 | Anecdotes, step6 | code | `anecdotes/` | implemented | [ ] |
| 9 | Anecdotes, step7 | code | `anecdotes/` | implemented | [ ] |
| 10 | Anecdotes, step8 | code | `anecdotes/` | implemented | [ ] |
| 11 | Anecdotes, step9 | code | `anecdotes/` | implemented | [ ] |
| 12 | Anecdotes, step10 | code | `anecdotes/` | implemented | [ ] |
| 13 | Anecdotes checkup | checkup | `anecdotes-tests/` + `anecdotes-tests.yml` | tests pass locally; workflow green | [ ] |
| 14 | Anecdotes, step11 | code | `anecdotes/src/store.test.js` | implemented | [ ] |
| 15 | Anecdotes, step12 | code | `anecdotes/src/store.test.js` | implemented | [ ] |
| 16 | Anecdotes, step13 | code | `anecdotes/src/store.test.js` | implemented | [ ] |
| 17 | Anecdotes, step14 | code | `anecdotes/src/store.test.js` | implemented | [ ] |
| 18 | Anecdotes, final check | checkup | `anecdotes-tests/` verifiers + `anecdotes-test-tests.yml` | checks pass locally; workflow green | [ ] |
| 19 | Query Anecdotes, step1 | code | `query-anecdotes/` | implemented | [ ] |
| 20 | Query Anecdotes, step2 | code | `query-anecdotes/` | implemented | [ ] |
| 21 | Query Anecdotes, step3 | code | `query-anecdotes/` | implemented | [ ] |
| 22 | Query Anecdotes, step4 | code | `query-anecdotes/src/hooks/` | implemented | [ ] |
| 23 | Query Anecdotes, checkup | checkup | `query-anecdotes-tests/ run test:anecdotes` + `query-anecdotes-tests1.yml` | tests pass locally; workflow green | [ ] |
| 24 | Query anecdotes, step5 | code | `query-anecdotes/` | implemented | [ ] |
| 25 | Query anecdotes, step6 | code | `query-anecdotes/` | implemented | [ ] |
| 26 | Query anecdotes, step7 | code | `query-anecdotes/src/contexts/NotificationContext.jsx` | implemented | [ ] |
| 27 | Query anecdotes, final check | checkup | `query-anecdotes-tests/ run test:notifications` + `query-anecdotes-tests2.yml` | tests pass locally; workflow green | [ ] |
| 28 | Your GitHub repository | repository URL | MOOC UI | must be done in the MOOC interface | [ ] |

The classic `6.1`–`6.22` numbering this repository's commits use maps onto the rows above by removing the seven
non-code items: `6.N` is the N-th `code` row in order.

## Tests

The material's commands, run from the directory named each time:

```bash
cd unicafe-tests && npm install && npx playwright install chromium && npm test
cd anecdotes-tests && npm install && npx playwright install chromium && npm test
cd anecdotes-tests && npm run verify:tests-are-real
cd query-anecdotes-tests && npm install && npx playwright install chromium && npm run test:anecdotes
cd query-anecdotes-tests && npm run test:notifications
cd anecdotes && npm test
```

The same suites run through pnpm from the repository root:

```bash
corepack pnpm --dir unicafe-tests test
corepack pnpm --dir anecdotes test
corepack pnpm --dir anecdotes-tests test
corepack pnpm --dir anecdotes-tests run verify:tests-are-real
corepack pnpm --dir query-anecdotes-tests run test:anecdotes
corepack pnpm --dir query-anecdotes-tests run test:notifications
```

The three Playwright suites start the applications themselves through their `webServer` configuration, so the
`unicafe`, `anecdotes` and `query-anecdotes` dependencies must be installed as well. The `anecdotes` JSON Server
runs on port 3001, the `query-anecdotes` Fetch server also on port 3001, and the tests run one worker at a time
because they share it.

## Continuous integration

`.github/workflows/` holds the five workflows the material asks to enable, each triggered on `push` to `main`:
`unicafe-tests.yml`, `anecdotes-tests.yml`, `anecdotes-test-tests.yml`, `query-anecdotes-tests1.yml` and
`query-anecdotes-tests2.yml`. The starter names them `.yml` and gives two of them different names from the ones the
exercise text prints; the file names above are the starter's.
