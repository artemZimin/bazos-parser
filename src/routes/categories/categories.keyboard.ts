import { Keyboard } from 'grammy';

export const CATEGORIES_LIST = {
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
}

export const CATEGORIES_KEYBOARD_BUTTONS = {
    ...CATEGORIES_LIST,
    back: 'Назад'
}

export const categoriesKeyboard = new Keyboard()
    .text(CATEGORIES_KEYBOARD_BUTTONS.zvirata).text(CATEGORIES_KEYBOARD_BUTTONS.deti).text(CATEGORIES_KEYBOARD_BUTTONS.dum).row()
    .text(CATEGORIES_KEYBOARD_BUTTONS.elektro).text(CATEGORIES_KEYBOARD_BUTTONS.hudba).text(CATEGORIES_KEYBOARD_BUTTONS.knihy).row()
    .text(CATEGORIES_KEYBOARD_BUTTONS.mobil).text(CATEGORIES_KEYBOARD_BUTTONS.nabytek).text(CATEGORIES_KEYBOARD_BUTTONS.obleceni).row()
    .text(CATEGORIES_KEYBOARD_BUTTONS.pc).text(CATEGORIES_KEYBOARD_BUTTONS.sport).text(CATEGORIES_KEYBOARD_BUTTONS.foto).row()
    .text(CATEGORIES_KEYBOARD_BUTTONS.back).resized()
