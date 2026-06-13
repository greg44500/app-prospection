//Gère les limits des plans d'abonnement
export const hasReachedLimit = (
    currentValue,
    maxValue
) => {
    if (maxValue === null || maxValue === undefined) {
        return false;
    }

    return currentValue >= maxValue;
};

export const canCreateResource = (
    currentValue,
    maxValue
) => {
    return !hasReachedLimit(
        currentValue,
        maxValue
    );
};

export const getRemainingLimit = (
    currentValue,
    maxValue
) => {
    if (maxValue === null || maxValue === undefined) {
        return null;
    }

    return Math.max(
        maxValue - currentValue,
        0
    );
};