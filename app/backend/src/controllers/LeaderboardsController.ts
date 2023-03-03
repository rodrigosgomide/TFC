import { Request, Response, NextFunction } from 'express';
import LeaderboardsService from '../services/LeaderboardsService';

export default class LeaderboardsController {
  leaderboardsService;

  constructor() {
    this.leaderboardsService = new LeaderboardsService();
  }

  homeLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeLeaderboard = await this.leaderboardsService.homeLeaderboard();
      return res.status(200).json(homeLeaderboard);
    } catch (error) {
      next(error);
    }
  };
}
