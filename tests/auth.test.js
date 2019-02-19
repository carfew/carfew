const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const User = require('../models/user.model');

describe('Auth', () => {
    it('should not be able to login if they have not registered', (done) => {
        agent.post('/login', {
            username: 'wronguser',
            password: 'badpassword',
        }).end((err, res) => {
            res.status.should.be.equal(401);
            done();
        });
    });

    it('should be able to signup', (done) => {
        User.findOneAndRemove({ username: 'testone' }, () => {
            agent.post('/sign-up')
                .send({
                    username: 'testone',
                    password: 'password',
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    expect(agent).to.have.cookie('nToken');
                    done();
                });
        });
    });

    it('should be able to login', (done) => {
        agent.post('/login')
            .send({
                username: 'testone',
                password: 'password',
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(agent).to.have.cookie('nToken');
                done();
            });
    });

    it('should be able to logout', (done) => {
        agent.get('/logout')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.not.have.cookie('nToken');
                done();
            });
    });
});
