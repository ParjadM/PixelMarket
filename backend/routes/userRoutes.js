import express from 'express';
const router = express.Router();
import { registerUser, authUser, getAllUsers, deleteUser, updateUser, getUserById } from '../controllers/userController.js';

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
