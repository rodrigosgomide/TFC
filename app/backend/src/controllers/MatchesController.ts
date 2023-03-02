import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  matchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.matchesService.findAll();

      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  // roleInfo = async (req: Request, res: Response, _next: NextFunction) => {
  //   const { id } = req.params;
  //   const team = await this.matchesService.findById(Number(id));
  //   res.status(200).json(team);
  // };
}
