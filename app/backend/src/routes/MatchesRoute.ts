import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import JTWvalidation from '../middlewares/JWTvalidation';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.findAll);
matchesRouter.patch('/:id/finish', JTWvalidation, matchesController.updateById);

export default matchesRouter;
