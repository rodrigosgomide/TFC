import { Router } from 'express';
import teamsRouter from './TeamsRoute';
import usersRouter from './UsersRoute';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/users', usersRouter);

export default router;
