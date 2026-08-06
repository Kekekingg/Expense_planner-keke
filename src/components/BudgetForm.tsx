import { useState, useMemo } from "react"
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {

    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget(); 

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: 'add-budget', payload: {budget}})
    }

  return (
    //The Space Only affect the first children level
    <form className="space-y-5" onSubmit={handleSubmit}> 
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                Define Budget
            </label>

            <input 
                id="budget"
                type="number" 
                className="w-full bg-white border rounded-xl border-gray-200 p-2"
                placeholder="Define your budget"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit" 
            value='Define Budget'
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase rounded-lg disabled:opacity-40 disabled:hover:cursor-not-allowed"
            disabled={isValid}
        />
    </form>
  )
}
