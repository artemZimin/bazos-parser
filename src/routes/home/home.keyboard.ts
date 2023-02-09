import { Keyboard } from 'grammy';

export const HOME_KEYBOARD_BUTTONS = {
    categories: 'Категории',
    settings: 'Настройки'
}

export const homeKeyboard = new Keyboard()
    .text(HOME_KEYBOARD_BUTTONS.categories).row()
    .text(HOME_KEYBOARD_BUTTONS.settings).resized()
