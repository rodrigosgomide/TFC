import IUsers from '../interfaces/IUsers';
import Users from '../database/models/UsersModel';

export default class UsersService {
  model;

  constructor() {
    this.model = Users;
  }

  async findOne(user: IUsers): Promise<IUsers | null> {
    const userInfo = await this.model.findOne({
      where: {
        email: user.email,
        password: user.password,
      },
    });

    return userInfo;
  }

//   async findById(id: number): Promise<IUsers | null> {
//     const users = await this.model.findByPk(id);
//     return users;
//   }
}
