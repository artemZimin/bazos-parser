import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

(async () => {
    await mongoose.connect('mongodb://localhost:27017/bazos-parser');
    console.log('db conected');
})()

export const db = mongoose
