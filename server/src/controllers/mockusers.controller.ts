import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';

class UsersController {
  public userService = new userService();

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //const userId: string = req.params.id;
      //const findOneUserData: User = await this.userService.findUserById(userId);
      const x: User = { email: '1' };
      // [
      //   {
      //     /// declare user input
      //   }
      // ];

      //return
      res.status(200).json({ data: x, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //const userData: CreateUserDto = req.body;
      //const createUserData: User = await this.userService.createUser(userData);
      const x: User = { email: '1' };
      // [
      //   {
      //     /// declare user input
      //   }
      // ];

      res.status(201).json({ data: x, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public enrollUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      //const userData: CreateUserDto = req.body;
      //const enrollUserData: User = await this.userService.enrollUser(userId, userData)
      const x: User = { email: '1' };
      // [
      //   {
      //     /// declare user input
      //     // Name: abc
      //     // Email: xyz
      //     // Password: xyz
      //     // Role: xyz
      //   }
      // ];

      //return
      res.status(201).json({ data: x, message: 'enrolled' });
    } catch (error) {
      next(error);
    }
  };
}
