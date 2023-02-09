export const filtersMarkup = (filters: { maxAds?: number, totalAds?: number }) => `
<strong>Максимальное количество объявлений пользователя: </strong> ${filters.maxAds}
<strong>Количество объявлений на выходе: </strong> ${filters.totalAds}
`

export const whatsappMarkup = (whatsApp: { interval?: number }) => `
<strong>Интервал в секундах между отправкой сообщения: </strong> ${(whatsApp.interval || 1000) / 1000} сек
`

export const cookieMarkup = (cookie: {name?: string, data?: string}) => `
<strong>Имя куки: </strong> ${cookie.name}
`
