import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  matchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    try {
      if (inProgress) {
        const matches = await this.matchesService.findByProgress(inProgress === 'true');
        return res.status(200).json(matches);
      }
      const matches = await this.matchesService.findAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const message = await this.matchesService.updateById(Number(id));
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  };
}
