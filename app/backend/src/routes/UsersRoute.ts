import { Router } from 'express';
import UserValidation from '../middlewares/UserValidation';
import UsersController from '../controllers/UsersController';
import JTWvalidation from '../middlewares/JWTvalidation';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', UserValidation, usersController.login);
usersRouter.get('/role', JTWvalidation);

export default usersRouter;
