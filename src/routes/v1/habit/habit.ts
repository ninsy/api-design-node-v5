import { Router, type Request } from 'express';
import { postSchema, type PostSchema } from './schema.ts';
import { schemaValidation } from '../../../middlewares/index.ts';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'habits' })
});

router.get(
    '/:id',
    async (req, res) => {
        res.status(200).json({ message: 'habit' })
    }
);

router.post(
    '/',
    [schemaValidation(postSchema)],
    async (req: Request<{}, {}, PostSchema>, res) => {
        const { body, headers } = req;
        res.status(201).json({ message: 'created habit' })
    }
);

router.delete('/', (req, res) => {
    res.status(200).json({ message: 'deleted habit' })
});

router.post('/:id/complete', (req, res) => {
    res.status(201).json({ message: 'completed habit' })
});

export default router;