// import jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UsersService from '../services/UsersService';

const secret = process.env.JWT_SECRET || 'cruzeirao_cabuloso';
const usersService = new UsersService();

export default async function JTWvalidationWithRole(
  req: Request,
  res: Response,
  next:NextFunction,
) {
  const token = req.header('Authorization');

  if (!token || token.length === 0) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await usersService.findByEmail({ email: decoded.data.email });

    req.body = { role: user?.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
