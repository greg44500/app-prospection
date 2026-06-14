import * as authService from '../services/auth.service.js';

const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
};

const setAuthCookies = (res, tokens) => {
    res.cookie('accessToken', tokens.accessToken, {
        ...authCookieOptions,
        maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
        ...authCookieOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

const sanitizeUser = (user) => ({
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    organization: user.organization,
    roles: user.roles,
    status: user.status,
    provider: user.provider,
});

export const login = async (req, res) => {
    const { user, tokens } = await authService.login({
        email: req.validated.body.email,
        password: req.validated.body.password,
        req,
    });

    setAuthCookies(res, tokens);

    return res.status(200).json({
        status: 'success',
        message: 'Login successful.',
        data: {
            user: sanitizeUser(user),
        },
    });
};