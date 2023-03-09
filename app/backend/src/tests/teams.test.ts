import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';
import TeamsService from '../services/TeamsService';
import { teamsMock, teamsNamesMock } from './mocks/teams.mock';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

  afterEach(()=>{
    sinon.restore()
  })

  it('Testa se o serviço findAll retorna todos os times', async function () {
    sinon
    .stub(Teams, 'findAll')
    .resolves(teamsMock as Teams[])
    const teamsService = new TeamsService()
    const result = await teamsService.findAll()
    expect(result).to.be.equal(teamsMock)
})

it('Testa se o serviço findById retorna um time', async function () {
  sinon
  .stub(Teams, 'findByPk')
  .resolves(teamsMock[0] as Teams)
  const teamsService = new TeamsService()
  const result = await teamsService.findById(1)
  expect(result).to.be.equal(teamsMock[0])
})

it('Testa se o serviço findAllNames retorna somente o nome dos times', async function () {
  sinon
  .stub(Teams, 'findAll')
  .resolves(teamsNamesMock as Teams[])
  const teamsService = new TeamsService()
  const result = await teamsService.findAllNames()
  expect(result).to.be.equal(teamsNamesMock)
})

it('Testa se o controller findAll retorna todos os times', async function () {
  sinon
  .stub(Teams, 'findAll')
  .resolves(teamsMock as unknown as Model<any, any>[])

  const result = await chai
  .request(app)
  .get('/teams');
  expect(result.status).to.be.equal(200)
  expect(result.body).to.be.deep.equal([{id: teamsMock[0].id, teamName: teamsMock[0].teamName}])
})

it('Testa se o controller findById retorna todos os times', async function () {
  sinon
  .stub(Teams, 'findByPk')
  .resolves(teamsMock[0] as unknown as Model<any, any>)

  const result = await chai
  .request(app)
  .get('/teams/1');
  expect(result.status).to.be.equal(200)
  expect(result.body).to.be.deep.equal({id: teamsMock[0].id, teamName: teamsMock[0].teamName})

})


}); 