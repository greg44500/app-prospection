//Héritage de la calsse native JS 'Error'
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);//Appelle le constructeur et initialise err.message
        this.statusCode - statusCode;// Stocke le status (401,402,403,422,500...)
        this.status =
            `${statusCode}`.startsWith('4')
                ? 'fail'
                : 'error';

        this.isOperational = true; // Distingue les erreurs métier - Gestion avec le errorHandler

        Error.captureStackTrace(thisthis,
            this.constructor // Facilite la localisation de l'erreur
        );

    };
};

export default AppError;