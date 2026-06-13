import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

const hasRole = (user, roleName) => {
    return user.roles?.some(role => role.name === roleName);
};

const hasOneOfRoles = (user, allowedRoles = []) => {
    return user.roles?.some(role => allowedRoles.includes(role.name));
};

const requireResourceAccess = (
    Model,
    options = {}
) => {
    const {
        paramName = 'id',
        ownerField = 'owner',
        organizationField = 'organization',
        allowOwner = true,
        allowOrganizationRoles = [],
        allowPlatformAdmin = true,
        resourceRequestKey = 'resource',
    } = options;

    return catchAsync(async (req, res, next) => {
        if (!req.user) {
            throw new AppError('Authentication required.', 401);
        }

        const resourceId = req.params[paramName];

        if (!resourceId) {
            throw new AppError('Resource id is required.', 400);
        }

        const resource = await Model.findById(resourceId);

        if (!resource) {
            throw new AppError('Resource not found.', 404);
        }

        if (
            allowPlatformAdmin &&
            hasRole(req.user, 'platform_admin')
        ) {
            req[resourceRequestKey] = resource;
            return next();
        }

        const resourceOwnerId = resource[ownerField];

        const isOwner =
            allowOwner &&
            resourceOwnerId &&
            resourceOwnerId.toString() === req.user._id.toString();

        if (isOwner) {
            req[resourceRequestKey] = resource;
            return next();
        }

        const resourceOrganizationId = resource[organizationField];
        const userOrganizationId = req.user.organization;

        const sameOrganization =
            resourceOrganizationId &&
            userOrganizationId &&
            resourceOrganizationId.toString() === userOrganizationId.toString();

        const hasAllowedOrganizationRole = hasOneOfRoles(
            req.user,
            allowOrganizationRoles
        );

        if (
            sameOrganization &&
            hasAllowedOrganizationRole
        ) {
            req[resourceRequestKey] = resource;
            return next();
        }

        throw new AppError('Access denied.', 403);
    });
};

export default requireResourceAccess;