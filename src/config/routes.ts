import { Request, Response, Router } from 'express';
import { postController } from '../controllers/PostController';

const router = Router();

router.get('/', (req, res) => {
   res.send(`<h1>Wahai Universe</h1>`);
});

router.get('/posts', (req: Request, res: Response) => {
   postController.getAll();
});

router.post('/posts', postController.create);

export default router;
