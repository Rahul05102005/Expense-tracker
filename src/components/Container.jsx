import { useState, useEffect } from "react";
import History from "./History";
import ExpenseForm from "./ExpenseForm";
import { toast } from "react-toastify";
import BalanceContainer from "./BalanceContainer";

const INITIAL_EXPENSE = [
    {
        id: 1,
        title: "Salary",
        amount: 1000,
    },
    {
        id: 2,
        title: "Rent",
        amount: -200,
    }
]

const Container = () => {
    const [transactions, setTransactions] = useState(INITIAL_EXPENSE)
    const [editItem, setEditItem] = useState(null)

    console.log(editItem)

    //to store data in db
    const addExpense = async (title, amount) => {
        await fetch("http://localhost:3000/addExpense", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ title, amount })
        })
        getAllExpense();
        toast.success("Transcation added successfully!!");
    };

    useEffect(() => {
        getAllExpense()
    }, [])

    const getAllExpense = async () => {
        const response = await fetch("http://localhost:3000/getExpense")
        const data = await response.json()
        setTransactions(data);

    }

    const deleteExpense = async (id) => {
        await fetch("http://localhost:3000/deleteExpense", {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id })
        })
        getAllExpense();

    }

    const editExpense = (item) => {
        setEditItem(item)
    }
    const updateExpense = async (id, title, amount) => {
        await fetch("http://localhost:3000/editExpense", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id, title, amount })
        })
        getAllExpense();

    }
    return (
        <div className="container">
            <h2>Expense  Tracker</h2>
            <BalanceContainer transactions={transactions} />
            <History transactions={transactions} deleteExpense={deleteExpense} editExpense={editExpense} />
            <ExpenseForm addExpense={addExpense} editItem={editItem} updateExpense={updateExpense} setEditItem={setEditItem} />

        </div>
    )
}
export default Container;