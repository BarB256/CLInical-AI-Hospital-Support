# Rules on contribution


## Golden rules

### Commits and PRs

1. All commits MUST follow [git conventions](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13). examples below
2. All PRs have to be reviewed by at least one other team member
3. All changes MUST be made through Pull Requests. Direct commits to main are not allowed.
4. If you modify existing behavior, you MUST update relevant documentation.
5. Branch naming MUST follow the agreed format (e.g., feature/SCRUM-9/xyz, fix/SCRUM-9/xyz, chore/SCRUM-9/xyz).
6. PRs MUST stay focused. One feature/fix per PR (no mega PRs).
7. Every PR MUST clearly describe:
   - What was changed
   - Why it was changed
   - Any side effects or breaking changes


### Code

1. Function Size Limits

   - A function MUST NOT exceed 50 lines.
   - Exceptions allowed only if:
     - Agreed upon in a team meeting
     - Justified in the PR description
   - A function must:
     - Do one logical thing
     - Have a descriptive name
     - Not exceed 3 levels of nesting


2. Naming Conventions

   Python
   - Functions: snake_case
   - Variables: snake_case
   - Constants: UPPER_CASE
   - Classes: PascalCase
   - Private methods: _single_leading_underscore
   - Boolean variables must start with:
     - is_
     - has_
     - can_
     - should_
   - Avoid single-letter variable names (except simple loop counters).

   Next.js
   - Components: PascalCase
   - Hooks: useSomething
   - Functions: camelCase
   - Variables: camelCase
   - Constants: UPPER_CASE
   - Component files: PascalCase.tsx
   - Utility files: camelCase.ts


3. Database (PostgreSQL)

   - Tables: snake_case, plural (e.g., users, order_items)
   - Columns: snake_case
   - Foreign keys: user_id format
   - Use:
     - Foreign key constraints
     - Proper indexes
     - NOT NULL where applicable


**not adhering to the golden rules WILL RESULT in PR getting rejected**


## Commit examples

### CORRECT

```shell
(SCRUM-9)feat: syncing logic between the transcript and the LLM
```

or 

```shell
(SCRUM-9)fix: request structure to OLLAMA
```

### NOT CORRECT

just plain wrong

```shell
idk what happend
```

or 
no reference to the task

```shell
syncing logic between the trancript 
```

or 
when reviewing we want to have jira open ONLY and ONLY when it's really bad.

```shell
(SCRUM-9)fix
```

## Tasks and guides

### Starting work on a task

ALWAYS create a new branch with a reference to the task.

### CORRECT 

```shell
feature/SCRUM-9/test-task-new-feature
```

or 

```shell
fix/SCRUM-10/test-task-fix-of-broken-shit
```

### NOT CORRECT

```shell
test-task-new-feature
```

or 

```shell
fix-of-broken-shit
```

or 

```shell
fix/SCRUM-10
```

Even when you just started working on a feature/chore/fix to the system remember to ALWAYS push your changes to github. And open the PR as a `DRAFT` not an ready for review one. 
- It is important for the team flow to see what other team members are working on. 
- It will make it easier to code in `pairs`.
- Easier to solve conflicts before the review.

**TASK IN PROGRESS = PR DRAFT**

### Once the task is ready

Simply switch the `DRAFT` to `Ready for review`, and another team member/s will review the PR


