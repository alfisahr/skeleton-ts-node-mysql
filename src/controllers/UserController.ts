import { AppDataSource } from '../database';
import { User } from '../entity/User';
import { Request, Response } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UpdateResult } from 'typeorm';
import catchAsync from '../middleware/catchAsync';

class UserController {
   public getAll = catchAsync(
      async (req: Request, res: Response): Promise<Response> => {
         let users: User[];

         users = await AppDataSource.getRepository(User).find({
            order: {
               id: 'ASC',
            },
         });
         users = instanceToPlain(users) as User[];

         return res.status(200).json({
            success: true,
            data: users,
         });
      }
   );

   public create = catchAsync(
      async (req: Request, res: Response): Promise<Response> => {
         const newUser = new User();
         newUser.name = req.body.name;
         newUser.email = req.body.email;
         newUser.gender = req.body.gender;
         newUser.password = req.body.password;
         newUser.isActive = req.body.isActive;

         let user: User;

         user = await AppDataSource.getRepository(User).save(newUser);
         // Convert user instance to object
         user = instanceToPlain(user) as User;
         return res.status(201).json({
            success: true,
            data: user,
         });
      }
   );

   public update = catchAsync(
      async (req: Request, res: Response): Promise<Response> => {
         let user: User | null;

         try {
            user = await AppDataSource.getRepository(User).findOne({
               where: {
                  id: req.body.id,
               },
            });
         } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
         }

         if (!user) {
            return res.status(400).json({
               error: `The user with the given ID doesn't exist`,
            });
         }

         let updatedUser: UpdateResult;

         updatedUser = await AppDataSource.getRepository(User).update(
            req.body.id,
            plainToInstance(User, {
               title: req.body.title,
               content: req.body.content,
            })
         );
         updatedUser = instanceToPlain(updatedUser) as UpdateResult;

         return res.status(200).json(updatedUser);
      }
   );

   public remove = catchAsync(async (req: Request, res: Response) => {
      let user: User | null;

      try {
         user = await AppDataSource.getRepository(User).findOne({
            where: {
               id: req.body.id,
            },
         });
      } catch (err) {
         return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!user) {
         return res.status(400).json({
            error: `The user with the given ID doesn't exist`,
         });
      }

      await AppDataSource.manager.remove(user);
      return res.status(200).json({
         success: true,
         message: `User ${req.body.id} successfully removed.`,
      });
   });
}

export const userController = new UserController();
