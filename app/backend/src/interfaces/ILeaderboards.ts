export default interface ILeaderboards {
  name: string,
  totalPoints: number,
  totalGames:number,
  totalVictories:number,
  totalDraws:number,
  totalLosses:number,
  goalsFavor: number,
  goalsOwn:number,
  goalsBalance: number,
  efficiency: number,
}

interface team {
  teamName: string;
}

export interface ILeaderboardsCalc {
  homeTeamGoals: number,
  awayTeamGoals: number,
  homeTeam?: team,
  awatTeam?: team,
}
