import { Request, Response, NextFunction } from 'express';
import UsersService from '../services/UsersService';

export default class UsersController {
  usersService;

  constructor() {
    this.usersService = new UsersService();
  }

  finsOne = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const users = await this.usersService.findOne({ email, password });
      res.status(200).json(users);
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
