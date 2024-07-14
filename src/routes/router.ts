import express from 'express';
import { createUser, deleteUser, getUser, getUsers, loginAuth, updateUser, generateCsv } from '../controllers/userControllers';
import { authMiddleware, checkLevel } from '../middleware/auth';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/report', authMiddleware, checkLevel(4), generateCsv);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', loginAuth);


export default router;

