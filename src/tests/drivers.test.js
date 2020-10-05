import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../database/models';

chai.use(chaiHttp);
chai.should();

describe('Get all Drivers', () => {
  before(async () => {
    await db.user.create({
    });
  });
  it('it should  check if user exist', (done) => {
    chai
      .request(app)
      .get(`/`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should check if user accoutn is activated', (done) => {
    chai
      .request(app)
      .get(`/`)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
});
