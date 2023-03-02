import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  // declare <campo>: <tipo>;
  declare id: number;
  declare teamName: string;
}

Matches.init({
  // ... Campos
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },

}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Matches',
  timestamps: false,
  tableName: 'matches',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Matches.belongsTo(Teams, { foreignKey: 'id', as: 'home_team_id' });
Matches.belongsTo(Teams, { foreignKey: 'id', as: 'away_team_id' });

Teams.hasMany(Matches, { foreignKey: 'home_team_id' });
Teams.hasMany(Matches, { foreignKey: 'away_team_id' });

export default Matches;
