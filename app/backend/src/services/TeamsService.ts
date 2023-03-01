import ITeams from '../interfaces/ITeams';
import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  model;

  constructor() {
    this.model = Teams;
  }

  async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeams | null> {
    const teams = await this.model.findByPk(id);
    return teams;
  }
}
