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
      const result = await this.authService.register(userData);

      const options = {
        maxAge: result.cookie.expiresIn * 1000, // would expire after 15 minutes
        httpOnly: true // The cookie only accessible by the web server
      };

      res.cookie('muess', result.cookie.token, options);
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
      const result = await this.authService.login(userData);

      const options = {
        maxAge: result.cookie.expiresIn * 1000, // would expire after 15 minutes
        httpOnly: true // The cookie only accessible by the web server
      };
      res.cookie('muess', result.cookie.token, options);
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
      res.clearCookie('muess');
      res.status(200).json({ message: 'logout successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
