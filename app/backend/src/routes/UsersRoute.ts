import { Router } from 'express';
import UserValidation from '../middlewares/UserValidation';
import UsersController from '../controllers/UsersController';
import JTWvalidationWithRole from '../middlewares/JWTvalidationWithRole';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', UserValidation, usersController.login);
usersRouter.get('/role', JTWvalidationWithRole, usersController.roleInfo);

export default usersRouter;
