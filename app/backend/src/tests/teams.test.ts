// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import Teams from '../database/models/teamsModel';
// import {teamsMock} from './mocks/teams.mock';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Seu teste', () => {
//   /**
//    * Exemplo do uso de stubs com tipos
//    */

//   // let chaiHttpResponse: Response;

//   // before(async () => {
//   //   sinon
//   //     .stub(Example, "findOne")
//   //     .resolves({
//   //       ...<Seu mock>
//   //     } as Example);
//   // });

//   // after(()=>{
//   //   (Example.findOne as sinon.SinonStub).restore();
//   // })

//   // it('...', async () => {
//   //   chaiHttpResponse = await chai
//   //      .request(app)
//   //      ...

//   //   expect(...)
//   // });

//   it('Verifica se uma lista de times é retornada', async () => {
//     let chaiHttpResponse: Response
 
//     sinon
//       .stub(Teams, "findAll")
//       .resolves(teamsMock as any);

//   const teams = await Teams.findAll()

//     expect(teams).to.be.eq(teamsMock);
//   });
// });
