"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieInlineKeyboard = exports.cookieInlineKeyboard = exports.whatsappInlineKeyboard = exports.filtersInlineKeyboard = exports.settingsKeyboard = exports.DELETE_COOKIE_CALLBACK_QUERY_TYPE = exports.VALID_COOKIE_CALLBACK_QUERY_TYPE = exports.SET_COOKIE_CALLBACK_QUERY_DATA = exports.GET_COOKIE_CALLBACK_QUERY_DATA = exports.CHANGE_WHATSAPP_CALLBACK_QUERY_DATA = exports.CHANGE_FILTERS_CALLBACK_QUERY_DATA = exports.SETTINGS_KEYBOARD_BUTTONS = void 0;
const grammy_1 = require("grammy");
exports.SETTINGS_KEYBOARD_BUTTONS = {
    filters: 'Фильтры',
    cookies: 'Куки',
    whatsapp: 'Whats App',
    back: 'Назад'
};
exports.CHANGE_FILTERS_CALLBACK_QUERY_DATA = 'change_filters';
exports.CHANGE_WHATSAPP_CALLBACK_QUERY_DATA = 'change_whatsapp';
exports.GET_COOKIE_CALLBACK_QUERY_DATA = 'get_cookie';
exports.SET_COOKIE_CALLBACK_QUERY_DATA = 'set_cookie';
exports.VALID_COOKIE_CALLBACK_QUERY_TYPE = 'cookie_valid';
exports.DELETE_COOKIE_CALLBACK_QUERY_TYPE = 'cookie_delete';
exports.settingsKeyboard = new grammy_1.Keyboard()
    .text(exports.SETTINGS_KEYBOARD_BUTTONS.filters).row()
    .text(exports.SETTINGS_KEYBOARD_BUTTONS.cookies).row()
    .text(exports.SETTINGS_KEYBOARD_BUTTONS.whatsapp).row()
    .text(exports.SETTINGS_KEYBOARD_BUTTONS.back).resized();
exports.filtersInlineKeyboard = new grammy_1.InlineKeyboard()
    .text('Изменить настройки фильтров', exports.CHANGE_FILTERS_CALLBACK_QUERY_DATA);
exports.whatsappInlineKeyboard = new grammy_1.InlineKeyboard()
    .text('Изменить настройки спама по Whats App', exports.CHANGE_WHATSAPP_CALLBACK_QUERY_DATA);
exports.cookieInlineKeyboard = new grammy_1.InlineKeyboard()
    .text('Мои куки', exports.GET_COOKIE_CALLBACK_QUERY_DATA)
    .text('Добавить куки', exports.SET_COOKIE_CALLBACK_QUERY_DATA);
const getCookieInlineKeyboard = (cookie) => new grammy_1.InlineKeyboard()
    .text('Проверка на валид', exports.VALID_COOKIE_CALLBACK_QUERY_TYPE + ':' + cookie.timestamp).row()
    .text('Удалить', exports.DELETE_COOKIE_CALLBACK_QUERY_TYPE + ':' + cookie.timestamp);
exports.getCookieInlineKeyboard = getCookieInlineKeyboard;
