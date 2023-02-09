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
exports.callbackQueries = void 0;
const grammy_1 = require("grammy");
const Bazos_1 = require("./inc/Bazos");
const User_1 = require("./models/User");
const categories_route_1 = require("./routes/categories/categories.route");
const settings_keyboard_1 = require("./routes/settings/settings.keyboard");
const settings_route_1 = require("./routes/settings/settings.route");
exports.callbackQueries = new grammy_1.Composer();
const enterConversation = (conversation) => (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ctx.conversation.enter(conversation);
    }
    catch (error) {
        console.log('---');
    }
    yield ctx.answerCallbackQuery();
});
exports.callbackQueries.callbackQuery(Bazos_1.PARSE_STOP_BUTTON_TEXT, categories_route_1.CategoriesRoute.stopParse);
exports.callbackQueries.callbackQuery(settings_keyboard_1.CHANGE_FILTERS_CALLBACK_QUERY_DATA, enterConversation('filtersConversation'));
exports.callbackQueries.callbackQuery(settings_keyboard_1.CHANGE_WHATSAPP_CALLBACK_QUERY_DATA, enterConversation('whatsappConversation'));
exports.callbackQueries.callbackQuery(settings_keyboard_1.SET_COOKIE_CALLBACK_QUERY_DATA, enterConversation('createCookieConversation'));
exports.callbackQueries.callbackQuery(settings_keyboard_1.GET_COOKIE_CALLBACK_QUERY_DATA, settings_route_1.SettingsRoute.getCookies);
exports.callbackQueries.on("callback_query:data", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const [type, data] = ctx.callbackQuery.data.split(':');
    if (type === settings_keyboard_1.DELETE_COOKIE_CALLBACK_QUERY_TYPE) {
        yield User_1.User.deleteCookie(((_a = ctx.update.callback_query) === null || _a === void 0 ? void 0 : _a.from.id) || 0, parseInt(data));
        ctx.reply('Готово');
    }
    if (type === settings_keyboard_1.VALID_COOKIE_CALLBACK_QUERY_TYPE) {
        yield Bazos_1.Bazos.checkValidCookie(ctx, parseInt(data));
    }
    yield ctx.answerCallbackQuery(); // remove loading animation
}));
