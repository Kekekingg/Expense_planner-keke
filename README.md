[README.md](https://github.com/user-attachments/files/31158078/README.md)
# Expense Planner

A modern personal budget and expense-tracking app built with **React 19**, **TypeScript**, `useReducer`, and the **Context API**. Set a budget, log expenses, filter them by category, and track your spending progress in real time — all persisted locally in the browser.

**Live demo:** https://expense-planner-kekekings.netlify.app/

---

## Preview

### Define your budget

The app starts by asking for a starting budget before any tracking begins.

![Define Budget screen](screenshots/define-budget.png)

### Track and manage expenses

Once a budget is set, the dashboard shows spending progress, lets you filter expenses by category, and lists every recorded expense with its category, date, and amount.

![Expense dashboard](screenshots/dashboard.png)

---

## Features

- **Set a budget** — define a starting budget before tracking begins.
- **Add / edit / delete expenses** — each expense has a name, amount, category, and date.
- **Category filtering** — narrow the expense list down to a single category.
- **Spending progress indicator** — a circular progress bar shows the percentage of budget spent, color-coded by severity (blue → yellow → red).
- **Reset app** — clears the budget and all expenses in one action.
- **Persistent storage** — budget and expenses are saved to `localStorage`, so data survives page reloads.
- **Swipe actions** — swipe an expense to update or delete it.
- **Client-side validation** — required fields and budget-limit checks before an expense is saved.

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19, TypeScript |
| State management | `useReducer` + Context API |
| Styling | Tailwind CSS 4 |
| Build tool | Vite |
| Key libraries | `react-date-picker`, `react-circular-progressbar`, `react-swipeable-list`, `@headlessui/react`, `@heroicons/react`, `uuid` |

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/Kekekingg/Expense_planner-keke.git
cd Expense_planner-keke
npm install
```

### Development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # UI components (forms, lists, tracker, modal, filter)
├── context/           # BudgetContext — global state provider
├── reducers/          # budget-reducer — all state transitions
├── hooks/              # useBudget — context consumer hook
├── helpers/            # formatCurrency, formatDate
├── data/                # Static category definitions
└── types/               # Shared TypeScript types
```

For a deeper look at how these pieces fit together, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — state model, data flow, component responsibilities
- [API Reference](docs/API_REFERENCE.md) — every reducer action, its payload, and effect
- [Troubleshooting](docs/TROUBLESHOOTING.md) — common issues and how to resolve them

## Author

Erik Reyes ("Keke") — [GitHub](https://github.com/Kekekingg) · [Portfolio](https://portfolio-erik-reyes-keke.netlify.app)
