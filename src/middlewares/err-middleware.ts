import type { ErrorRequestHandler } from 'express';

const errMiddleware: ErrorRequestHandler = async (error, req, res, next) => {
    console.error(`Unhandled error at: [${req.method}] ${req.url}`)
    console.error(error);
    res.status(500).json({ message: 'something went oopsy' })
}

export default errMiddleware;