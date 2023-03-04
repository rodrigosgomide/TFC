import Leaderboard from '../classes/Leaderboard';
import ILeaderboards, { ILeaderboardsCalc } from '../interfaces/ILeaderboards';

export function calcEfficiency(points:number, games:number): number {
  const efficiency = Number((Number([points / (games * 3)]) * 100).toFixed(2));
  return efficiency;
}

export function calcStatsHome(name: string, matches: ILeaderboardsCalc[]): ILeaderboards {
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
  });
  teamStats.efficiency = calcEfficiency(teamStats.totalPoints, teamStats.totalGames);
  return teamStats;
}

export function calcStatsAway(name: string, matches: ILeaderboardsCalc[]): ILeaderboards {
  const teamStats = new Leaderboard(name);
  matches.forEach((matchStats) => {
    if (matchStats.homeTeamGoals < matchStats.awayTeamGoals) {
      teamStats.totalPoints += 3;
      teamStats.totalVictories += 1;
    }
    if (matchStats.homeTeamGoals === matchStats.awayTeamGoals) {
      teamStats.totalPoints += 1;
      teamStats.totalDraws += 1;
    }
    if (matchStats.homeTeamGoals > matchStats.awayTeamGoals) teamStats.totalLosses += 1;
    teamStats.totalGames = matches.length;
    teamStats.goalsFavor += matchStats.awayTeamGoals;
    teamStats.goalsOwn += matchStats.homeTeamGoals;
    teamStats.goalsBalance += matchStats.awayTeamGoals - matchStats.homeTeamGoals;
  });
  teamStats.efficiency = calcEfficiency(teamStats.totalPoints, teamStats.totalGames);
  return teamStats;
}

export function calcGlobal(
  teamName: string,
  homeMatches: ILeaderboardsCalc[],
  awayMatches: ILeaderboardsCalc[],
) {
  const homeStats = calcStatsHome(teamName, homeMatches);
  const awayStats = calcStatsAway(teamName, awayMatches);
  const global = new Leaderboard(teamName);
  global.totalPoints = homeStats.totalPoints + awayStats.totalPoints;
  global.totalGames = homeStats.totalGames + awayStats.totalGames;
  global.totalVictories = homeStats.totalVictories + awayStats.totalVictories;
  global.totalDraws = homeStats.totalDraws + awayStats.totalDraws;
  global.totalLosses = homeStats.totalLosses + awayStats.totalLosses;
  global.goalsFavor = homeStats.goalsFavor + awayStats.goalsFavor;
  global.goalsOwn = homeStats.goalsOwn + awayStats.goalsOwn;
  global.goalsBalance = homeStats.goalsBalance + awayStats.goalsBalance;
  global.efficiency = calcEfficiency(global.totalPoints, global.totalGames);
  return global;
}

export function calcStats(
  teamName: string,
  matches: ILeaderboardsCalc[],
  homeAway: string,
  extraMatches? :ILeaderboardsCalc[],
) {
  if (homeAway === 'homeTeam') return calcStatsHome(teamName, matches);
  if (homeAway === 'awayTeam') return calcStatsAway(teamName, matches);
  return calcGlobal(teamName, matches, extraMatches as ILeaderboardsCalc[]);
}
