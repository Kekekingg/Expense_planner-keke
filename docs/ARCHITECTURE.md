[ARCHITECTURE.md](https://github.com/user-attachments/files/31158198/ARCHITECTURE.md)
# Architecture

## Overview

Expense Planner uses a single centralized state store, implemented with React's `useReducer` and exposed application-wide through the Context API. There is no external state library (Redux, Zustand, etc.) — the reducer pattern alone is sufficient for this app's scope.

```
main.tsx
 └─ BudgetProvider (context/BudgetContext.tsx)
     └─ App.tsx
         ├─ BudgetForm            (shown when no budget is set)
         ├─ BudgetTracker         (shown once a budget is set)
         ├─ FilterByCategory
         ├─ ExpenseList
         │   └─ ExpenseDetail (×N)
         └─ ExpenseModal
             └─ ExpenseForm
```

## State Model

All application state lives in a single object, defined in `src/reducers/budget-reducer.ts`:

```ts
type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
}
```

| Field | Purpose |
|---|---|
| `budget` | The total budget the user defined. |
| `modal` | Whether the add/edit expense modal is open. |
| `expenses` | The full list of recorded expenses. |
| `editingId` | The id of the expense currently being edited (empty string when adding a new one). |
| `currentCategory` | The category id currently applied as a filter (empty string means "all categories"). |

### Derived values

Two values are **not** stored in state directly — they are computed on every render inside `BudgetProvider`, so they can never drift out of sync with `expenses` or `budget`:

```ts
const totalExpenses = state.expenses.reduce((total, expense) => expense.amount + total, 0)
const availableBudget = state.budget - totalExpenses
```

This means actions like adding, editing, or deleting an expense never need to separately "adjust" the available budget — it is recalculated automatically as a side effect of updating `expenses`.

## Data Flow

1. A component calls `dispatch({ type, payload })` via the `useBudget()` hook.
2. `budgetReducer` receives the current state and the action, and returns a new state object (pure function, no side effects).
3. `BudgetProvider` re-renders with the new state and recomputes `totalExpenses` / `availableBudget`.
4. `App.tsx` has a `useEffect` that watches `state` and writes `budget` and `expenses` to `localStorage` on every change.
5. On initial load, `initialState` reads directly from `localStorage` (via `initialBudget()` and `localStorageExpenses()`) so state survives a page refresh.

```
Component → dispatch(action) → budgetReducer → new state → BudgetProvider
                                                                  │
                                                                  ▼
                                                   App.tsx useEffect → localStorage
```

## Context & Hooks

- **`BudgetContext`** (`context/BudgetContext.tsx`) — created with `createContext`, holds `{ state, dispatch, totalExpenses, availableBudget }`.
- **`useBudget()`** (`hooks/useBudget.ts`) — a thin wrapper around `useContext(BudgetContext)` that throws if used outside a `BudgetProvider`. Every component that needs state or dispatch uses this hook rather than importing the context directly.

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `BudgetForm` | Collects the initial budget amount; shown only while `budget` is `0`. |
| `BudgetTracker` | Displays budget, spent, and available amounts, plus a circular progress indicator; hosts the Reset App action. |
| `FilterByCategory` | Dispatches `add-filter-category` when the user selects a category. |
| `ExpenseList` | Filters `state.expenses` by `state.currentCategory` and renders one `ExpenseDetail` per result. |
| `ExpenseDetail` | Renders a single expense with swipe-to-edit and swipe-to-delete actions. |
| `ExpenseModal` | Wraps `ExpenseForm` in a `@headlessui/react` `Dialog`, controlled by `state.modal`. |
| `ExpenseForm` | Local form state for the expense being created/edited; validates required fields and budget limits before dispatching `add-expense` or `update-expense`. |

## Persistence Strategy

Persistence is intentionally kept **outside** the reducer:

- The reducer only computes state transitions (pure, synchronous, easy to test).
- `App.tsx`'s `useEffect` is the single place responsible for the `localStorage` side effect.
- Initial state reads from `localStorage` only once, at module load time (`initialBudget()`, `localStorageExpenses()`).

This separation keeps `budgetReducer` free of side effects, which makes it straightforward to unit test in isolation.

## Known Limitations

- `expense.category` is compared using `expense.category[0]` in `ExpenseDetail`'s category lookup, rather than the full category id string. This currently works only because every category id in `data/categories.ts` happens to be a single character — it is not a robust comparison if category ids ever change format.
- `reset-app` clears `budget` and `expenses` but does not reset `currentCategory` or `editingId`, so a previously applied category filter remains active after a reset.
