import { Post } from '../entity/Post';
import { AppDataSource } from '../database';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

class PostController {
   constructor(private postRepository = AppDataSource.getRepository(Post)) {
   }

   public async getAll(): Promise<Post[]> {
      let posts: Post[];

      try {

         posts = await this.postRepository.find({
            order: {
               title: 'ASC',
            },
         });
      } catch (err) {
         console.log(err);
      }
   }

   public async create(req: Request, res: Response) {
      console.log(req.body);

      const newPost = new Post()
      newPost.title = req.body.title
      newPost.content = req.body.content

      let post: Post;

      try {
         post = await AppDataSource.getRepository(Post).save(newPost)

         // Convert post instance to object
         post = instanceToPlain(post) as Post;
         res.status(201).json({
            success: true,
            data: post,
         });
      } catch (err) {
         console.log(err);
         res.status(400).json({
            success: false,
         });
      }
   }
}

export const postController = new PostController();