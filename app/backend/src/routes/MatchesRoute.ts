import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.findAll);

export default matchesRouter;
