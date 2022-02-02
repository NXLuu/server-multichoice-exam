import express from 'express';
import { getUser, postUser } from '../controllers/user.controller.js';
let router = express.Router();

router.get('/', getUser);
router.post('/', postUser);

export default router;