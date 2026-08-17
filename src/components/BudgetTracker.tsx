//This tracker show how many we defined, how much we spend and how many we have left
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

  const { state, totalExpenses, availableBudget, dispatch } = useBudget()

  const percentage = state.budget > 0
    ? Math.min(+((totalExpenses / state.budget) * 100).toFixed(2), 100)
    : 0

  const progressColor = percentage >= 75
    ? '#DC2626'
    : percentage >= 50
      ? '#FBBF24'
      : '#3B82F6'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: progressColor,
            trailColor: '#F5F5F5',
            textSize: 13,
            textColor: progressColor
          })}
          text={`${percentage}% Spent`}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer" 
          onClick={() => dispatch({type: 'reset-app'})}
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
