import { Router } from 'express';
import { signup, signin, signout, googleLogin } from '../controllers/auth.controller.js';
const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google-login', googleLogin);
router.get('/signout', signout);

export default router;