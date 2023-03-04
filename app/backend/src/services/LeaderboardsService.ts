import TeamsService from './TeamsService';
import ILeaderboards, { ILeaderboardsCalc } from '../interfaces/ILeaderboards';
import MatchesService from './MatchesService';
import { calcStats } from '../ultis/calcStats';
import sortLeaderboard from '../ultis/sortLeaderboard';

export default class LeaderboardsService {
  teamsService;
  matchService;
  teams: string[];
  constructor() {
    this.teamsService = new TeamsService();
    this.matchService = new MatchesService();
    this.teams = [];
  }

  async leaderboardGenerator(homeAway: string):Promise<ILeaderboards[]> {
    const teams = await this.teamsService.findAllNames();
    this.teams = teams.map((team) => team.teamName);
    const leaderbord = Promise.all(this.teams.map(async (teamName) => {
      if (homeAway === 'global') {
        const homeMatches = await this.matchService
          .findByName(teamName, 'homeTeam') as unknown as ILeaderboardsCalc[];
        const awayMatches = await this.matchService
          .findByName(teamName, 'awayTeam') as unknown as ILeaderboardsCalc[];
        return calcStats(teamName, homeMatches, 'global', awayMatches);
      }
      const teamMatches = await this.matchService
        .findByName(teamName, homeAway) as unknown as ILeaderboardsCalc[];
      return calcStats(teamName, teamMatches, homeAway);
    })).then((response) => response);
    return sortLeaderboard(await leaderbord as unknown as ILeaderboards[]);
  }
}
