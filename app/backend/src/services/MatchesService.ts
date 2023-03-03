import ITeams from '../interfaces/ITeams';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesService {
  model;

  constructor() {
    this.model = Matches;
  }

  async findAll(): Promise<ITeams[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });

    return matches;
  }

  async findByProgress(query: boolean): Promise<ITeams[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: query,
      },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });

    return matches;
  }

//   async findById(id: number): Promise<ITeams | null> {
//     const teams = await this.model.findByPk(id);
//     return teams;
//   }
}
