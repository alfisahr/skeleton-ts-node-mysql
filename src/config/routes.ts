import { Request, Response, Router } from 'express';
import { postController } from '../controllers/PostController';
import { userController } from '../controllers/UserController';
import { categoryController } from '../controllers/CategoryController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
   res.send(`<h1>Wahai Universe</h1>`);
});

router.get('/posts', (req: Request, res: Response) => {
   postController.getAll();
});

router.post('/posts', postController.create);
router.put('/posts', postController.update);

router.post('/user', userController.create);

router.post('/category', categoryController.create);

export default router;
