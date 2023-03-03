import TeamsService from './TeamsService';
import ILeaderboards, { ILeaderboardsCalc } from '../interfaces/ILeaderboards';
import MatchesService from './MatchesService';
import calcStats from '../ultis/calcStats';

export default class LeaderboardsCalc {
  teamsService;
  matchService;
  teams: string[];
  constructor() {
    this.teamsService = new TeamsService();
    this.matchService = new MatchesService();
    this.teams = [];
  }

  async homeLeaderboard():Promise<ILeaderboards[]> {
    const teams = await this.teamsService.findAllNames();
    this.teams = teams.map((team) => team.teamName);
    const leaderbord = Promise.all(this.teams.map(async (teamName) => {
      const teamMatches = await this.matchService
        .findHomeByName(teamName) as unknown as ILeaderboardsCalc[];
      return calcStats(teamName, teamMatches);
    })).then((response) => response);
    return (await leaderbord).sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      return 1;
    }) as ILeaderboards[];
  }
}
