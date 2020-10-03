import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../database/models';

chai.use(chaiHttp);
chai.should();

describe('user velify email', () => {
  before(async () => {
    await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'shema@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      password: EncryptPassword('shemaeric'),
      phoneNumber: '0785571790',
      isVerified: false,
      token
    });
    await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'shemaeric@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      password: EncryptPassword('shemaeric'),
      phoneNumber: '0785571790',
      isVerified: true,
      token: token2
    });
  });
  it('it should  check if user exist', (done) => {
    chai
      .request(app)
      .get(`/api/v1/auth/activate/${invalidToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should check if user accoutn is activated', (done) => {
    chai
      .request(app)
      .get(`/api/v1/auth/activate/${token2}`)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
});
