import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conn = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        const connection = await mongoose.connect(process.env.MONGO_URI, {
            // SSL/TLS options to fix the error
            // ssl: false,  // Disable SSL for local MongoDB
            // OR if you need SSL, use these instead:
            // ssl: true,
            // sslValidate: false,
            // tlsInsecure: true
        });

        console.log('Database connected successfully');
        return connection;
    } catch (error) {
        console.error('Error connecting database:', error.message);
        process.exit(1);
    }
};

export default conn;