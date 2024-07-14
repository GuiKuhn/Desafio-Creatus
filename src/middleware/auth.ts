import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization'); // Busca o token no cabeçalho da requisição
    if (!token) {
        return res.status(401).send('Access Denied'); // Se não encontrar o token, retorna um erro 401 (Unauthorized)
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string); // Verifica o token
        req.body.user = verified; // Adiciona o usuário verificado ao corpo da requisição
        next(); // Chama a próxima função
    } catch (error) {
        res.status(400).send('Invalid Token'); // Se o token for inválido, retorna um erro 400 (Bad Request)
    }
}

export const checkLevel = (level: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user; // Pega o usuário do corpo da requisição
        if (user.level < level) {
            return res.status(403).send('You do not have permission'); // Se o nível do usuário for menor que o nível necessário, retorna um erro 403 (Forbidden)
        }
        next(); // Chama a próxima função
    }
}