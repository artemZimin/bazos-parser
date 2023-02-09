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
const grammy_1 = require("grammy");
const callbackQueries_1 = require("./callbackQueries");
const access_1 = require("./moddlewares/access");
const home_keyboard_1 = require("./routes/home/home.keyboard");
const routes_1 = require("./routes/routes");
const conversations_1 = require("@grammyjs/conversations");
const settigs_conversations_1 = require("./routes/settings/settigs.conversations");
const User_1 = require("./models/User");
// Define the shape of our session.
const bot = new grammy_1.Bot('5894594725:AAHntm3i5Ywbm-7RRj8e6uA4KMkibVQD20Q');
function initial() {
    return { ads: [], route: 'home', stopParse: false };
}
bot.use((0, grammy_1.session)({ initial }));
bot.use((0, conversations_1.conversations)());
bot.use((0, conversations_1.createConversation)(settigs_conversations_1.filtersConversation, 'filtersConversation'));
bot.use((0, conversations_1.createConversation)(settigs_conversations_1.whatsappConversation, 'whatsappConversation'));
bot.use((0, conversations_1.createConversation)(settigs_conversations_1.createCookieConversation, 'createCookieConversation'));
bot.use(access_1.access);
bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!(yield User_1.User.findOneByUserId(((_a = ctx.update.message) === null || _a === void 0 ? void 0 : _a.from.id) || 0))) {
        const user = new User_1.User(((_b = ctx.update.message) === null || _b === void 0 ? void 0 : _b.from.id) || 0);
        yield user.save();
    }
    yield ctx.reply('Добро пожаловать', {
        reply_markup: home_keyboard_1.homeKeyboard
    });
}));
bot.use(callbackQueries_1.callbackQueries);
bot.use(routes_1.router);
bot.start();
