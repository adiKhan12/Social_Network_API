const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');
const Post = require('../models/Post');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Posts', () => {
    let token;
    let userId;
  
    beforeEach(async () => {
      await User.deleteMany({});
      await Post.deleteMany({});
  
      const hashedPassword = await bcrypt.hash('testpassword', 10);
      const user = new User({
        username: 'testuser',
        password: hashedPassword
      });
      const savedUser = await user.save();
  
      userId = savedUser._id;
  
      token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION_TIME }
      );
    });
  
    describe('POST /api/posts', () => {
      it('should create a new post', async () => {
        const res = await chai.request(app)
          .post('/api/posts')
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'Test post',
            body: 'Lorem ipsum dolor sit amet'
          });
  
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title', 'Test post');
        expect(res.body).to.have.property('body', 'Lorem ipsum dolor sit amet');
        expect(res.body).to.have.property('author', userId.toString());
      });
  
      it('should return an error if no token is provided', async () => {
        const res = await chai.request(app)
          .post('/api/posts')
          .send({
            title: 'Test post',
            body: 'Lorem ipsum dolor sit amet'
          });
  
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error', 'Authorization header not found');
      });
    });
  
    describe('DELETE /api/posts/:id', () => {
      it('should delete a post', async () => {
        const post = new Post({
          title: 'Test post',
          body: 'Lorem ipsum dolor sit amet',
          author: userId
        });
        const savedPost = await post.save();
  
        const res = await chai.request(app)
          .delete(`/api/posts/${savedPost._id}`)
          .set('Authorization', `Bearer ${token}`);
  
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Post deleted');
      });
  
      it('should return an error if the post does not exist', async () => {
        const res = await chai.request(app)
          .delete('/api/posts/123')
          .set('Authorization', `Bearer ${token}`);
  
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error', 'Post not found');
      });
  
      it('should return an error if the user is not the author of the post', async () => {
        const post = new Post({
          title: 'Test post',
          body: 'Lorem ipsum dolor sit amet',
          author: mongoose.Types.ObjectId()
        });
        const savedPost = await post.save();
  
        const res = await chai.request(app)
          .delete(`/api/posts/${savedPost._id}`)
          .set('Authorization', `Bearer ${token}`);
  
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error', 'Unauthorized');
      });
    });
  });
  