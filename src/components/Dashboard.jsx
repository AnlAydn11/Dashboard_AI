const formatCurrency = (value) =>
    new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        maximumFractionDigits: 0,
    }).format(value)

export default function Dashboard({ expenses }) {
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const topCategory = expenses.reduce((accumulator, currentExpense) => {
        const currentTotal = accumulator[currentExpense.category] || 0
        accumulator[currentExpense.category] = currentTotal + currentExpense.amount
        return accumulator
    }, {})

    const categoryBreakdown = Object.entries(topCategory)
        .map(([name, value]) => ({
            name,
            value,
            share: totalSpent > 0 ? (value / totalSpent) * 100 : 0,
        }))
        .sort((firstItem, secondItem) => secondItem.value - firstItem.value)

    return (
        <section className="panel">
            <div className="panel-header">
                <div>
                    <p className="panel-kicker">Overview</p>
                    <h2>Harcama özeti</h2>
                </div>
                <span className="total-pill">{formatCurrency(totalSpent)}</span>
            </div>

            {expenses.length === 0 ? (
                <p className="empty-state">
                    Henüz harcama eklenmedi. İlk kaydı girerek kategori dağılımını görebilirsin.
                </p>
            ) : (
                <div className="chart-list">
                    {categoryBreakdown.map((item) => (
                        <article className="category-row" key={item.name}>
                            <div className="category-meta">
                                <strong>{item.name}</strong>
                                <span>{formatCurrency(item.value)}</span>
                            </div>
                            <div
                                aria-hidden="true"
                                className="category-bar"
                                style={{ '--bar-width': `${Math.max(item.share, 8)}%` }}
                            />
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}
