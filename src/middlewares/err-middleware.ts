import type { ErrorRequestHandler } from 'express';
import { ZodError, treeifyError } from 'zod';

const errMiddleware: ErrorRequestHandler = async (error, req, res, next) => {
    if (error instanceof ZodError) {
        const err = treeifyError(error);
        console.error(`Error at: [${req.method}] ${req.url}`)
        console.error(JSON.stringify(err, null, 2));
        res.status(400).json({
            message: 'schema validation failed',
            err
        });
        return
    }
    res.status(500).json({ message: 'something went oopsy' })
}

export default errMiddleware;