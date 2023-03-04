import { Router } from 'express';
import LeaderboardsController from '../controllers/LeaderboardsController';

const leaderboardsRouter = Router();

const leaderboardsController = new LeaderboardsController();

leaderboardsRouter.get('/home', leaderboardsController.homeLeaderboard);
leaderboardsRouter.get('/away', leaderboardsController.awayLeaderboard);

export default leaderboardsRouter;
