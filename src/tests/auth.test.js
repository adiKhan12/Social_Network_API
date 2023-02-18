const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user and return a JWT token', async () => {
      const res = await chai.request(app)
        .post('/api/auth/signup')
        .send({
          username: 'testuser',
          password: 'testpassword'
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash('testpassword', 10);
      const user = new User({
        username: 'testuser',
        password: hashedPassword
      });
      await user.save();
    });

    it('should log in a user and return a JWT token', async () => {
      const res = await chai.request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'testpassword'
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
    });
  });
});
