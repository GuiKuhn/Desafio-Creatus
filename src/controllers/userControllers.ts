import {UserModel} from "../models/userModel";
import {Request, Response} from "express";
import jwt from "jsonwebtoken";


//Função para criar um usuário
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new UserModel(req.body); // Cria um novo usuário com os dados do corpo da requisição
        await user.save(); // Salva o usuário no banco de dados
        res.status(201).send(user); // Retorna o usuário criado
    } catch (error) {
        res.status(400).send(error); // Se ocorrer um erro, retorna um erro 400 (Bad Request)
    }
};

//Função para buscar todos os usuários
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find(); // Busca todos os usuários na coleção
        res.status(200).send(users); // Retorna os usuários
    } catch (error) {
        res.status(500).send(error); // Se ocorrer um erro, retorna um erro 500 (Internal Server Error)
    }
};

//Função para buscar um usuário
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params._id); // Busca o usuário pelo id
        if (!user) {
            return res.status(404).send('User not found'); // Se não encontrar o usuário, retorna um erro 404 (Not Found)
        }
        res.status(200).send(user); // Se encontrar o usuário, retorna o usuário
    } catch (error) {
        res.status(500).send(error); // Se ocorrer um erro, retorna um erro 500 (Internal Server Error)
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id , req.body, {new: true}); // Busca e atualiza o usuário pelo id (new: true retorna o usuário atualizado)
        if (!user) {
            return res.status(404).send('User not found'); // Se não encontrar o usuário, retorna um erro 404 (Not Found)
        }
        res.status(200).send(user); // Se encontrar o usuário, retorna o usuário atualizado
    } catch (error) {
        res.status(500).send(error); // Se ocorrer um erro, retorna um erro 500 (Internal Server Error)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id); // Busca e deleta o usuário pelo id
        if (!user) {
            return res.status(404).send('User not found'); // Se não encontrar o usuário, retorna um erro 404 (Not Found)
        }
        res.status(200).send(user); // Se encontrar o usuário, retorna o usuário deletado
    } catch (error) {
        res.status(500).send(error); // Se ocorrer um erro, retorna um erro 500 (Internal Server Error)
    }
}

export const loginAuth = async (req: Request, res: Response) => {
    const { email, password } = req.body; // Pega o email e a senha do corpo da requisição
    try {
        const user = await UserModel.findOne({ email }); // Busca o usuário pelo email
        if (user && user.password === password) {
            const token = jwt.sign({ id: user._id , level: user.level}, process.env.JWT_SECRET as string, { expiresIn: '1h' }); // Gera um token com o id e o nível do usuário (expira em 1 hora)
            res.json({ token }); // Retorna o token gerado em formato JSON
        } else {
            res.status(401).send('Invalid credentials'); // Se o usuário não for encontrado ou a senha estiver incorreta, retorna um erro 401 (Unauthorized)
        }
    } catch (error) {
        res.status(500).send('Error logging in'); // Se ocorrer um erro, retorna um erro 500 (Internal Server Error)
    }
}

export const generateCsv = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find(); // Busca todos os usuários na coleção
        let csv = 'name;email;level\n'; 
        users.forEach(user => {
            csv += `${user.name};${user.email};${user.level}\n`;
        });
        res.attachment('users.csv').send(csv); // Anexa o arquivo CSV e envia como resposta
    } catch (error) {
        res.status(500).send('Error generating CSV'); // Se ocorrer um erro, retorna um erro 500 (Internal Server Error)
    }
}
