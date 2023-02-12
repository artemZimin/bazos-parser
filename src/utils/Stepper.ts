export class Stepper<T> {
    private currentIdx: number
    private count: number

    constructor(private items: Array<T>) {
        this.currentIdx = 0
        this.count = 0
    }

    getCurrent() {
        return this.items[this.currentIdx]
    }

    getLength() {
        return this.items.length
    }

    getCount() {
        return this.count
    }

    next() {
        this.currentIdx = this.currentIdx === this.items.length - 1 ? 0 : this.currentIdx + 1
        this.count++
    }

    prev() {
        this.currentIdx = this.currentIdx === 0 ? this.items.length - 1 : this.currentIdx - 1
        this.count++
    }
}