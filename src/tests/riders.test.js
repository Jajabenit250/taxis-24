import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../database/models';

chai.use(chaiHttp);
chai.should();

describe('Riders Test', () => {
    it('Everyone Can Get All Riders', (done) => {
        chai.request(app).get('/riders')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            chai.expect(res.body.message).to.eq('List of all Riders');
            done();
          });
      });
      it('Everyone Can Get One Rider', (done) => {
        chai.request(app).get('/riders/6')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            chai.expect(res.body.message).to.eq('Rider Information');
            done();
          });
      });
      it('Driver Can Get other 3 closest driver', (done) => {
        chai.request(app).get('/riders/closest/1')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            chai.expect(res.body.message).to.eq('List of closest Drivers');
            done();
          });
      });
});
