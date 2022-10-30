import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { CreateUserDTO, User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDTO = req.body;
      const result: { cookie: string; user: User } =
        await this.authService.register(userData);

      res.cookie('muess', result.cookie, { httpOnly: true });
      res
        .status(201)
        .json({ data: result.user, message: 'register successfully' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const result: { cookie: string; user: User } =
        await this.authService.login(userData);

      res.cookie('muess', result.cookie, { httpOnly: false });
      res
        .status(201)
        .json({ data: result.user, message: 'login successfully' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const cookie = await this.authService.logOut();

      res.cookie('muess', cookie, { httpOnly: false });
      res.status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
