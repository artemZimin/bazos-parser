import { Schema } from 'mongoose'
import { db } from '../utils/db'

const userSchema = new Schema({
    userId: Number,
    filters: {
        maxAds: Number,
        totalAds: Number
    },
    whatsApp: {
        interval: Number
    },
    cookies: [{ name: String, data: String, timestamp: Number }]
})

const model = db.model('User', userSchema)

export class User {
    private userId: number

    private filters: {
        maxAds: number
        totalAds: number
    }

    private cookies: Array<{ name: string, data: string }>

    private whatsApp: {
        interval: number
    }

    static async findOneByUserId(userId: number) {
        return await model.findOne({ userId })
    }

    static async addCookie(userId: number, data: { name: string, data: string }) {
        const user = await model.findOne({ userId })

        if (user) {
            const cookies = [...user.cookies, data]

            return await model.updateOne({ userId }, { cookies })
        }
    }

    static async deleteCookie(userId: number, timestamp: number) {
        const user = await model.findOne({ userId })

        if (user) {
            const cookies = user.cookies.filter(cookie => cookie.timestamp != timestamp)

            return await model.updateOne({ userId }, { cookies })
        }
    }

    static async updateByUserId(userId: number, updates: object) {

        return await model.updateOne({ userId }, updates)
    }

    constructor(userId: number) {

        this.userId = userId

        this.cookies = []

        this.filters = {
            maxAds: 3,
            totalAds: 10
        }

        this.whatsApp = {
            interval: 3000
        }
    }

    async save() {
        return await model.create({ userId: this.userId, filters: this.filters, whatsApp: this.whatsApp })
    }

}
