import type { Expense } from "../types"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatDate } from "../helpers/index"
import AmountDisplay from "./AmountDisplay"
import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { categories } from "../data/categories"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

  const {dispatch} = useBudget()

  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category[0]), [expense])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}>
        Update
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        destructive={true}
        onClick={() => dispatch({type: 'delete-expense', payload: {id: expense.id}})}
        >
          Delete
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="flex gap-5 items-center bg-white shadow-lg p-5 w-full border-b border-gray-200">
          <div>
            <img 
              src={`/icono_${categoryInfo[0]?.icon}.svg`}
              alt="Expense Icon"
              className="w-20"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo[0]?.name}</p>
            <p>{expense.expenseName}</p>
            {/* The ! after expense.date indicates that it's a non-null assertion, meaning we're telling TypeScript that we know the value is not null or undefined */}
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>

          <AmountDisplay
            amount={expense.amount}
          />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
