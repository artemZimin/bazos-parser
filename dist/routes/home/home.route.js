"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRoute = void 0;
const categories_keyboard_1 = require("../categories/categories.keyboard");
const settings_keyboard_1 = require("../settings/settings.keyboard");
const home_keyboard_1 = require("./home.keyboard");
exports.HomeRoute = {
    onMessage(ctx) {
        var _a;
        switch ((_a = ctx.update.message) === null || _a === void 0 ? void 0 : _a.text) {
            case home_keyboard_1.HOME_KEYBOARD_BUTTONS.categories:
                ctx.reply(home_keyboard_1.HOME_KEYBOARD_BUTTONS.categories, {
                    reply_markup: categories_keyboard_1.categoriesKeyboard
                });
                ctx.session.route = 'categories';
                break;
            case home_keyboard_1.HOME_KEYBOARD_BUTTONS.settings:
                ctx.reply(home_keyboard_1.HOME_KEYBOARD_BUTTONS.settings, {
                    reply_markup: settings_keyboard_1.settingsKeyboard
                });
                ctx.session.route = 'settings';
                break;
            default:
                break;
        }
    }
};
