import { useState } from 'react'

export default function ExpenseForm({ onAdd }) {
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!amount || Number(amount) <= 0 || !category.trim()) {
            setError('Lutfen gecerli bir tutar ve kategori gir.')
            return
        }

        onAdd({
            id: Date.now(),
            amount: Number(amount),
            category: category.trim(),
            date: new Date().toISOString(),
        })

        setAmount('')
        setCategory('')
        setError('')
    }

    return (
        <section className="panel">
            <div className="panel-header">
                <div>
                    <p className="panel-kicker">Entry</p>
                    <h2>Yeni harcama ekle</h2>
                </div>
            </div>

            <form className="expense-form" onSubmit={handleSubmit}>
                <label>
                    <span>Tutar</span>
                    <input
                        min="0"
                        placeholder="Orn. 850"
                        step="0.01"
                        type="number"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                    />
                </label>

                <label>
                    <span>Kategori</span>
                    <input
                        placeholder="Orn. Market"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    />
                </label>

                <button className="primary-button" type="submit">
                    Harcamayı kaydet
                </button>
            </form>

            {error ? <p className="form-error">{error}</p> : null}
        </section>
    )
}
