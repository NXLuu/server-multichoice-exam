import  jwt  from 'jsonwebtoken'

export let generateToken = (user, secretSignature, tokenLife) => {
    return new Promise((res, rej) => {
        const userData = {
            _id: user._id.toString(),
        }

        jwt.sign(
            {data: userData},
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife
            },
            (error, token) => {
                if (error) {
                    return rej(error);
                }
                res(token);
            }
        );
    });
};


export let verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
};
