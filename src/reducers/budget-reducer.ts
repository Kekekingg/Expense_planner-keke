import { useReducer } from "react";

export type BudgetActions = 
    { type: 'add-budget', payload: {budget: number} } 

export type BudgetState = {
    budget: number
}

export const initialState : BudgetState = {
    budget: 0
}

export const budgetReducer = (
        state: BudgetState = initialState,
        action: BudgetActions
    ) => {
    switch (action.type) {
        
        case 'add-budget' : {
            return {
                ...state,
                budget: action.payload.budget
            }
        }
    }

    return state
}   