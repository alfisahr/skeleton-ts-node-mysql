import { AppDataSource } from '../database';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { Category } from '../entity/Category';

class CategoryController {
   constructor(private categoryRepository = AppDataSource.getRepository(Category)) {
   }

   public async create(req: Request, res: Response): Promise<Response> {
      const newCategory = new Category();
      newCategory.name = req.body.name;
      newCategory.slug = req.body.slug;
      newCategory.description = req.body.description;

      let category: Category;

      try {
         category = await AppDataSource.getRepository(Category).save(newCategory);
         // Convert category instance to object
         category = instanceToPlain(category) as Category;
         return res.status(201).json({
            success: true,
            data: category,
         });
      } catch (err) {
         console.log(err);
         return res.status(400).json({
            success: false,
         });
      }
   }
}

export const categoryController = new CategoryController();