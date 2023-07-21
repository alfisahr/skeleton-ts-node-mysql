import { AppDataSource } from '../database';
import { Request, Response } from 'express';
import catchAsync from '../middleware/catchAsync';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Category } from '../entity/Category';
import { UpdateResult } from 'typeorm';

class CategoryController {
   public getAll = async (req: Request, res: Response): Promise<Response> => {
      let categories: Category[];

      try {
         categories = await AppDataSource.getRepository(Category).find({
            order: {
               id: 'ASC',
            },
         });
         categories = instanceToPlain(categories) as Category[];

         return res.status(200).json({
            success: true,
            data: categories,
         });
      } catch (err: any) {
         return res.status(500).json({
            success: false,
            message: err.message,
         });
      }
   };

   public create = catchAsync(
      async (req: Request, res: Response): Promise<Response> => {
         const newCategory = new Category();
         newCategory.name = req.body.name;
         newCategory.slug = req.body.slug;
         newCategory.description = req.body.description;

         let category: Category;

         category = await AppDataSource.getRepository(Category).save(
            newCategory
         );
         // Convert category instance to object
         category = instanceToPlain(category) as Category;
         return res.status(201).json({
            success: true,
            data: category,
         });
      }
   );

   public async update(req: Request, res: Response): Promise<Response> {
      let category: Category | null;

      try {
         category = await AppDataSource.getRepository(Category).findOne({
            where: {
               id: req.body.id,
            },
         });
      } catch (err) {
         return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!category) {
         return res.status(400).json({
            error: `The post with the given ID doesn't exist`,
         });
      }

      let updatedCategory: UpdateResult;

      try {
         updatedCategory = await AppDataSource.getRepository(Category).update(
            req.body.id,
            plainToInstance(Category, {
               title: req.body.title,
               content: req.body.content,
            })
         );
         updatedCategory = instanceToPlain(updatedCategory) as UpdateResult;

         return res.status(200).json(updatedCategory);
      } catch (err) {
         return res.status(500).json({
            error: 'Internal Server Error',
         });
      }
   }

   public async remove(req: Request, res: Response) {
      let category: Category | null;

      try {
         category = await AppDataSource.getRepository(Category).findOne({
            where: {
               id: req.body.id,
            },
         });
      } catch (err) {
         return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!category) {
         return res.status(400).json({
            error: `The category with the given ID doesn't exist`,
         });
      }

      try {
         await AppDataSource.manager.remove(category);
         return res.status(200).json({
            success: true,
            message: `Category ${req.body.id} successfully removed.`,
         });
      } catch (err) {
         return res.status(500).json({ error: 'Internal Server Error' });
      }
   }
}

export const categoryController = new CategoryController();
