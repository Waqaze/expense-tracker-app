import React, { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const addExpense = () => {
    if (isEditing) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === editId ? { ...expense, name, amount, date } : expense
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setExpenses([...expenses, { id: Date.now(), name, amount, date }]);
    }
    setName("");
    setAmount("");
    setDate("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setName(expenseToEdit.name);
    setAmount(expenseToEdit.amount);
    setDate(expenseToEdit.date);
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <div className="App">
      <h1>Expense Tracker App</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addExpense}>
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>
      </div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.name}</span>  /
            <span>{expense.amount}</span>  /
            <span>{expense.date}</span>  /
            <button onClick={() => editExpense(expense.id)}>Edit</button>
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
