import express from 'express';
import { isAuth } from '../../middleware/auth.middleware.js';
import { login, refreshToken } from '../controllers/auth.controller.js';
import userRoute from '../../routes/user.route.js';
import { createExam, getDetialExam, getExam } from '../controllers/exam.controller.js';
import { postAnswer } from '../controllers/result.controller.js';
import { getUser, postUser } from '../../controllers/user.controller.js';
import { upload } from '../../server.js';
const router = express.Router();


export let initAPIs = (app) => {
    debugger;
    router.post('/users', upload.single('avatar'), postUser);
    router.post('/post-answer', postAnswer);
    router.post("/login", login);
    router.post("/refresh-token", refreshToken);
    router.use(isAuth);
    router.get('/users', getUser);
    router.get('/create-exam', createExam);
    router.get('/exam', getExam);
    router.get('/exam/:id', getDetialExam);
    return app.use(router);
}