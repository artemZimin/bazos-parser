"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stepper = void 0;
class Stepper {
    constructor(items) {
        this.items = items;
        this.currentIdx = 0;
        this.count = 0;
    }
    getCurrent() {
        return this.items[this.currentIdx];
    }
    getLength() {
        return this.items.length;
    }
    getCount() {
        return this.count;
    }
    next() {
        this.currentIdx = this.currentIdx === this.items.length - 1 ? 0 : this.currentIdx + 1;
        this.count++;
    }
    prev() {
        this.currentIdx = this.currentIdx === 0 ? this.items.length - 1 : this.currentIdx - 1;
        this.count++;
    }
}
exports.Stepper = Stepper;
