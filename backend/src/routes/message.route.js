import express from 'express';
import { deleteMessage, getConversations, getMessages, getMessage, sendMessage } from '../controllers/message.controllers.js';
import auth from '../middleware/auth.middleware.js';
import { get } from 'mongoose';


const messageRouter = express.Router();


messageRouter.post("/send", auth, sendMessage);
messageRouter.get('/chats', auth, getConversations);
messageRouter.get('/:userId', auth, getMessages);
messageRouter.get('/msg/:messageId', auth, getMessage);

messageRouter.delete('/:messageId', auth, deleteMessage);
export default messageRouter;