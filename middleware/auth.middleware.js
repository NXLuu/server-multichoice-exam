import { verifyToken } from '../helpers/jwt.helper.js';
import dotenv from 'dotenv';
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export let isAuth = async (req, res, next) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

    if (tokenFromClient) {
        try {
            debugger;
            const decoded = await verifyToken(tokenFromClient, accessTokenSecret);
            req.jwtDecoded = decoded;
            console.log(decoded);
            res.locals.userId = decoded.data._id;
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
    }
    else {
        return res.status(403).send({
            message: 'No token found',
        });
    }
}
