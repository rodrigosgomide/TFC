import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  teamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  findAll = async (_req: Request, res: Response, _next: NextFunction) => {
    const teams = await this.teamsService.findAll();
    res.status(200).json(teams);
  };

  findById = async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const team = await this.teamsService.findById(Number(id));
    res.status(200).json(team);
  };

  findAllNames = async (_req: Request, res: Response, _next: NextFunction) => {
    const teams = await this.teamsService.findAllNames();
    res.status(200).json(teams);
  };
}
