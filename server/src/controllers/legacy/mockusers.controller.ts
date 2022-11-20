// import { NextFunction, Request, Response } from 'express';
// import { User } from '@interfaces/users.interface';
// import userService from '@services/users.service';

// export class UsersController {
//   public userService = new userService();

//   public getUserById = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       //const userId: string = req.params.id;
//       //const findOneUserData: User = await this.userService.findUserById(userId);

//       //return
//       res.status(200).json({ data: x, message: 'findOne' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public createUser = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       //const userData: CreateUserDto = req.body;
//       //const createUserData: User = await this.userService.createUser(userData);

//       res.status(201).json({ data: x, message: 'created' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public enrollUser = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const userId: string = req.params.id;
//       //const userData: CreateUserDto = req.body;
//       //const enrollUserData: User = await this.userService.enrollUser(userId, userData)

//       //return
//       res.status(201).json({ data: x, message: 'enrolled' });
//     } catch (error) {
//       next(error);
//     }
//   };
// }
