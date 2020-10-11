import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../database/models';

chai.use(chaiHttp);
chai.should();

describe('Get all Drivers', () => {
    it('Everyone Can Get All Drivers', (done) => {
        chai.request(app).get('/drivers')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            chai.expect(res.body.message).to.eq('List of Drivers');
            done();
          });
      });
      it('Everyone Can Get Available Drivers', (done) => {
        chai.request(app).get('/drivers/available')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            chai.expect(res.body.message).to.eq('List of available Drivers');
            done();
          });
      });
      it('Everyone Can Get One Specific Driver', (done) => {
        chai.request(app).get('/drivers/5')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            chai.expect(res.body.message).to.eq('Driver Information');
            done();
          });
      });
      it('Driver Can Get Available Driver in 3km for specific location', (done) => {
        chai.request(app).get('/drivers/closeto/2')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            chai.expect(res.body.message).to.eq('List of available Drivers');
            done();
          });
      });
});
