import { Router } from 'express';
import teamsRouter from './TeamsRoute';
import usersRouter from './UsersRoute';
import matchesRouter from './MatchesRoute';
import leaderboardsRouter from './LeaderboardsRoute';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardsRouter);

export default router;
