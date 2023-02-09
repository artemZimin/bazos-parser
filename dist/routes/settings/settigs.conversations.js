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
exports.createCookieConversation = exports.whatsappConversation = exports.filtersConversation = void 0;
const User_1 = require("../../models/User");
function filtersConversation(conversation, ctx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        ctx.reply('Введите максимальное количество объявлений пользователя');
        const maxAds = yield conversation.waitFor(':text');
        ctx.reply('Введите количество объявлений на выходе');
        const totalAds = yield conversation.waitFor(':text');
        const result = {
            filters: {
                maxAds: parseInt(maxAds.msg.text),
                totalAds: parseInt(totalAds.msg.text)
            }
        };
        yield User_1.User.updateByUserId(((_a = ctx.update.callback_query) === null || _a === void 0 ? void 0 : _a.from.id) || 0, result);
        yield ctx.reply('Готово!');
    });
}
exports.filtersConversation = filtersConversation;
function whatsappConversation(conversation, ctx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        ctx.reply('Введите интервал в секундах между отправкой сообщения');
        const interval = yield conversation.waitFor(':text');
        const result = {
            whatsApp: {
                interval: parseInt(interval.msg.text) * 1000
            }
        };
        yield User_1.User.updateByUserId(((_a = ctx.update.callback_query) === null || _a === void 0 ? void 0 : _a.from.id) || 0, result);
        yield ctx.reply('Готово!');
    });
}
exports.whatsappConversation = whatsappConversation;
function createCookieConversation(conversation, ctx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        ctx.reply('Введите название куки');
        const name = yield conversation.waitFor(':text');
        ctx.reply('Вставьте куку');
        const data = yield conversation.waitFor(':text');
        const result = {
            name: name.msg.text,
            data: data.msg.text,
            timestamp: Date.now()
        };
        yield User_1.User.addCookie(((_a = ctx.update.callback_query) === null || _a === void 0 ? void 0 : _a.from.id) || 0, result);
        yield ctx.reply('Готово!');
    });
}
exports.createCookieConversation = createCookieConversation;
