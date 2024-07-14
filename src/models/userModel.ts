import e from "express";
import mongoose from "mongoose";

// Interface para o usuário
interface IUser extends mongoose.Document{
    name: string;
    email: string;
    password: string;
    level: 1 | 2 | 3 | 4 | 5;
}

// Schema para o usuário
const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    level: { type: Number, required: true, enum: [1, 2, 3, 4, 5]}
});

// Modelo para o usuário(conecta o schema com a coleção)
export const UserModel = mongoose.model<IUser>('User', userSchema);