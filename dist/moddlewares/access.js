"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.access = void 0;
const access_json_1 = __importDefault(require("../access.json"));
const access = (ctx, next) => {
    var _a, _b, _c, _d;
    if (access_json_1.default.includes((_d = (_b = (_a = ctx.update.message) === null || _a === void 0 ? void 0 : _a.from.username) !== null && _b !== void 0 ? _b : (_c = ctx.update.callback_query) === null || _c === void 0 ? void 0 : _c.from.username) !== null && _d !== void 0 ? _d : '')) {
        next();
    }
    else {
        ctx.reply('Нет доступа');
    }
};
exports.access = access;
