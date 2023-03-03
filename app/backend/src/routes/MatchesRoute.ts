import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import JTWvalidation from '../middlewares/JWTvalidation';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.findAll);
matchesRouter.patch('/:id/finish', JTWvalidation, matchesController.finishById);
matchesRouter.patch('/:id', JTWvalidation, matchesController.updateById);
matchesRouter.post('/', matchesController.insertMatch);

export default matchesRouter;
