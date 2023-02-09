"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeKeyboard = exports.HOME_KEYBOARD_BUTTONS = void 0;
const grammy_1 = require("grammy");
exports.HOME_KEYBOARD_BUTTONS = {
    categories: 'Категории',
    settings: 'Настройки'
};
exports.homeKeyboard = new grammy_1.Keyboard()
    .text(exports.HOME_KEYBOARD_BUTTONS.categories).row()
    .text(exports.HOME_KEYBOARD_BUTTONS.settings).resized();
