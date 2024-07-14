import express from 'express';
import router from './routes/router';
import dotenv from 'dotenv';
import connectDB from './config/db';
import path from 'path';
import cors from 'cors';

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Configura as variáveis de ambiente

const app = express(); // Inicializa o express

app.use(express.json()); // Permite que o express entenda JSON
app.use(cors()); // Permite que o express aceite requisições de outros domínios
app.use(router); // Adiciona as rotas ao express

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
