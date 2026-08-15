//This tracker show how many we defined, how much we spend and how many we have left
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {

  const { state, totalExpenses, availableBudget } = useBudget()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="Expense Graph"/>
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer" 
        >
          Reset App
        </button>

        <AmountDisplay
          label="Budget"
          amount={state.budget}
        />

        <AmountDisplay
          label="Spent"
          amount={totalExpenses}
        />

        <AmountDisplay
          label="Available"
          amount={availableBudget}
        />

      </div>
    </div>
  )
}
