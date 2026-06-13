import AppError from '../utils/AppError.js';

const requireRole = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return next(
                new AppError(
                    'Authentication required.',
                    401
                )
            );
        }

        const userRoles = req.user.roles.map(
            role => role.name
        );

        const hasRole = allowedRoles.some(
            role => userRoles.includes(role)
        );

        if (!hasRole) {
            return next(
                new AppError(
                    'Insufficient role.',
                    403
                )
            );
        }

        next();
    };
};

export default requireRole;