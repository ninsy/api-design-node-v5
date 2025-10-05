import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
    res.status(201).json({ message: 'registered' })
});

router.post('/login', (req, res) => {
    res.status(201).json({ message: 'logged in' })
});

export default router;