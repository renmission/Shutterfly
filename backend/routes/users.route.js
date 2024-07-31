import { Router } from 'express';
import { getUsers, updateUser } from '../controllers/users.controller.js';
import { protect } from '../controllers/auth.controller.js';
const router = Router();

router.get('/', getUsers);
router.put('/update/:id', protect, updateUser);

export default router;