import { Router } from 'express';
import { getUser, updateEmail, updatePassword } from '../controllers/userController';

const router = Router();

router.get('/', getUser);
router.put('/email', updateEmail);
router.put('/password', updatePassword);

export default router;
