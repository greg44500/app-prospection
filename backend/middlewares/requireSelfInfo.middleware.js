import AppError from '../utils/AppError.js';

const requireSelf = (
    paramName = 'userId',
    options = {}
) => {
    const {
        allowPlatformAdmin = false,
    } = options;

    return (req, res, next) => {
        if (!req.user) {
            return next(
                new AppError('Authentication required.', 401)
            );
        }

        const requestedUserId = req.params[paramName];

        if (!requestedUserId) {
            return next(
                new AppError('User id is required.', 400)
            );
        }

        const isSelf =
            requestedUserId.toString() === req.user._id.toString();

        const isPlatformAdmin = req.user.roles?.some(
            role => role.name === 'platform_admin'
        );

        if (!isSelf && !(allowPlatformAdmin && isPlatformAdmin)) {
            return next(
                new AppError('You can only access your own account.', 403)
            );
        }

        next();
    };
};

export default requireSelf;