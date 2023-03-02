import ITeams from '../interfaces/ITeams';
import Matches from '../database/models/MatchesModel';
// import Teams from '../database/models/TeamsModel';

export default class MatchesService {
  model;

  constructor() {
    this.model = Matches;
  }

  async findAll(): Promise<ITeams[]> {
    const matches = await this.model.findAll();

    return matches;
  }

//   async findById(id: number): Promise<ITeams | null> {
//     const teams = await this.model.findByPk(id);
//     return teams;
//   }
}
