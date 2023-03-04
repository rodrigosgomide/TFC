import ITeams from '../interfaces/ITeams';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import IScore from '../interfaces/IScore';
import INewMatch from '../interfaces/INewMatch';
import customError, { ICustomError } from '../ultis/customError';

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

    if (homeTeamId === awayTeamId) {
      throw customError(422, 'It is not possible to create a match with two equal teams') as Error;
    }
    const homeTeam = await Teams.findByPk(homeTeamId);
    const awayTeam = await Teams.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      throw customError(404, 'There is no team with such id!') as ICustomError;
    }

    const newMatch = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }

  async findByName(name: string, homeAway: string): Promise<ITeams[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: false,
      },
      include:
        { model: Teams,
          as: homeAway,
          where: { teamName: name },
          attributes: { exclude: ['id', 'homeTeamId', 'awayTeamdId'] } },
      attributes: {
        exclude: ['awayTeamId', 'homeTeamId', 'id', 'inProgress', 'home_team_id', 'away_team_id'],
      },
    });

    return matches;
  }
}
