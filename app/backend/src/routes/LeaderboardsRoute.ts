import { Router } from 'express';
import LeaderboardsController from '../controllers/LeaderboardsController';

const leaderboardsRouter = Router();

const leaderboardsController = new LeaderboardsController();

leaderboardsRouter.get('/home', leaderboardsController.homeLeaderboard);
// teamsRouter.get('/:id', LeaderboardsController.findById);

export default leaderboardsRouter;
