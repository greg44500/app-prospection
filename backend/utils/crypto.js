import crypto from 'crypto';

/**
 * Génère un token aléatoire sécurisé.
 * Utile pour : reset password, email verification, token temporaire.
 */
export const generateRandomToken = (size = 32) => {
    return crypto
        .randomBytes(size)
        .toString('hex');
};

/**
 * Hash un token avant stockage en base.
 * Utile pour ne jamais stocker un refresh token brut.
 */
export const hashToken = (token) => {
    return crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
};

/**
 * Génère un identifiant de famille de refresh tokens.
 * Ce n’est pas un secret, seulement un identifiant de suivi.
 */
export const generateFamilyId = () => {
    return crypto.randomUUID();
};