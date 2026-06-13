import AppError from '../utils/AppError.js';

const requirePermission = (...requiredPermissions) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(
                new AppError('Authentication required.', 401)
            );
        }

        const userPermissions = req.user.roles
            ?.flatMap(role => role.permissions || [])
            .map(permission => permission.name) || [];

        // Oblige d'avoir toutes les permissions sinon utliser 'some'
        const hasPermission = requiredPermissions.every(
            permission => userPermissions.includes(permission)
        );

        if (!hasPermission) {
            return next(
                new AppError('Insufficient permission.', 403)
            );
        }

        next();
    };
};

export default requirePermission;