"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRoute = void 0;
const User_1 = require("../../models/User");
const home_keyboard_1 = require("../home/home.keyboard");
const settings_keyboard_1 = require("./settings.keyboard");
const settings_markup_1 = require("./settings.markup");
exports.SettingsRoute = {
    onMessage(ctx) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            switch ((_a = ctx.update.message) === null || _a === void 0 ? void 0 : _a.text) {
                case settings_keyboard_1.SETTINGS_KEYBOARD_BUTTONS.back:
                    ctx.reply(settings_keyboard_1.SETTINGS_KEYBOARD_BUTTONS.back, {
                        reply_markup: home_keyboard_1.homeKeyboard
                    });
                    ctx.session.route = 'home';
                    break;
                case settings_keyboard_1.SETTINGS_KEYBOARD_BUTTONS.cookies:
                    ctx.reply('Управление куками', {
                        parse_mode: 'HTML',
                        reply_markup: settings_keyboard_1.cookieInlineKeyboard
                    });
                    break;
                case settings_keyboard_1.SETTINGS_KEYBOARD_BUTTONS.filters:
                    const userF = yield User_1.User.findOneByUserId(ctx.update.message.from.id);
                    ctx.reply((0, settings_markup_1.filtersMarkup)((userF === null || userF === void 0 ? void 0 : userF.filters) || {}), {
                        parse_mode: 'HTML',
                        reply_markup: settings_keyboard_1.filtersInlineKeyboard
                    });
                    break;
                case settings_keyboard_1.SETTINGS_KEYBOARD_BUTTONS.whatsapp:
                    const userW = yield User_1.User.findOneByUserId(ctx.update.message.from.id);
                    ctx.reply((0, settings_markup_1.whatsappMarkup)((userW === null || userW === void 0 ? void 0 : userW.whatsApp) || {}), {
                        parse_mode: 'HTML',
                        reply_markup: settings_keyboard_1.whatsappInlineKeyboard
                    });
                    break;
                default:
                    break;
            }
        });
    },
    getCookies(ctx) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOneByUserId(((_a = ctx.update.callback_query) === null || _a === void 0 ? void 0 : _a.from.id) || 0);
            user === null || user === void 0 ? void 0 : user.cookies.forEach((cookie) => __awaiter(this, void 0, void 0, function* () {
                yield ctx.reply((0, settings_markup_1.cookieMarkup)(cookie), {
                    parse_mode: 'HTML',
                    reply_markup: (0, settings_keyboard_1.getCookieInlineKeyboard)(cookie)
                });
            }));
            yield ctx.answerCallbackQuery();
        });
    }
};
