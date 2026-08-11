import { useState, type ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";



export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const [error, setError] = useState('');
    const {dispatch} = useBudget();

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            //Convert to a number with the "+" or we can use Number(value)
            [name] : isAmountField ? Number(value) : value
        })
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Validation (Object.values returns an array with the values of the object)
        if(Object.values(expense).includes('')) {
            setError('All fields are required');
            return
        }

        //Add a new expense
        dispatch({
            type: 'add-expense',
            payload: {expense}
        })

        //Reset the form
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

    }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend 
            className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
            >
                New Expense
            </legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Expense Name:
            </label>
            <input 
                type="text" 
                id="expenseName"
                placeholder="Add The Expense Name"
                className="bg-slate-100 p-2"
                name="expenseName"
                onChange={handleChange}
                value={expense.expenseName}

            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
                Amount:
            </label>
            <input 
                type="number" 
                id="amount"
                placeholder="Add The Expense Amount: ej. 300"
                className="bg-slate-100 p-2"
                name="amount"
                onChange={handleChange}
                value={expense.amount}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">
                Category: 
            </label>
            <select
                id="category"
                className="bg-slate-100 p-2"
                name="category"
                onChange={handleChange}
                value={expense.category}
            >
                <option value="">-- Select --</option>
                {categories.map(category => (
                    <option 
                        key={category.id}
                        value={category.id}
                    >{category.name}</option>
                ))}
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
                Expense Date: 
            </label>
            {/* Since it is a dependency we download, it accepts props */}
            <DatePicker
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>

        <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-l-lg"
            value={'Record Expense'}
        />
    </form>
  )
}
