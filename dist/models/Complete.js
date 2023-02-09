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
exports.Complete = void 0;
const mongoose_1 = require("mongoose");
const db_1 = require("../utils/db");
const completeSchema = new mongoose_1.Schema({
    userName: String
});
const model = db_1.db.model('Complete', completeSchema);
class Complete {
    static create(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.create({ userName });
        });
    }
    static findOne(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.findOne({ userName });
        });
    }
}
exports.Complete = Complete;
