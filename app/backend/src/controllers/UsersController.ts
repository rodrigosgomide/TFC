import { Request, Response, NextFunction } from 'express';
import UsersService from '../services/UsersService';

export default class UsersController {
  usersService;

  constructor() {
    this.usersService = new UsersService();
  }

  login = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
      const token = this.usersService.login(email);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

//   findById = async (req: Request, res: Response, _next: NextFunction) => {
//     const { id } = req.params;
//     const team = await this.usersService.findById(Number(id));
//     res.status(200).json(team);
//   };
}
