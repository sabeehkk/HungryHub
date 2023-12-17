import express from 'express';
import { addMessage, getMessage } from '../controller/chat/messageController.js';

const router = express();

router.post('/', addMessage);
router.get('/:chatId', getMessage)

export default router;
