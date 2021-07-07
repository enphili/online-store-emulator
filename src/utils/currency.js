const formatter = new Intl.NumberFormat('ru-RU', {currency: 'RUB', style: 'currency', maximumFractionDigits: 2})

export const currency = value => formatter.format(value)
