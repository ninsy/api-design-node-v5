import type { RequestHandler } from 'express';
import { z, parse, ZodError, treeifyError } from 'zod';

// TODO: some plugin from express for zod?
const schemaValidation: <T extends z.ZodType>(schema: T) => RequestHandler =
(schema) => async (req, res, next) => {
    const { body } = req;
    try {
        const parsed = parse(schema, body)
        req.body = parsed;
        return next();
    } catch (err) {
        if (err instanceof ZodError) {
            const error = treeifyError(err);
            console.error(`Validation error at: [${req.method}] ${req.url}`)
            console.error(JSON.stringify(error, null, 2));
            return res.status(400).json({
                message: 'schema validation failed',
                err
            });
        }
        next(err);
    }
}

export default schemaValidation;