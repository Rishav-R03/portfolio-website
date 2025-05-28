import mongoose from 'mongoose'

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected!");
    } catch (err) {
        console.log("error connecting database", err.message);
    }
}
export default conn 