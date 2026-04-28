import express from 'express';
import { Login, signUp, verify } from '../controllers/userController.js';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/login', Login);
router.get('/verify', verify);


export default router;