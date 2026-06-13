const normalizeId = (value) => { // Normalise les Id MongoDb en string
    if (!value) {
        return null;
    }

    if (typeof value === 'string') {
        return value;
    }

    if (value._id) {
        return value._id.toString();
    }

    return value.toString();
};

export const isSameId = (firstId, secondId) => {
    return normalizeId(firstId) === normalizeId(secondId);
};

export const isOwner = (user, resource) => {
    if (!user || !resource) {
        return false;
    }

    return isSameId(resource.owner, user._id);
};

export const belongsToOrganization = (user, resource) => {
    if (!user || !resource) {
        return false;
    }

    return isSameId(
        resource.organization,
        user.organization
    );
};

export const canAccessOwnedResource = (user, resource) => {
    if (!user || !resource) {
        return false;
    }

    return (
        isOwner(user, resource) ||
        belongsToOrganization(user, resource)
    );
};