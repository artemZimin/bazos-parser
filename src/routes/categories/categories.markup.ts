import { AdsType } from '../../types/AdsType'

export const adsMarkup = (ads: AdsType) => `
<a href="${ads.url}">Ссылка</a>

<strong>Название товара:</strong> ${ads.name}

<strong>Имя пользователя:</strong> ${ads.user}

<strong>Количество объявлений пользователя:</strong> ${ads.adsCount}

<strong>Цена:</strong> ${ads.price}

<strong>Номер телефона:</strong> ${ads.phone_number}
`