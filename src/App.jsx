import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import Dashboard from './components/Dashboard'
import ExpenseList from './components/ExpenseList'
import AIInsights from './components/AIInsights'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])

  const addExpense = (exp) => {
    setExpenses((currentExpenses) => [exp, ...currentExpenses])
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Expense intelligence</p>
        <h1>AI Expense Dashboard</h1>
        <p className="hero-copy">
          Gelir ve giderlerini tek ekranda topla, kategori bazlı dağılımı izle ve
          harcamaların için hızlı özetler al.
        </p>
      </section>

      <section className="content-grid">
        <div className="stack">
          <ExpenseForm onAdd={addExpense} />
          <AIInsights expenses={expenses} />
        </div>

        <div className="stack">
          <Dashboard expenses={expenses} />
          <ExpenseList expenses={expenses} />
        </div>
      </section>
    </main>
  )
}

export default App
