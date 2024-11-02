import { BadRequestError, ConflictError, NotFoundError, ServerError, UnauthenticatedError, ValidationError, TooManyRequestsError, UnauthorizedError } from "../../lib/error-definitions.js";

export default function (err, req, res, next)
{
    if(err instanceof NotFoundError ||
         err instanceof BadRequestError ||
          err instanceof ConflictError || err instanceof UnauthenticatedError || err instanceof UnauthorizedError || err instanceof ServerError || err instanceof TooManyRequestsError)
        {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
            });
        }

        if(err instanceof ValidationError)
        {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
                error: err.error,
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message,
        });
}