import { Router } from 'express';
import { calcEfficiency } from '../ultis/calcStats';
import LeaderboardsController from '../controllers/LeaderboardsController';

const leaderboardsRouter = Router();

const leaderboardsController = new LeaderboardsController();

leaderboardsRouter.get('/home', leaderboardsController.homeLeaderboard);
leaderboardsRouter.get('/away', leaderboardsController.awayLeaderboard);
leaderboardsRouter.get('/', leaderboardsController.globalLeaderboard);
leaderboardsRouter.get('/teste', (req, res) => res.status(200).json(calcEfficiency(7, 3)));

export default leaderboardsRouter;
