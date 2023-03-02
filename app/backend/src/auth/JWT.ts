import jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'cruzeirao_cabuloso';

export default function tokenGenerator(email: string) {
  const token = jwt.sign({ data: { email } }, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
  return token;
}
