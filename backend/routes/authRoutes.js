import { Router } from 'express';
import { signup, login } from '../controllers/authController.js';
const router = Router();

// signup and login routes
router.post('/signup', signup);
router.post('/login', login);

export default router;
