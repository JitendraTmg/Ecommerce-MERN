import express from 'express';
import { signUp, verify } from '../controllers/userController.js';

const router = express.Router();

router.post('/signUp', signUp);
router.get('/verify', verify);


export default router;