import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { addComment } from '../controller/commentController.js';


const commentRouter = express.Router();
commentRouter.post('/comment',addComment);

export default commentRouter