import Teams from "../../database/models/TeamsModel";
import ITeams from "../../interfaces/ITeams";

export const teamsMock: ITeams[] = [new Teams(
  {
    id:1,
    teamName: 'Avaí/Kindermann',
  }
)]

export const teamsNamesMock = [new Teams(
  {
    teamName: 'Avaí/Kindermann',
  }
)]
