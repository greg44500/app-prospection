import jwt from 'jsonwebtoken';
import env from '../src/env.js'

const generateAccessToken = (user) => {
    return jwt.sign({
        userId: user._id.toString(),
        organizationId: user.organization?.toString(),
    },
        env.JWT_ACCESS_SECRET,
        { expiresIn: env.JWT_ACCESS_EXPIRES_IN })
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user._id.toString(),
            tokenVersion: user.tokenVersion ?? 0,
        },
        env.JWT_REFRESH_SECRET,
        {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        }
    );
};

const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        env.JWT_ACCESS_SECRET
    );
};

const verifyRefreshToken = (token) => {
    return jwt.verify(
        token,
        env.JWT_REFRESH_SECRET
    );
};

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};