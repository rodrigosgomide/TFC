import { Request, Response, NextFunction } from 'express';
import bcrypt = require('bcryptjs');
import UsersService from '../services/UsersService';
import IUsers from '../interfaces/IUsers';

const usersService = new UsersService();

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

async function validatePassword(user: IUsers): Promise<boolean> {
  if (user.password && user.password.length >= 6) {
    const userInfo = await usersService.findByEmail(user);

    if (userInfo?.password) return bcrypt.compareSync(user.password, userInfo.password);
  }
  return false;
}

export default async function validateUserInfo(req: Request, res: Response, next:NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
  const isValidEmail = validateEmail(email);
  const isValidPassword = await validatePassword({ email, password });
  if (!isValidEmail || !isValidPassword) {
    return res.status(401).json(
      { message: 'Invalid email or password' },
    );
  }
  next();
}
