import express from 'express';
import { getConversation, postMessage } from './controller';

const router = express.Router();

router.get('/:userId/:otherUserId', getConversation);  
router.post('/', postMessage);  

export default router;
