const formatCurrency = (value) =>
    new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        maximumFractionDigits: 0,
    }).format(value)

export default function ExpenseList({ expenses }) {
    return (
        <section className="panel">
            <div className="panel-header">
                <div>
                    <p className="panel-kicker">History</p>
                    <h2>Son harcamalar</h2>
                </div>
            </div>

            {expenses.length === 0 ? (
                <p className="empty-state">
                    Kayıtlar burada listelenecek. İlk harcamanı ekledikten sonra geçmişini görebilirsin.
                </p>
            ) : (
                <div className="expense-list">
                    {expenses.map((expense) => (
                        <article className="expense-item" key={expense.id}>
                            <div>
                                <strong>{expense.category}</strong>
                                <p>{new Date(expense.date).toLocaleDateString('tr-TR')}</p>
                            </div>
                            <span>{formatCurrency(expense.amount)}</span>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}
