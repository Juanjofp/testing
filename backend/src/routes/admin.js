import express from 'express';
import jwt from 'jsonwebtoken';
import * as storage from '../helpers/storage';

export const requestLogin = async (req, res) => {
    console.log('Login', req.body);
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(422).json({code: 422, message: 'Invalid credentials'});
        return;
    }

    const isValidUser = await storage.validateUser(username, password);
    if (isValidUser) {
        let token = jwt.sign(
            {
                username,
                avatar:
                    'https://static.planetminecraft.com/files/resource_media/screenshot/1553/519053965_c_680_6809726182_lrg.jpg',
                isAdmin: true,
            },
            'codigosupersecreto',
        );
        res.status(200).json({token: token});
        return;
    }
    res.status(404).json({code: 404, message: 'Password do not match'});
};

export const requestRegister = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(412).json({code: 412, message: 'Invalid credentials'});
        return;
    }

    try {
        const saved = await storage.saveUser(username, password);
        let token = jwt.sign(
            {
                username,
                avatar:
                    'https://static.planetminecraft.com/files/resource_media/screenshot/1553/519053965_c_680_6809726182_lrg.jpg',
                isAdmin: true,
            },
            'codigosupersecreto',
        );
        res.status(200).json({token: token});
        return;
    }
    catch (error) {
        res.status(412).json({code: 412, message: error.message});
    }
};

export default () => {
    return () => {
        const router = express.Router();

        router.post('/login', requestLogin);

        router.post('/register', requestRegister);

        return router;
    };
};
