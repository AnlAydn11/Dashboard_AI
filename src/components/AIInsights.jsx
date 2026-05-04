import { useState } from 'react'
import { getAIInsights } from '../services/aiService'

export default function AIInsights({ expenses }) {
    const [result, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleAnalyze = async () => {
        setIsLoading(true)
        const res = await getAIInsights(expenses)
        setResult(res)
        setIsLoading(false)
    }

    return (
        <section className="panel">
            <div className="panel-header">
                <div>
                    <p className="panel-kicker">Insights</p>
                    <h2>Akıllı yorumlar</h2>
                </div>
                <button className="primary-button" onClick={handleAnalyze} type="button">
                    {isLoading ? 'Analiz ediliyor...' : 'Analiz et'}
                </button>
            </div>

            {result.length === 0 ? (
                <p className="empty-state">
                    Harcamalarını yorumlatmak için analiz butonunu kullan.
                </p>
            ) : (
                <ul className="insights-list">
                    {result.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            )}
        </section>
    )
}
