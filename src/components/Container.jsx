import { useState } from "react";
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
    const [editItem,setEditItem] =useState(null)

    console.log(editItem)
    const addExpense = (title,amount) => {
        setTransactions ([
            ...transactions,
            {
                id:transactions.length + 1,
                title:title,
                amount:amount,
            },
        ]);
        toast.success("Transcation added successfully!!");
    };
    const deleteExpense = (id) =>{
        let res= transactions.filter((txn) => {
            return txn.id !==id;
        })
        setTransactions(res);
    }
    const updateExpense =(id,title,amount) =>{
        const res=transactions.map((txn)=>{
        if(txn.id === id){
            return {id :id ,title:title,amount:amount}
        }
        return txn;
        })
        setTransactions(res)
    }
    const editExpense = (item)=>{
        setEditItem(item)
    }
    return (
        <div className="container">
            <h2>Expense  Tracker</h2>
            <BalanceContainer transactions={transactions}/>
            <History transactions={transactions} deleteExpense={deleteExpense} editExpense={editExpense} />
            <ExpenseForm addExpense={addExpense} editItem={editItem} updateExpense={updateExpense} setEditItem={setEditItem}/>
            
        </div>
    )
}
export default Container;