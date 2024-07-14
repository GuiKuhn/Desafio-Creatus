import mongoose from 'mongoose';

// Função para conectar com o banco de dados
const connectDB = async () => {
        const mongoURI = process.env.MONGODB_URI as string;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in the .env file');
        }
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    
};

export default connectDB;