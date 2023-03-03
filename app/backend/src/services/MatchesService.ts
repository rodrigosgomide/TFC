import ITeams from '../interfaces/ITeams';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import IScore from '../interfaces/IScore';
import INewMatch from '../interfaces/INewMatch';

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

  async finishById(id: number): Promise<object> {
    await this.model.update({ inProgress: false }, {
      where: {
        id,
        inProgress: true,
      },
    });

    return { message: 'Finished' };
  }

  async updateById(matchInfo: IScore): Promise<object> {
    await this.model.update({
      homeTeamGoals: matchInfo.homeTeamGoals,
      awayTeamGoals: matchInfo.awayTeamGoals }, {
      where: {
        id: matchInfo.id,
      },
    });

    return { message: 'Ok' };
  }

  async insertMatch(matchInfo: INewMatch): Promise<object> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = matchInfo;

    const newMatch = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }
}
