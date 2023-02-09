"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesKeyboard = exports.CATEGORIES_KEYBOARD_BUTTONS = exports.CATEGORIES_LIST = void 0;
const grammy_1 = require("grammy");
exports.CATEGORIES_LIST = {
    ['zvirata']: 'Животные',
    ['deti']: 'Дети',
    ['dum']: 'Дом и сад',
    ['pc']: 'Компы',
    ['mobil']: 'Телефоны',
    ['elektro']: 'Электроника',
    ['sport']: 'Спорт',
    ['hudba']: 'Музыка',
    ['knihy']: 'Книги',
    ['nabytek']: 'Мебель',
    ['obleceni']: 'Одежда',
    ['foto']: 'Фото',
};
exports.CATEGORIES_KEYBOARD_BUTTONS = Object.assign(Object.assign({}, exports.CATEGORIES_LIST), { back: 'Назад' });
exports.categoriesKeyboard = new grammy_1.Keyboard()
    .text(exports.CATEGORIES_KEYBOARD_BUTTONS.zvirata).text(exports.CATEGORIES_KEYBOARD_BUTTONS.deti).text(exports.CATEGORIES_KEYBOARD_BUTTONS.dum).row()
    .text(exports.CATEGORIES_KEYBOARD_BUTTONS.elektro).text(exports.CATEGORIES_KEYBOARD_BUTTONS.hudba).text(exports.CATEGORIES_KEYBOARD_BUTTONS.knihy).row()
    .text(exports.CATEGORIES_KEYBOARD_BUTTONS.mobil).text(exports.CATEGORIES_KEYBOARD_BUTTONS.nabytek).text(exports.CATEGORIES_KEYBOARD_BUTTONS.obleceni).row()
    .text(exports.CATEGORIES_KEYBOARD_BUTTONS.pc).text(exports.CATEGORIES_KEYBOARD_BUTTONS.sport).text(exports.CATEGORIES_KEYBOARD_BUTTONS.foto).row()
    .text(exports.CATEGORIES_KEYBOARD_BUTTONS.back).resized();
