[TROUBLESHOOTING.md](https://github.com/user-attachments/files/31158225/TROUBLESHOOTING.md)
# Troubleshooting Guide

## `useBudget must be within a BudgetProvider`

**Symptom:** the app throws this error on load or when rendering a component.

**Cause:** a component called `useBudget()` outside of the `BudgetProvider` tree.

**Fix:** confirm `BudgetProvider` wraps `<App />` in `main.tsx`:

```tsx
<BudgetProvider>
  <App />
</BudgetProvider>
```

Any component using `useBudget()` must be a descendant of `BudgetProvider`.

---

## Budget or expenses don't persist after a page refresh

**Symptom:** data resets to empty/zero on reload, even though you added expenses.

**Possible causes:**

1. **Browser storage is disabled or blocked** (private/incognito mode, or browser settings blocking `localStorage`). Check the browser console for `localStorage` access errors.
2. **`state` never changed after the last write**, so the `useEffect` in `App.tsx` (which writes to `localStorage` on every `state` change) never re-ran. Confirm you're dispatching an action, not mutating state directly.
3. **`localStorage` was cleared** by the "Reset App" button, browser settings, or a manual `localStorage.clear()` call.

**Fix:** open DevTools → Application → Local Storage, and confirm `budget` and `expenses` keys exist and update after each action.

---

## An expense's category icon or name is missing / wrong

**Symptom:** `ExpenseDetail` shows a blank icon or blank category name.

**Cause:** the category lookup in `ExpenseDetail.tsx` currently compares `cat.id === expense.category[0]` — i.e., only the **first character** of `expense.category` — rather than the full category id string:

```ts
const categoryInfo = useMemo(
  () => categories.filter(cat => cat.id === expense.category[0]),
  [expense]
)
```

This only works today because every category id in `data/categories.ts` is a single character (`'1'`–`'7'`). If category ids are ever changed to multi-character strings (e.g. `'savings'`), this lookup will silently fail and the icon/name will disappear with no error thrown.

**Fix:** compare the full id instead:

```ts
const categoryInfo = useMemo(
  () => categories.filter(cat => cat.id === expense.category),
  [expense]
)
```

---

## "That expense exceeds the budget" appears when editing an expense, even without increasing the amount

**Symptom:** saving an edited expense triggers the budget-limit error unexpectedly.

**Cause:** `ExpenseForm` validates using `(expense.amount - previousAmount) > availableBudget`, where `previousAmount` is the original amount before editing began. If `previousAmount` wasn't captured correctly (e.g. the form was reset or reused without re-running the "load expense into form" effect), the comparison will be against the wrong baseline.

**Fix:** confirm the `useEffect` that watches `state.editingId` has actually run and set `previousAmount` before submitting:

```ts
useEffect(() => {
  if (state.editingId) {
    const editingExpense = state.expenses.find(e => e.id === state.editingId)
    setExpense(editingExpense)
    setPreviousAmount(editingExpense.amount)
  }
}, [state.editingId, state.expenses])
```

---

## Category filter shows no results even though expenses exist

**Symptom:** selecting a category in the filter dropdown empties the list.

**Cause:** `ExpenseList` filters with `expense.category === state.currentCategory`, an exact string match against the category **id**. If an expense's stored `category` value doesn't match any id in `data/categories.ts` (e.g. it was saved before a category list change, or saved with a category name instead of an id), it will never match a filter.

**Fix:** inspect the `expenses` array in `localStorage` and confirm each `category` field is a valid id from `data/categories.ts`.

---

## "Reset App" doesn't clear an active category filter

**Symptom:** after clicking "Reset App", the expense list still appears filtered (though empty, since all expenses were cleared).

**Cause:** the `reset-app` action only resets `budget` and `expenses` — it does not reset `currentCategory`.

**Fix:** if this matters for your use case, extend the `reset-app` case in `budget-reducer.ts` to also reset `currentCategory: ''` (and optionally `editingId: ''`).

---

## The floating "add expense" button doesn't open the modal

**Symptom:** clicking the `+` button in the bottom-right corner does nothing.

**Possible causes:**

1. `state.modal` isn't being set to `true` — check that `dispatch({ type: 'show-modal' })` is actually firing (add a `console.log` or check React DevTools).
2. The `Dialog` from `@headlessui/react` isn't receiving the correct `show` prop — confirm `ExpenseModal`'s `<Transition appear show={state.modal} ...>` is reading from the context state, not a stale local copy.

---

## Build fails with a TypeScript error after changing `Category` or `Expense` types

**Cause:** `budget-reducer.ts`, `FilterByCategory.tsx`, and `ExpenseDetail.tsx` all depend on the shared types in `src/types/index.ts`. Changing a field name or type there (e.g. `Category['id']`) requires updating every action payload and component that references it.

**Fix:** run `npm run build` (which runs `tsc -b` before `vite build`) to surface all type errors across the codebase before shipping.
