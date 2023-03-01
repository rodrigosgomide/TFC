import { Router } from 'express';
import UserValidation from '../middlewares/UserValidation';
// import UsersController from '../controllers/UsersController';

const usersRouter = Router();

// const usersController = new UsersController();

usersRouter.post('/', UserValidation);

export default usersRouter;
