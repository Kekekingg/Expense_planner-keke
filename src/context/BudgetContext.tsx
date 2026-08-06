import { useReducer, createContext, type Dispatch, type ReactNode } from "react"
import { type BudgetActions, type BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
}

type BudgetProviderProps = {
    children: ReactNode
}

//Both functions are not connected so we need to pass BudgetContext as a component sintaxis and the id dispatch

// eslint-disable-next-line react-refresh/only-export-components
export const BudgetContext = createContext<BudgetContextProps>(null!); //Let create the context

export const BudgetProvider = ({children}: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState); 

    return (
        <BudgetContext.Provider
         //The value is what it can be consume or use
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}