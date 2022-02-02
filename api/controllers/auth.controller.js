import { verifyToken, generateToken } from '../../helpers/jwt.helper.js';
import User from '../../models/user.model.js';
import sha1 from 'sha1';
import Token from '../../models/token.model.js';
import dotenv from 'dotenv';
dotenv.config();

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1h';
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'access-token';
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '5d';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-token';
export async function login(req, res) {
    const { email, password } = req.body;
    User.findOne({
        'email': email,
        'password': sha1(password)
    }, async (err, user) => {
        if (!user) {
            return res.status(404).send('Not found user');
        }
        console.log(user);
        try {
            const accessToken = await generateToken(user, accessTokenSecret, accessTokenLife);
            const refreshToken = await generateToken(user, refreshTokenSecret, refreshTokenLife);

            const refreshTokenDb = new  Token({
                expireAt: new Date(),
                token: refreshToken
            });

            refreshTokenDb.save();

            return res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            return res.status(500).json(error);
        }
    });
};

export async function refreshToken(req, res) {
    const refreshTokenFromUser = req.body.token || req.query.token || req.headers["x-access-token"];
    Token.findOne({
        token: refreshTokenFromUser
    },async (error, token) => {
        if (error) return console.log(error);
        if (!token || !refreshTokenFromUser) return res.status(403).send('No token provided');
        try {
            const decoded = await verifyToken(refreshTokenFromUser,refreshTokenSecret); 
            const userData = decoded.data;
            const accessToken = await generateToken(userData, accessTokenSecret, accessTokenLife); 

            return res.status(200).json({accessToken});
        } catch (error) {
            return res.status(403).send('Invalid refresh token');
        }
    });
}
