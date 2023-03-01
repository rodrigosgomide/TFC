import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter.get('/', teamsController.findAll);
teamsRouter.get('/:id', teamsController.findById);

export default teamsRouter;
