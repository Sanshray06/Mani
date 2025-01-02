import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { addComment, getComments } from '../controller/commentController.js';


const commentRouter = express.Router();
commentRouter.post('/comment',addComment);
commentRouter.get("/comment/:productId", getComments)

export default commentRouter