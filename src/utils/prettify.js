const formatter = new Intl.NumberFormat('ru-RU', {currency: 'RUB', maximumFractionDigits: 2, minimumFractionDigits: 2})

export const prettify = num => formatter.format(num)