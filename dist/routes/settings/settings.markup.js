"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieMarkup = exports.whatsappMarkup = exports.filtersMarkup = void 0;
const filtersMarkup = (filters) => `
<strong>Максимальное количество объявлений пользователя: </strong> ${filters.maxAds}
<strong>Количество объявлений на выходе: </strong> ${filters.totalAds}
`;
exports.filtersMarkup = filtersMarkup;
const whatsappMarkup = (whatsApp) => `
<strong>Интервал в секундах между отправкой сообщения: </strong> ${(whatsApp.interval || 1000) / 1000} сек
`;
exports.whatsappMarkup = whatsappMarkup;
const cookieMarkup = (cookie) => `
<strong>Имя куки: </strong> ${cookie.name}
`;
exports.cookieMarkup = cookieMarkup;
