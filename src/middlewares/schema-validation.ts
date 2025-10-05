import type { RequestHandler } from 'express';
import { z, parse } from 'zod';

const schemaValidation: <T extends z.ZodType>(schema: T) => RequestHandler =
(schema) => async (req, res, next) => {
    const { body } = req;
    try {
        parse(schema, body)
        return next();
    } catch (err) {
        next(err);
    }
}

export default schemaValidation;