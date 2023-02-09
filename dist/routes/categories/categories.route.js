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
exports.CategoriesRoute = void 0;
const Bazos_1 = require("../../inc/Bazos");
const home_keyboard_1 = require("../home/home.keyboard");
const categories_keyboard_1 = require("./categories.keyboard");
exports.CategoriesRoute = {
    onMessage(ctx) {
        var _a, _b;
        if (categories_keyboard_1.CATEGORIES_KEYBOARD_BUTTONS.back === ((_a = ctx.update.message) === null || _a === void 0 ? void 0 : _a.text)) {
            ctx.reply(categories_keyboard_1.CATEGORIES_KEYBOARD_BUTTONS.back, {
                reply_markup: home_keyboard_1.homeKeyboard
            });
            ctx.session.route = 'home';
        }
        else if (Object.values(categories_keyboard_1.CATEGORIES_LIST).includes(((_b = ctx.update.message) === null || _b === void 0 ? void 0 : _b.text) || '')) {
            const bazos = new Bazos_1.Bazos(ctx);
            bazos.parse();
        }
    },
    stopParse(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.session.stopParse = true;
            yield ctx.answerCallbackQuery();
        });
    }
};
