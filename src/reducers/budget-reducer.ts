
export type BudgetActions = 
    { type: 'add-budget', payload: {budget: number} } |
    { type: 'show-modal' } | 
    { type: 'close-modal' }

export type BudgetState = {
    budget: number
    modal: boolean
}

export const initialState : BudgetState = {
    budget: 0,
    modal:false
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
    }   

    return state
}   