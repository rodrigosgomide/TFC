import IUsers from '../interfaces/IUsers';
import Users from '../database/models/UsersModel';
import tokenGenerator from '../auth/JWT';

export default class UsersService {
  model;
  token: string;

  constructor() {
    this.model = Users;
    this.token = '';
  }

  async findByEmail(user: IUsers): Promise<IUsers | null> {
    const userInfo = await this.model.findOne({
      where: {
        email: user.email,
      },
    });

    return userInfo;
  }

  login(email: string): string {
    this.token = tokenGenerator(email);
    return this.token;
  }
}
