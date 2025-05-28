import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const conn = async () => {
    try {
        // Check if URI exists
        if (!process.env.MONGO_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
        return connection;
    } catch (error) {
        console.error('Error connecting database:', error.message);
        process.exit(1);
    }
};

export default conn;