import Leaderboard from '../classes/Leaderboard';
import ILeaderboards, { ILeaderboardsCalc } from '../interfaces/ILeaderboards';

function calcEfficiency(points:number, games:number): number {
  const efficiency = Number([points / (games * 3)]) * 100;
  return efficiency;
}

export default function calcStats(name: string, matches: ILeaderboardsCalc[]): ILeaderboards {
  const teamStats = new Leaderboard(name);
  matches.forEach((matchStats) => {
    if (matchStats.homeTeamGoals > matchStats.awayTeamGoals) {
      teamStats.totalPoints += 3;
      teamStats.totalVictories += 1;
    }
    if (matchStats.homeTeamGoals === matchStats.awayTeamGoals) {
      teamStats.totalPoints += 1;
      teamStats.totalDraws += 1;
    }
    if (matchStats.homeTeamGoals < matchStats.awayTeamGoals) teamStats.totalLosses += 1;
    teamStats.totalGames = matches.length;
    teamStats.goalsFavor += matchStats.homeTeamGoals;
    teamStats.goalsOwn += matchStats.awayTeamGoals;
    teamStats.goalsBalance += matchStats.homeTeamGoals - matchStats.awayTeamGoals;
    teamStats.efficiency = calcEfficiency(teamStats.totalPoints, teamStats.totalGames);
  });
  return teamStats;
}
