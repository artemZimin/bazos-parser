import { Keyboard, InlineKeyboard } from 'grammy';

export const SETTINGS_KEYBOARD_BUTTONS = {
    filters: 'Фильтры',
    cookies: 'Куки',
    whatsapp: 'Whats App',
    back: 'Назад'
}

export const CHANGE_FILTERS_CALLBACK_QUERY_DATA = 'change_filters'
export const CHANGE_WHATSAPP_CALLBACK_QUERY_DATA = 'change_whatsapp'
export const GET_COOKIE_CALLBACK_QUERY_DATA = 'get_cookie'
export const SET_COOKIE_CALLBACK_QUERY_DATA = 'set_cookie'
export const VALID_COOKIE_CALLBACK_QUERY_TYPE = 'cookie_valid'
export const DELETE_COOKIE_CALLBACK_QUERY_TYPE = 'cookie_delete'

export const settingsKeyboard = new Keyboard()
    .text(SETTINGS_KEYBOARD_BUTTONS.filters).row()
    .text(SETTINGS_KEYBOARD_BUTTONS.cookies).row()
    .text(SETTINGS_KEYBOARD_BUTTONS.whatsapp).row()
    .text(SETTINGS_KEYBOARD_BUTTONS.back).resized()

export const filtersInlineKeyboard = new InlineKeyboard()
    .text('Изменить настройки фильтров', CHANGE_FILTERS_CALLBACK_QUERY_DATA)

export const whatsappInlineKeyboard = new InlineKeyboard()
    .text('Изменить настройки спама по Whats App', CHANGE_WHATSAPP_CALLBACK_QUERY_DATA)

export const cookieInlineKeyboard = new InlineKeyboard()
    .text('Мои куки', GET_COOKIE_CALLBACK_QUERY_DATA)
    .text('Добавить куки', SET_COOKIE_CALLBACK_QUERY_DATA)

export const getCookieInlineKeyboard = (cookie: { data?: string | undefined; name?: string | undefined; timestamp?: number | undefined; }) => new InlineKeyboard()
    .text('Проверка на валид', VALID_COOKIE_CALLBACK_QUERY_TYPE + ':' + cookie.timestamp).row()
    .text('Удалить', DELETE_COOKIE_CALLBACK_QUERY_TYPE + ':' + cookie.timestamp)
