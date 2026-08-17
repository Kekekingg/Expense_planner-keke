[API_REFERENCE.md](https://github.com/user-attachments/files/31158223/API_REFERENCE.md)
# API Reference — Reducer Actions

This app has no backend API. Its "API" is the set of actions accepted by `budgetReducer` (`src/reducers/budget-reducer.ts`), dispatched through the `dispatch` function returned by `useBudget()`.

```ts
const { dispatch } = useBudget()
dispatch({ type: 'add-expense', payload: { expense } })
```

All actions are defined in the `BudgetActions` union type.

---

## `add-budget`

Sets the total budget.

```ts
{ type: 'add-budget', payload: { budget: number } }
```

| Field | Type | Description |
|---|---|---|
| `payload.budget` | `number` | The new total budget. |

**Effect:** sets `state.budget`.

**Dispatched from:** `BudgetForm` on submit.

---

## `show-modal`

Opens the add/edit expense modal.

```ts
{ type: 'show-modal' }
```

**Effect:** sets `state.modal = true`.

**Dispatched from:** `ExpenseModal`'s floating action button.

---

## `close-modal`

Closes the modal and clears any in-progress edit.

```ts
{ type: 'close-modal' }
```

**Effect:** sets `state.modal = false` and `state.editingId = ''`.

**Dispatched from:** `ExpenseModal`'s `Dialog` `onClose`.

---

## `add-expense`

Creates a new expense.

```ts
{ type: 'add-expense', payload: { expense: DraftExpense } }
```

| Field | Type | Description |
|---|---|---|
| `payload.expense` | `DraftExpense` | Expense data without an `id` (name, amount, category, date). |

**Effect:** generates a UUID for the new expense (via `uuid`), appends it to `state.expenses`, and closes the modal (`modal: false`).

**Dispatched from:** `ExpenseForm` on submit, when `state.editingId` is empty.

---

## `delete-expense`

Removes an expense.

```ts
{ type: 'delete-expense', payload: { id: string } }
```

| Field | Type | Description |
|---|---|---|
| `payload.id` | `string` | The id of the expense to remove. |

**Effect:** filters the expense out of `state.expenses`. Because `totalExpenses` and `availableBudget` are derived values, the available budget updates automatically — no manual adjustment is needed.

**Dispatched from:** `ExpenseDetail`'s trailing swipe action ("Delete").

---

## `get-expense-by-id`

Loads an existing expense into the form for editing.

```ts
{ type: 'get-expense-by-id', payload: { id: string } }
```

| Field | Type | Description |
|---|---|---|
| `payload.id` | `string` | The id of the expense to edit. |

**Effect:** sets `state.editingId` to the given id and opens the modal (`modal: true`).

**Dispatched from:** `ExpenseDetail`'s leading swipe action ("Update").

---

## `update-expense`

Saves changes to an existing expense.

```ts
{ type: 'update-expense', payload: { expense: Expense } }
```

| Field | Type | Description |
|---|---|---|
| `payload.expense` | `Expense` | The full updated expense, including its existing `id`. |

**Effect:** replaces the matching expense in `state.expenses`, closes the modal, and clears `editingId`.

**Dispatched from:** `ExpenseForm` on submit, when `state.editingId` is set.

---

## `reset-app`

Clears the budget and all expenses.

```ts
{ type: 'reset-app' }
```

**Effect:** sets `state.budget = 0` and `state.expenses = []`. Because `App.tsx` persists `state` to `localStorage` on every change, this also clears the persisted data on the next render.

**Note:** does not reset `currentCategory` or `editingId`.

**Dispatched from:** the "Reset App" button in `BudgetTracker`.

---

## `add-filter-category`

Filters the expense list by category.

```ts
{ type: 'add-filter-category', payload: { id: string } }
```

| Field | Type | Description |
|---|---|---|
| `payload.id` | `string` | The category id to filter by. An empty string clears the filter (shows all categories). |

**Effect:** sets `state.currentCategory`.

**Dispatched from:** `FilterByCategory`'s `<select>` `onChange`.

---

## Related Types

```ts
type Expense = {
    id: string
    expenseName: string
    amount: number
    category: string
    date: Value
}

type DraftExpense = Omit<Expense, 'id'>

type Category = {
    id: string
    name: string
    icon: string
}
```
