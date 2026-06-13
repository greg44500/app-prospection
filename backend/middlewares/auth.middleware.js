import User from '../models/auth/User.model.js';

import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { verifyAccessToken } from '../utils/jwt.js';

const auth = catchAsync(async (req, res, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        throw new AppError('Authentication required.', 401);
    }

    const payload = verifyAccessToken(token);

    const user = await User
        .findById(payload.sub)
        .populate('roles');

    if (!user) {
        throw new AppError('User not found.', 401);
    }

    if (user.status !== 'active') {
        throw new AppError('Account is not active.', 403);
    }

    req.user = user;

    next();
});

export default auth;