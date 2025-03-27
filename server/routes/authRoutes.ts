import { Router } from 'express';
import {
	login,
	logout,
	register,
	resetPassword,
	sendForgotPasswordEmail,
	sendVerificationEmail,
	verifyEmail,
} from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/email-verified', sendVerificationEmail);
router.put('/email-verified', verifyEmail);
router.post('/forgot-password', sendForgotPasswordEmail);
router.put('/reset-password', resetPassword);

export default router;
