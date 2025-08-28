import { useState } from "react";
import { toast } from "react-toastify";  
import { useEffect } from "react";

const ExpenseForm = (props) => {
    const { addExpense, editItem ,updateExpense,setEditItem} = props;
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    useEffect(() => {
        setTitle(editItem?.title || "")
        setAmount(editItem?.amount || "")
    }, [editItem])

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }
    const handleSumbit = (e) => {
        e.preventDefault();
        if (title && amount) {
            if (editItem) {
                updateExpense(editItem.id, title, amount)
                setEditItem(null)
            }
            else {
                addExpense(title, amount);
            }
        }
        else if (!title && !amount) {
            toast.error("Please Fill Details !?")
        }
        else if (!title) {
            toast.error("Please Enter Title !?")
        }
        else {
            toast.error("Please Enter Amount !?")
        }

    }
    return (
        <>
            <div className="expense-form">
                <h4>
                    {editItem ? "Edit" : "Add"} Transcation
                </h4>
                <form onSubmit={handleSumbit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" placeholder="Enter title" value={title} onChange={handleTitleChange} />
                    </div>
                    <div>
                        <label htmlFor="amount">Amount</label>
                        <input type="number" id="amount" name="amount" placeholder="Enter Amount" value={amount} onChange={handleAmountChange} />
                    </div>
                    <button type="submit">{editItem ? "Edit" : "Add"}Transcation</button>
                </form>
            </div>
        </>
    )
}
export default ExpenseForm;