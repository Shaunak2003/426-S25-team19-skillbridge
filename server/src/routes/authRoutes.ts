import express from 'express';
import type { Request, Response } from 'express';
import { login, signup } from '../controllers/authController';

const router = express.Router();

router.post('/signup', (req: Request, res: Response) => {
  signup(req, res);
});

router.post('/login', (req: Request, res: Response) => {
  login(req, res);
});

export default router;
