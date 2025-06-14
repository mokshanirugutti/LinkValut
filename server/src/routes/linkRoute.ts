import { Router } from 'express';
import { createLink, deleteLink, getLinksByUser } from '../handles/handleLinks';
import { authMiddleware, validateLink } from '../middleware/middlewares';

const router = Router();


router.get('/', authMiddleware, getLinksByUser);
router.post('/', authMiddleware, validateLink, createLink);
router.delete('/:id', authMiddleware, deleteLink);

export default router;