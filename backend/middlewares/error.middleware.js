//A utiliser sur TOUTES les Routes
import AppError from '../utils/AppError.js';

const handleCastErrorDB = (error) => {
    return new AppError(
        `Invalid ${error.path}: ${error.value}.`,
        400
    );
};

const handleDuplicateFieldsDB = (error) => {
    const duplicatedField = Object.keys(error.keyValue || {})[0];

    return new AppError(
        `${duplicatedField} already exists.`,
        409
    );
};

const handleValidationErrorDB = (error) => {
    const errors = Object.values(error.errors || {}).map(
        err => err.message
    );

    return new AppError(
        'Invalid input data.',
        400,
        { errors }
    );
};

const handleJWTError = () => {
    return new AppError(
        'Invalid token.',
        401
    );
};

const handleJWTExpiredError = () => {
    return new AppError(
        'Token expired.',
        401
    );
};

const sendErrorDev = (error, res) => {
    res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message,
        stack: error.stack,
        error,
    });
};

const sendErrorProd = (error, res) => {
    if (error.isOperational) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
            ...(error.details && { details: error.details }),
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    });
};

const errorMiddleware = (
    error,
    req,
    res,
    next
) => {
    let err = error;

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.name === 'CastError') {
        err = handleCastErrorDB(err);
    }

    if (err.code === 11000) {
        err = handleDuplicateFieldsDB(err);
    }

    if (err.name === 'ValidationError') {
        err = handleValidationErrorDB(err);
    }

    if (err.name === 'JsonWebTokenError') {
        err = handleJWTError();
    }

    if (err.name === 'TokenExpiredError') {
        err = handleJWTExpiredError();
    }

    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, res);
    }

    sendErrorProd(err, res);
};

export default errorMiddleware;