import { useState, useEffect } from "react";
import axios from "axios";




function Dashboard() {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        "https://expense-backend-o79o.onrender.com/api/expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
  try {
    console.log(id);
    await axios.delete(
      `http://localhost:3000/api/expenses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchExpenses();

  } catch (error) {
    console.log(error);
  }
};

  const handleAddExpense = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/expenses",
        { title, amount, category },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-slate-800">Expense Tracker</h1>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Add Expense Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Add Expense</h3>
          <div className="space-y-4">
            <input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-shadow"
            />
            <input
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-shadow"
            />
            <input
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-shadow"
            />
            <button
              onClick={handleAddExpense}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Expenses List Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Your Expenses</h3>
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense._id}
                className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-slate-800">{expense.title}</span>
                  <span className="text-slate-500 mx-2">·</span>
                  <span className="text-slate-600">₹{expense.amount}</span>
                  <span className="text-slate-400 text-sm ml-2">({expense.category})</span>
                </div>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="ml-3 px-2.5 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors shrink-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {expenses.length === 0 && (
            <p className="text-slate-400 text-center py-8">No expenses yet. Add one above.</p>
          )}
        </div>
      </div>
    </div>
  );
}


export default Dashboard;