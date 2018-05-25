import express from 'express';
import jwt from 'jsonwebtoken';

export const requestLogin = (req, res) => {
    const body = req.body,
            { username, password } = body;
            let token = jwt.sign(
                {
                    username,
                    avatar: 'https://static.planetminecraft.com/files/resource_media/screenshot/1553/519053965_c_680_6809726182_lrg.jpg',
                    isAdmin: true
                },
                'codigosupersecreto'
            );
            res.status(200).json({'token': token});
};

export default () => {
    return () => {
        const router = express.Router();

        router.post(
            '/login',
            requestLogin
        );

        return router;
    };
};
