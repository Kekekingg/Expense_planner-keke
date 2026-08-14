import {v4 as uuidv4} from 'uuid'
import type { DraftExpense, Expense } from "../types"

export type BudgetActions = 
    { type: 'add-budget', payload: {budget: number} } |
    { type: 'show-modal' } | 
    { type: 'close-modal' } |
    { type: 'add-expense', payload: {expense: DraftExpense}} |
    { type: 'delete-expense', payload: {id: Expense['id']} } |
    { type: 'get-expense-by-id', payload: {id: Expense['id']} }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
}

export const initialState : BudgetState = {
    budget: 0,
    modal:false,
    expenses: [],
    editingId: ''
}

//Generate a new expense with a unique id when it pass the validation in the form
const createExpense = (draftExpense: DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }

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
        case 'show-modal' : {
            return {
                ...state,
                modal:true
            }
        }
        case 'close-modal' : {
            return {
                ...state,
                modal: false
            }
        }
        case 'add-expense' : {

            const expense = createExpense(action.payload.expense)
            return {
                ...state,
                expenses: [...state.expenses, expense],
                modal: false
            }
        }
        case 'delete-expense' : {
            return { 
                ...state,
                expenses: state.expenses.filter( expense => expense.id !== action.payload.id)
            }
        }
        case 'get-expense-by-id' : {
            return {
                ...state,
                editingId: action.payload.id,
                modal: true
            }
        }
    }   

    return state
}   