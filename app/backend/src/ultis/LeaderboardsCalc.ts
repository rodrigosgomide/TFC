// import TeamsService from '../services/TeamsService';
// import ILeaderboards, { ILeaderboardsCalc } from '../interfaces/ILeaderboards';
// import MatchesService from '../services/MatchesService';
// import calcStats from './calcStats';

// export default class LeaderboardsCalc {
//   teamsService;
//   matchService;
//   teams: string[];
//   constructor() {
//     this.teamsService = new TeamsService();
//     this.matchService = new MatchesService();
//     this.teams = [];
//   }

//   async homeLeaderbord():Promise<ILeaderboards[]> {
//     const teams = await this.teamsService.findAllNames();
//     this.teams = teams.map((team) => team.teamName);
//     const leaderbord = Promise.all(this.teams.map(async (teamName) => {
//       const teamMatches = await this.matchService
//         .findHomeByName(teamName) as unknown as ILeaderboardsCalc[];
//       return calcStats(teamName, teamMatches);
//     })).then((response) => response);
//     return leaderbord;
//   }
// }
