import { Request, Response, NextFunction } from 'express';
import LeaderboardsService from '../services/LeaderboardsService';

export default class LeaderboardsController {
  leaderboardsService;

  constructor() {
    this.leaderboardsService = new LeaderboardsService();
  }

  homeLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const homeLeaderboard = await this.leaderboardsService.leaderboardGenerator('homeTeam');
      return res.status(200).json(homeLeaderboard);
    } catch (error) {
      next(error);
    }
  };

  awayLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const awayLeaderboard = await this.leaderboardsService.leaderboardGenerator('awayTeam');
      return res.status(200).json(awayLeaderboard);
    } catch (error) {
      next(error);
    }
  };
}
