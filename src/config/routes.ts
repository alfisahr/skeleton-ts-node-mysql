import { Request, Response, Router } from 'express';
import { postController } from '../controllers/PostController';
import { userController } from '../controllers/UserController';
import { categoryController } from '../controllers/CategoryController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
   res.send(`<h1>Wahai Universe</h1>`);
});

router.get('/posts', postController.getAll);
router.post('/posts', postController.create);
router.put('/posts', postController.update);
router.delete('/posts', postController.remove);

router.post('/user', userController.create);
router.put('/user', userController.update);
router.delete('/user', userController.remove);
router.get('/user', userController.getAll);

router
   .post('/category', categoryController.create)
   .put('/category', categoryController.update)
   .delete('/category', categoryController.remove)
   .get('/category', categoryController.getAll);

export default router;
