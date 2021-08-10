import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(error.message)

  if (error?.name === 'CastError' && error?.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error?.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

export { errorHandler }
