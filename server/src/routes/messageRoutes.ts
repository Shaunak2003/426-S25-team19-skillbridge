import express from 'express';
import { getConversation, postMessage } from '../controllers/messageController';

const router = express.Router();

router.get('/:userId/:otherUserId', getConversation);  // fetch conversation
router.post('/', postMessage);  // send message

export default router;
