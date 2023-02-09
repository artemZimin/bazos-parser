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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const db_1 = require("../utils/db");
const userSchema = new mongoose_1.Schema({
    userId: Number,
    filters: {
        maxAds: Number,
        totalAds: Number
    },
    whatsApp: {
        interval: Number
    },
    cookies: [{ name: String, data: String, timestamp: Number }]
});
const model = db_1.db.model('User', userSchema);
class User {
    static findOneByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.findOne({ userId });
        });
    }
    static addCookie(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model.findOne({ userId });
            if (user) {
                const cookies = [...user.cookies, data];
                return yield model.updateOne({ userId }, { cookies });
            }
        });
    }
    static deleteCookie(userId, timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model.findOne({ userId });
            if (user) {
                const cookies = user.cookies.filter(cookie => cookie.timestamp != timestamp);
                return yield model.updateOne({ userId }, { cookies });
            }
        });
    }
    static updateByUserId(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.updateOne({ userId }, updates);
        });
    }
    constructor(userId) {
        this.userId = userId;
        this.cookies = [];
        this.filters = {
            maxAds: 3,
            totalAds: 10
        };
        this.whatsApp = {
            interval: 3000
        };
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.create({ userId: this.userId, filters: this.filters, whatsApp: this.whatsApp });
        });
    }
}
exports.User = User;
