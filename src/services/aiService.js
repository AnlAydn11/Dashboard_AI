const formatCurrency = (value) =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(value)

export const getAIInsights = async (expenses) => {
  if (expenses.length === 0) {
    return [
      'Analiz icin once en az bir harcama ekle.',
      'Kategori bazli dagilim olustugunda burada oncelikli iyilestirme onerileri gorunecek.',
    ]
  }

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const categoryTotals = expenses.reduce((accumulator, currentExpense) => {
    const currentTotal = accumulator[currentExpense.category] || 0
    accumulator[currentExpense.category] = currentTotal + currentExpense.amount
    return accumulator
  }, {})

  const sortedCategories = Object.entries(categoryTotals).sort(
    (firstItem, secondItem) => secondItem[1] - firstItem[1],
  )

  const [topCategoryName, topCategoryAmount] = sortedCategories[0]
  const averageSpend = totalSpent / expenses.length
  const suggestions = [
    `En yuksek harcama kategorin ${topCategoryName} ve toplamin ${formatCurrency(topCategoryAmount)}.`,
    `Kayit basina ortalama harcaman ${formatCurrency(averageSpend)} seviyesinde.`,
  ]

  if (sortedCategories.length > 1) {
    const secondCategoryAmount = sortedCategories[1][1]
    const difference = topCategoryAmount - secondCategoryAmount
    suggestions.push(
      `${topCategoryName} kategorisi ikinci siradaki kategoriye gore ${formatCurrency(difference)} daha fazla butce tuketiyor.`,
    )
  }

  if (topCategoryAmount / totalSpent > 0.45) {
    suggestions.push(
      `${topCategoryName} toplam harcamalarinin neredeyse yarisini olusturuyor. Bu kategoride aylik limit belirlemek faydali olabilir.`,
    )
  } else {
    suggestions.push(
      'Harcamalarin kategoriler arasinda dengeli dagiliyor. Bu dengeyi korumak icin duzenli takip iyi bir adim olur.',
    )
  }

  return suggestions
}
