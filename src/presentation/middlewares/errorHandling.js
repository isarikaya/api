import { HTTP_STATUS } from '#lib/http_status.js'
import { Prisma } from '#infrastructure/generated/prisma/index.js'

export default function errorHandlingMiddleware(err, req, res, next) {
  if (
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: HTTP_STATUS.BAD_REQUEST,
      message: 'something went wrong'
    })
  }

  err.statusCode = err.statusCode || HTTP_STATUS.NOT_FOUND
  return err.customMessage || err.message
    ? res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.customMessage || err.message
      })
    : res.status(err.statusCode).json({
        status: err.statusCode,
        message: 'something went wrong'
      })
}
