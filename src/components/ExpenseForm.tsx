import { categories } from "../data/categories";

export default function ExpenseForm() {
  return (
    <form action="" className="space-y-5">
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            New Expense
        </legend>

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Expense Name
            </label>
            <input 
                type="text" 
                id="expenseName"
                placeholder="Add The Expense Name"
                className="bg-slate-100 p-2"
                name="expeseName"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
                Amount
            </label>
            <input 
                type="number" 
                id="amount"
                placeholder="Add The Expense Amount: ej. 300"
                className="bg-slate-100 p-2"
                name="amount"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">
                Category
            </label>
            <select
                id="category"
                className="bg-slate-100 p-2"
                name="category"
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

        <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-l-lg"
            value={'Record Expense'}
        />
    </form>
  )
}
