import User from '../models/auth/User.model.js';
import RefreshToken from '../models/auth/RefreshToken.model.js';

import AppError from '../utils/appError.js';

import {
    signAccessToken,
    signRefreshToken,
} from '../utils/genereteAccessToken.js';

import {
    hashToken,
    generateFamilyId,
} from '../utils/crypto.js';

const getRefreshTokenExpiresAt = () => {
    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 30);

    return expiresAt;
};

export const login = async ({ email, password, req }) => {
    const user = await User
        .findOne({ email })
        .select('+password');

    if (!user) {
        throw new AppError('Invalid credentials.', 401);
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new AppError('Invalid credentials.', 401);
    }

    if (user.status !== 'active') {
        throw new AppError('User account is not active.', 403);
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    await RefreshToken.create({
        user: user._id,
        tokenHash: hashToken(refreshToken), // Hash en base
        familyId: generateFamilyId(),
        expiresAt: getRefreshTokenExpiresAt(),
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
    });
    await User.updateOne(
        { _id: user._id },
        {
            $set: {
                lastLogin: new Date(),
                lastActivityAt: new Date(),
            },
        },
    );

    // Retrait du mot de passe avant retour explicite (En prinicpe non renvoyé)
    user.password = undefined;

    return {
        user,
        tokens: {
            accessToken,
            refreshToken,
        },
    };
};