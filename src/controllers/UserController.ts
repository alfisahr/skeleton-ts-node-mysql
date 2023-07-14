import { AppDataSource } from '../database';
import { User } from '../entity/User';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

class UserController {
   constructor(private userRepository = AppDataSource.getRepository(User)) {
   }

   public async create(req: Request, res: Response): Promise<Response> {
      const newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.gender = req.body.gender;
      newUser.password = req.body.password;
      newUser.isActive = req.body.isActive;

      let user: User;

      try {
         user = await AppDataSource.getRepository(User).save(newUser);
         // Convert user instance to object
         user = instanceToPlain(user) as User;
         return res.status(201).json({
            success: true,
            data: user,
         });
      } catch (err) {
         console.log(err);
         return res.status(400).json({
            success: false,
         });
      }
   }
}

export const userController = new UserController();