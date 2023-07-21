import { Post } from '../entity/Post';
import { AppDataSource } from '../database';
import { Request, Response } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UpdateResult } from 'typeorm';

class PostController {
   public async getAll(req: Request, res: Response): Promise<Response> {
      let posts: Post[];

      try {
         posts = await AppDataSource.getRepository(Post).find({
            order: {
               id: 'ASC',
            },
         });
         posts = instanceToPlain(posts) as Post[];

         return res.status(200).json({
            success: true,
            data: posts,
         });
      } catch (err: any) {
         return res.status(500).json({
            success: false,
            message: err.message,
         });
      }
   }

   public async create(req: Request, res: Response): Promise<Response> {
      const newPost = new Post();
      newPost.categories = req.body.categories.map((id: string) => ({ id }));
      newPost.title = req.body.title;
      newPost.excerpt = req.body.excerpt;
      newPost.content = req.body.content;
      newPost.author = req.body.author;
      newPost.isPublished = req.body.isPublished;

      let post: Post;

      try {
         post = await AppDataSource.getRepository(Post).save(newPost);

         // Convert post instance to object
         post = instanceToPlain(post) as Post;
         return res.status(201).json({
            success: true,
            data: post,
         });
      } catch (err) {
         console.log(err);
         return res.status(400).json({
            success: false,
         });
      }
   }

   public async update(req: Request, res: Response): Promise<Response> {
      let post: Post | null;

      try {
         post = await AppDataSource.getRepository(Post).findOne({
            where: {
               id: req.body.id,
            },
         });
      } catch (err) {
         return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!post) {
         return res.status(400).json({
            error: `The post with the given ID doesn't exist`,
         });
      }

      let updatedPost: UpdateResult;

      try {
         updatedPost = await AppDataSource.getRepository(Post).update(
            req.body.id,
            plainToInstance(Post, {
               title: req.body.title,
               content: req.body.content,
            })
         );
         updatedPost = instanceToPlain(updatedPost) as UpdateResult;

         return res.status(200).json(updatedPost);
      } catch (err) {
         return res.status(500).json({
            error: 'Internal Server Error',
         });
      }
   }

   public async remove(req: Request, res: Response) {
      let post: Post | null;

      try {
         post = await AppDataSource.getRepository(Post).findOne({
            where: {
               id: req.body.id,
            },
         });
      } catch (err) {
         return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!post) {
         return res.status(400).json({
            error: `The post with the given ID doesn't exist`,
         });
      }

      let removedPost: Post;

      try {
         await AppDataSource.manager.remove(post);
         return res.status(200).json({
            success: true,
            message: `Post ${req.body.id} successfully removed.`,
         });
      } catch (err) {
         return res.status(500).json({ error: 'Internal Server Error' });
      }
   }
}

export const postController = new PostController();
