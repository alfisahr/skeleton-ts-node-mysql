import { Request, Response, Router } from 'express';
import { postController } from '../controllers/PostController';
import { userController } from '../controllers/UserController';
import { categoryController } from '../controllers/CategoryController';
import AppError from '../middleware/appError';

const router = Router();

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

router.route('/').get((req, res) => {
   res.status(200).send('<h1>Hello universe</h1>');
});

router.route('*').all((req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

export default router;
