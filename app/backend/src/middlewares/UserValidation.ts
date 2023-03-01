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
  if (user.password.length >= 6) {
    const userInfo = await usersService.findOne(user);
    if (userInfo) return bcrypt.compareSync(user.password, userInfo.password);
  }
  return false;
}

export default function validateUserInfo(req: Request, res: Response, next:NextFunction) {
  const { email, password } = req.body;
  if (!email && !password) return res.status(401).json({ message: 'Invalid email or password' });
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword({ email, password });
  if (!isValidEmail || !isValidPassword) {
    return res.status(401).json(
      { message: 'Invalid email or password' },
    );
  }
  next();
}
