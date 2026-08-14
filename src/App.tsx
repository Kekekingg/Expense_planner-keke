import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenserModal";
import ExpenseList from "./components/ExpenseList";


function App() {
  const { state } = useBudget();//Custom hook
  const isValidBudget = useMemo(() => state.budget > 0 , [state.budget]);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Expense Planner
        </h1>
      </header>

      <div className="max-w-3xl mx-auto lg:w-4/5 lg:justify-self-center bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
