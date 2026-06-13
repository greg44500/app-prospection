
// Permet d'alléger la structure du permission.middleware
export const hasPermission = (
    user,
    permission
) => {
    if (!user) {
        return false;
    }
    if (!user.role) {
        return false;
    }
    return user.role.permissions.some(
        p => p.code === permission
    );
};