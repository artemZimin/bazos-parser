import { Schema } from 'mongoose'
import { db } from '../utils/db'

const completeSchema = new Schema({
    userName: String
})

const model = db.model('Complete', completeSchema)

export class Complete {

    static async create(userName: string) {
        return await model.create({ userName })
    }

    static async findOne(userName: string) {
        return await model.findOne({ userName })
    }

}
