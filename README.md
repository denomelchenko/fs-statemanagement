# fs-statemanagement

Submission repository for **Part 6 — State management** of
[Full Stack Open](https://fullstackopen.com/en/part6). The starter was copied from
[fullstack-hy2020/fs-statemanagement](https://github.com/fullstack-hy2020/fs-statemanagement); the application code
and the tests are the exercise deliverables.

## Applications

| Directory | Exercises | What it is |
|---|---|---|
| `unicafe/` | 6.1 | Unicafe with its counters in a Zustand store |
| `anecdotes/` | 6.2–6.15 | Anecdotes with Zustand, the Fetch API and Vitest store/hook tests |
| `query-anecdotes/` | 6.16–6.22 | Anecdotes with TanStack Query and the Context API |

## Progress

| Exercise | Title | Status |
|---|---|---|
| 6.1 | Unicafe revisited | implemented |
| 6.2 | anecdotes, step1 | implemented |
| 6.3 | anecdotes, step2 | implemented |
| 6.4 | anecdotes, step3 | implemented |
| 6.5 | anecdotes, step4 | implemented |
| 6.6 | anecdotes, step5 | implemented |
| 6.7 | anecdotes, step6 | implemented |
| 6.8 | anecdotes, step7 | implemented |
| 6.9 | anecdotes, step8 | implemented |
| 6.10 | anecdotes, step9 | implemented |
| 6.11 | anecdotes, step10 | implemented |
| 6.12 | Anecdotes, step11 | implemented |
| 6.13 | Anecdotes, step12 | implemented |
| 6.14 | Anecdotes, step13 | implemented |
| 6.15 | Anecdotes, step14 | implemented |
| 6.16 | anecdotes with TanStack Query | implemented |
| 6.17 | creating anecdotes | implemented |
| 6.18 | voting with TanStack Query | implemented |
| 6.19 | the useAnecdotes hook | implemented |
| 6.20 | notifications with the Context API | implemented |
| 6.21 | error handling for a short anecdote | implemented |
| 6.22 | NotificationContext and useNotify | implemented |

## Tests

```bash
corepack pnpm --dir unicafe-tests test
corepack pnpm --dir anecdotes test
corepack pnpm --dir anecdotes-tests test
corepack pnpm --dir anecdotes-tests run verify:tests-are-real
corepack pnpm --dir query-anecdotes-tests run test:anecdotes
corepack pnpm --dir query-anecdotes-tests run test:notifications
```

The three Playwright suites start the applications themselves through their `webServer` configuration. The
`anecdotes` JSON Server runs on port 3001, the `query-anecdotes` Fetch server also on port 3001, and the tests
run one worker at a time because they share it.
