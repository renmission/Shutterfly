import { Router } from 'express';
import { deleteUser, getUsers, updateUser } from '../controllers/users.controller.js';
import { protect } from '../controllers/auth.controller.js';
const router = Router();

router.get('/', getUsers);
router.put('/update/:id', protect, updateUser);
router.delete('/delete/:id', deleteUser);

export default router;