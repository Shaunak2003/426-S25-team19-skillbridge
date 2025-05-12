// src/routes/userRoutes.ts
import express from 'express';
import { getUsers} from './controller';
import { getUserInterests } from './controller';

const router = express.Router();

router.get('/', getUsers);
//router.post('/', createUser);
router.get('/interests/:id', getUserInterests);

export default router;
